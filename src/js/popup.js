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
    $(DATA_WRAP_ID).hide();
    $(ERROR_MESSAGE_ID).show();
};

/**
 * Adds a listener function to all close button to clear data
 **/
const addCloseButtonListener = function ()
{
    $(CLASS_SELECTOR(CLOSE_BUTTON_CLASS)).click(function ()
    {
        $(CATEGORY_LIST_ID).empty();
        $(WORDS_LIST_ID).empty();
        $(CUSTOM_WORDS_TABLE_ID).empty();
        $(CUSTOM_CATEGORIES_TABLE_ID).empty();
        $(REPLACED_WORDS_TABLE_ID).empty();
    });
};
addCloseButtonListener();

/**
 * Shows the waning popup message
 **/
const showWaningPopup = function ()
{
    const $warningPopup = $(WARNING_MESSAGE_ID).parent();
    $warningPopup.show();
    $warningPopup.find(CLASS_SELECTOR(CLOSE_BUTTON_CLASS)).click(function ()
    {
        $warningPopup.hide();
    });
};

/**
 * Gets the data for given tab ID and updates the popup
 **/
const updateBlockedData = function ()
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
            }
        );
    });
};

