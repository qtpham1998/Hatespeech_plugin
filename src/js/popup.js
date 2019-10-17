/*******************************************************************************
 *  H8BL*CK - a hatespeech and offensive language remedial plugin
 *  JavaScript file to be run whenever the popup is opened
 *******************************************************************************/

/**
 * Constant representing the query for active tab
 **/
const ACTIVE_TAB_QUERY = '#tabs :visible';

const formatNumber = function (count) {
    return (typeof count === 'number') ? count.toLocaleString() : count;
};

/**
 * Gets the data for given tab ID
 * @param tabId The ID of the current tab
 **/
const getTabData = async function (tabId)
{
    browser.runtime.sendMessage(
    {
        type: 'getTabData',
        value: tabId
    },
        function (resp)
    {
        const $blockedStats = $('#blocked-num');
        const message = $blockedStats.html().replace('?', formatNumber(resp.blocked));
        $blockedStats.html(message);
    })
};

(function () {
    const tabId = $(ACTIVE_TAB_QUERY).attr('id');
    getTabData(tabId)
})();