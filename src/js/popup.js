/*******************************************************************************
 *  H8BL*CK - a hatespeech and offensive language remedial plugin
 *  JavaScript file to be run whenever the popup is opened
 *******************************************************************************/

/**
 * Formats object to a string
 * @param obj The number to be formatted
 * @return {string} The string representing the given number
 **/
const formatToString = function (obj)
{
    return (typeof obj === STRING_TYPE) ? obj : obj.toLocaleString();
};

/**
 * Gets that data of the active tab
 * @return {int} The current data of the active tab
 **/
const getCurrentData = function ()
{
    return parseInt($(BLOCKED_NUM_ID).text(), 10);
};

/**
 * Updates the blocked-data element according to the 'blocked' value
 * @param blocked The number of words blocked
 **/
const updatePopupData = function (blocked)
{
    const $blockedStats = $(BLOCKED_NUM_ID);

    $blockedStats.text(formatToString(blocked));
    if (blocked === 0)
    {
        $(BLOCKED_DATA_ID).addClass(CLEAR_CLASS);
        $(BLOCKED_ICON_ID).removeClass(BAN_ICON_CLASS);
        $(BLOCKED_ICON_ID).addClass(CHECK_CLASS);
    }
    else
    {
        $(BLOCKED_DATA_ID).removeClass(CLEAR_CLASS);
        $(BLOCKED_ICON_ID).removeClass(CHECK_CLASS);
        $(BLOCKED_ICON_ID).addClass(BAN_ICON_CLASS);
    }
};

/**
 * Toggles the checkbox element by adding/removing the 'check' class
 * @param $checkbox The jQuery element of the checkbox
 * @param select Whether the checkbox is being selected
 **/
const toggleCheckBox = function ($checkbox, select) {
    if (select)
    {
        $checkbox.addClass(CHECK_CLASS);
    }
    else
    {
        $checkbox.removeClass(CHECK_CLASS);
    }
};

/**
 * Shows an error message in the popup
 **/
const showErrorMessage = function ()
{
    $(BLOCKED_WRAP_ID).addClass(DISPLAY_NONE_CLASS);
    $(ERROR_MESSAGE_ID).removeClass(DISPLAY_NONE_CLASS);
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
        browser.tabs.query({active: true, currentWindow: true}, function (tabs)
        {
            browser.tabs.sendMessage(tabs[0].id, {command: GET_REQUEST},
                function (resp)
                {
                    if (browser.runtime.lastError)
                    {
                        showErrorMessage();
                    }
                    else
                    {
                        updatePopupData(resp.blocked || 0);
                    }
                });
        });
    }
};
