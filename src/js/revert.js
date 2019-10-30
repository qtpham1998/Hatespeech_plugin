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
        for(var i = 0; i < tabs.length; i++)
        {
            browser.tabs.sendMessage(tabs[i].id, {command: command}, function (response) {});
        }
    });
};

/**
 * Switches on the plugin
 **/
const switchOnPlugin = function ()
{
    $(POWER_BUTTON_ID).attr(SRC_ATTR, RED_BUTTON_PATH);
    $(BLOCKED_WORDS_ID).removeClass(DISPLAY_NONE);
};

/**
 * Switches off the plugin
 **/
const switchOffPlugin = function ()
{
    browser.browserAction.setIcon({path: GREY_ICON_PATH});
    $(POWER_BUTTON_ID).attr(SRC_ATTR, GREEN_BUTTON_PATH);
    $(BLOCKED_WORDS_ID).addClass(DISPLAY_NONE);
};

/**
 * Add function to the power button and send request switch on/off commands to tabs when pressed
 **/
$(LINK_ID).click(function ()
{
    browser.storage.sync.get(['power'], function (result)
    {
        if (result.power)
        {
            switchOffPlugin();
            sendPowerCommand(SWITCH_OFF);
            console.info(INFO_POWER_OFF);
        }
        else
        {
            switchOnPlugin();
            sendPowerCommand(SWITCH_ON);
            console.info(INFO_POWER_ON);
        }
        browser.storage.sync.set({power: !result.power}, function () {});
    });
});



