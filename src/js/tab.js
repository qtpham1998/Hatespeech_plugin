/*******************************************************************************
 *  H8BL*CK - a hatespeech and offensive language remedial plugin
 *  JavaScript file with components for managing tab data
 *******************************************************************************/

/**
 * Object containing a map from tab ID to its data
 **/
const hBlock = {
    /**
     * Mapping from tab ID to its data
     **/
    tabData: new Map(),

    /**
     * Looks up data for given tabId
     * @param tabId The ID of current tab
     * @return {int} Tab's data, 0 if not present in the map
     **/
    lookUp: function (tabId)
    {
        console.info(INFO_GET_DATA, tabId);
        return this.tabData[tabId] || 0;
    },

    /**
     * Puts new tab/data pair into the map
     * @param tabId The ID of the tab
     * @param blocked The tab's data
     **/
    setData: function (tabId, blocked)
    {
        console.info(INFO_SET_DATA, tabId, blocked);
        this.tabData[tabId] = blocked;
    }
};

/**
 * Changes the plugin icon depending on whether the plugin is switched on and if offensive words were detected or not
 * @param blocked The number of offensive words blocked
 **/
const updateToolbarIcon = function (blocked)
{
    browser.storage.sync.get(['power'], function (result)
    {
        var imagePath = (!result.power) ? GREY_ICON_PATH : ((blocked) ? RED_ICON_PATH : BLUE_ICON_PATH);
        browser.browserAction.setIcon({path: imagePath});
    });
};

/**
 * Listener for tab data queries, calls function according to the message type
 **/
browser.runtime.onMessage.addListener(function (req, sender, resp)
{
    const tabId = sender.tab !== undefined ? sender.tab.id : req.tabId;
    var blocked;
    switch (req.type)
    {
        case GET_REQUEST:
            blocked = hBlock.lookUp(tabId);
            resp({blocked: blocked});
            break;

        case POST_REQUEST:
            blocked = req.blocked;
            break;

        case ADD_CATEGORY_UPDATE:
            blocked = hBlock.lookUp(tabId) + req.blocked;
            break;

        case REMOVE_CATEGORY_UPDATE:
            blocked = hBlock.lookUp(tabId) - req.blocked;
            break;

        default:
            break;
    }

    if (req.type !== GET_REQUEST)
    {
        hBlock.setData(tabId, blocked);
    }
    updateToolbarIcon(blocked);
});

/**
 * Listener for when active tab changes, updates toolbar icon
 **/
browser.tabs.onActivated.addListener(function (activeInfo)
{
    updateToolbarIcon(hBlock.lookUp(activeInfo.tabId));
});
