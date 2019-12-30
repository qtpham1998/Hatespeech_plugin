/*******************************************************************************
 *  H8BL*CK - a hatespeech and offensive language remedial plugin
 *  JavaScript file for reverting blocked content
 *******************************************************************************/

/**
 * Sends {command} message to all tabs in the window
 * @param command The power command to send
 **/
const sendPowerCommand = function (command)
{
    browser.tabs.getAllInWindow(null, function (tabs)
    {
        tabs.forEach((tab) => browser.tabs.sendMessage(tab.id, {command: command}));
    });
};

/**
 * Switches on the plugin
 **/
const switchOnPlugin = function ()
{
    $(POWER_BUTTON_ID).attr(SRC_ATTR, RED_BUTTON_PATH);
    $(BLOCKED_WRAP_ID).removeClass(DISPLAY_NONE_CLASS);
    sendPowerCommand(SWITCH_ON);
    console.info(INFO_POWER_OFF);
};

/**
 * Switches off the plugin
 **/
const switchOffPlugin = function ()
{
    browser.browserAction.setIcon({path: GREY_ICON_PATH});
    $(POWER_BUTTON_ID).attr(SRC_ATTR, GREEN_BUTTON_PATH);
    $(BLOCKED_WRAP_ID).addClass(DISPLAY_NONE_CLASS);
    sendPowerCommand(SWITCH_OFF);
    console.info(INFO_POWER_ON);
};

/**
 * Adds a listener function to the power button which sends switch on/off command requests to tabs when pressed
 **/
$(BUTTON_ID).click(function (e)
{
    browser.storage.sync.get(['power'], function (result)
    {
        if (result.power)
        {
            switchOffPlugin();
        }
        else
        {
            switchOnPlugin();
        }
        updateBlockedData(!result.power);
        browser.storage.sync.set({power: !result.power}, EMPTY_FUNCTION);
    });
});

/**
 * On start up, changes the power button to green and hides word count if the plugin is switched off
 **/
browser.storage.sync.get(['power'], function (result)
{
    updateBlockedData(result.power);
    if (!result.power)
    {
        switchOffPlugin();
    }
});
