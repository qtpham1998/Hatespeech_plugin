/*******************************************************************************
 *  H8BL*CK - a hatespeech and offensive language remedial plugin
 *  JavaScript file to be run whenever the popup is opened
 *******************************************************************************/

/**
 * Formats object to a string
 * @param obj The number to be formatted
 * @return {string} The string representing the given number
 **/
const formatToString = function (obj) {
    return (typeof obj === STRING_TYPE) ? obj : obj.toLocaleString();
};

/**
 * Updates the blocked-data element according to the 'blocked' value
 * @param blocked The number of words blocked
 * @param select True if the number is to be added to current data, false if removed, undefined if replaced
 **/
const updatePopupData = function (blocked, select) {
    const $blockedStats = $(BLOCKED_NUM_ID);

    if (select !== undefined)
    {
        blocked *= select ? 1 : -1;
        blocked += parseInt($blockedStats.text(), 10);
    }

    $blockedStats.text(formatToString(blocked));
    if (blocked === 0) {
        $(BLOCKED_DATA_ID).addClass(CLEAR_CLASS);
        $(BLOCKED_ICON_ID).removeClass(BAN_ICON_CLASS);
        $(BLOCKED_ICON_ID).addClass(CHECK_ICON_CLASS);
    }
    else
    {
        $(BLOCKED_DATA_ID).removeClass(CLEAR_CLASS);
        $(BLOCKED_ICON_ID).removeClass(CHECK_ICON_CLASS);
        $(BLOCKED_ICON_ID).addClass(BAN_ICON_CLASS);
    }
};

/**
 * Gets the data for given tab ID and updates the popup
 * @param power Whether the plugin is turned on or not. Defaults to true
 **/
const updateBlockedData = function (power = true)
{
    if (!power)
    {
        updatePopupData(0);
    }
    else
    {
        browser.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs)
        {
            browser.runtime.sendMessage(
                {
                    type: GET_REQUEST,
                    tabId: tabs[0].id
                },
                function (resp) {
                    updatePopupData(resp.blocked);
                }
            );
        });
    }
};
