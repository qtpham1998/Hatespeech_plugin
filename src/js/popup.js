/*******************************************************************************
 *  H8BL*CK - a hatespeech and offensive language remedial plugin
 *  JavaScript file to be run whenever the popup is opened
 *******************************************************************************/

/**
 * Formats number to a string
 * @param count The number to be formatted
 * @return {string} The string representing the given number
 **/
const formatNumber = function (count) {
    switch (typeof count) {
        case NUMBER_TYPE:
            return count.toLocaleString();
        case STRING_TYPE:
            return count;
        default:
            return QUESTION_MARK_STR;
    }
};

/**
 * Gets the data for given tab ID
 **/
const updateBlockedData = function ()
{
    browser.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
        browser.runtime.sendMessage(
            {
                type: GET_REQUEST,
                tabId: tabs[0].id
            },
            function (resp)
            {
                const $blockedStats = $(BLOCKED_NUM_ID);
                const message = $blockedStats.html().replace(QUESTION_MARK_STR, formatNumber(resp.blocked));
                $blockedStats.html(message);
            }
        );
    });
};

/**
* On start up, changes the power button to green and hides word count if the plugin is switched off
**/
browser.storage.sync.get(['power'], function(result){
    if (result.power)
    {
        updateBlockedData();
    }
    else
    {
        switchOffPlugin();
    }
});
