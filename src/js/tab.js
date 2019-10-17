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
    lookUp: function(tabId) {
        console.info(INFO_GET_DATA, tabId);
        return this.tabData[tabId] || 0;
    },

    /**
     * Puts new tab/data pair into the map
     * @param tabId The ID of the tab
     * @param blocked The tab's data
     **/
    setData: function (tabId, blocked) {
        console.info(INFO_SET_DATA, tabId, blocked);
        this.tabData[tabId] = blocked;
    }
};

/**
 * Listener for tab data queries, calls function according to the message type
 **/
browser.runtime.onMessage.addListener(function (req, sender, resp)
{
    switch (req.type)
    {
        case GET_REQUEST:
            resp({blocked: hBlock.lookUp(req.value)});
            return;
        case POST_REQUEST:
            hBlock.setData(sender.tab.id, req.value);
            return;
        default:
            return;
    }
});