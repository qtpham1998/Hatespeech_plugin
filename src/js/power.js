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
    sendPowerCommand(SWITCH_ON);
    $(HTML_TAG).removeClass(OFF_CLASS);
    $(POWER_BUTTON_ID).removeClass(OFF_CLASS);
    $(PLUGIN_WRAP_ID).show();
    console.info(INFO_POWER_OFF);
};

/**
 * Switches off the plugin
 **/
const switchOffPlugin = function ()
{
    sendPowerCommand(SWITCH_OFF);
    browser.browserAction.setIcon({path: GREY_ICON_PATH});
    $(POWER_BUTTON_ID).addClass(OFF_CLASS);
    $(PLUGIN_WRAP_ID).hide();
    $(HTML_TAG).addClass(OFF_CLASS);
    console.info(INFO_POWER_ON);
};

/**
 * Adds a listener function to the power button which sends switch on/off command requests to tabs when pressed
 **/
$(POWER_BUTTON_ID).click(function ()
{
    browser.storage.sync.get([POWER], function (result)
    {
        if (result.power)
        {
            switchOffPlugin();
        }
        else
        {
            switchOnPlugin();
        }
        browser.storage.sync.set({power: !result.power}, EMPTY_FUNCTION);
    });
});

/**
 * On start up, changes the power button to green and hides word count if the plugin is switched off
 **/
browser.storage.sync.get([POWER], function (result)
{
    updateBlockedData();
    if (!result.power)
    {
        switchOffPlugin();
    }
});
