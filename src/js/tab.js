/*******************************************************************************
 *  H8BL*CK - a hatespeech and offensive language remedial plugin
 *  JavaScript file with components for managing tab data
 *******************************************************************************/

/**
 * Object containing a map from tab ID to its data
 **/
const hBlock = {
    /**
     * Mapping from tab ID to its reveal flag
     **/
    revealFlag: {},

    /**
     * Looks up flag for given tabId
     * @param tabId The ID of current tab
     * @return {boolean} Tab's reveal flag, {false} if not present in the map
     **/
    lookUpFlag: function (tabId)
    {
        console.info(INFO_GET_REVEAL_FLAG, tabId, (this.revealFlag[tabId] ? 1 : 0));
        return this.revealFlag[tabId] || false;
    },

    /**
     * Puts new tab/flag pair into the map
     * @param tabId The ID of the tab
     **/
    resetRevealFlag: function (tabId)
    {
        this.revealFlag[tabId] = false;
    },

    /**
     * Updates the tab's flag
     * @param tabId The ID of the tab
     **/
    setRevealFlag: function (tabId)
    {
        console.info(INFO_SET_REVEAL_FLAG, tabId, (this.revealFlag[tabId] ? 0 : 1));
        this.revealFlag[tabId] = !this.revealFlag[tabId];
    }
};

/**
 * Changes the plugin icon depending on whether the plugin is switched on and if offensive words were detected or not
 * @param blocked The number of offensive words blocked
 **/
const updateToolbarIcon = function (blocked)
{
    browser.storage.sync.get([POWER], function (result)
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
    switch (req.type)
    {
        case POST_REQUEST:
            updateToolbarIcon(req.blocked);
            if (req.newTab)
            {
                hBlock.resetRevealFlag(tabId);
            }
            break;

        case REVEAL_FLAG_GET:
            const revealFlag = hBlock.lookUpFlag(tabId);
            resp({reveal: revealFlag});
            break;

        case REVEAL_FLAG_UPDATE:
            hBlock.setRevealFlag(tabId);
            break;

        default:
            break;
    }
});

/**
 * Listener for when active tab changes, updates toolbar icon
 **/
browser.tabs.onActivated.addListener(function (activeInfo)
{
    browser.tabs.sendMessage(activeInfo.tabId, {command: GET_REQUEST},
        function (resp)
        {
            if (browser.runtime.lastError)
            {
                browser.browserAction.setIcon({path: GREY_ICON_PATH});
            }
            else
            {
                updateToolbarIcon(resp.blocked || 0);
            }
        });
});
