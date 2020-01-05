/*******************************************************************************
 *  H8BL*CK - a hatespeech and offensive language remedial plugin
 *  JavaScript file for revealing blocked content
 *******************************************************************************/

/**
 * Sends {revealCommand} message to current tab
 * @param revealCommand The revealCommand to send
 **/
const sendRevealCommand = function (revealCommand)
{
    browser.tabs.query({active: true, currentWindow: true}, function(tabs)
    {
        browser.tabs.sendMessage(tabs[0].id, {command: revealCommand});
        browser.runtime.sendMessage({tabId: tabs[0].id, type: REVEAL_FLAG_UPDATE})
    });
};

/**
 * Switches reveal on
 **/
const switchOnReveal = function ()
{
    sendRevealCommand(REVEAL_ON);
    setRevealButton(true);
    console.info(INFO_REVEAL_OFF);
};

/**
 * Switches reveal off
 **/
const switchOffReveal = function ()
{
    sendRevealCommand(REVEAL_OFF);
    setRevealButton(false);
    console.info(INFO_REVEAL_ON);
};

/**
 * Sets reveal button style according to the 'reveal' state
 **/
const setRevealButton = function (revealOn)
{
    if (revealOn)
    {
        $(REVEAL_BLOCKED_ID).text(HIDE_BLOCKED_WORDS);
        $(REVEAL_BLOCKED_ID).addClass(ON_CLASS);
        $(REVEAL_BLOCKED_ID).removeClass(OFF_CLASS);
    }
    else
    {
        $(REVEAL_BLOCKED_ID).text(REVEAL_BLOCKED_WORDS);
        $(REVEAL_BLOCKED_ID).addClass(OFF_CLASS);
        $(REVEAL_BLOCKED_ID).removeClass(ON_CLASS);
    }
};

/**
 * On start up, set reveal flag appropriately
 **/
const setRevealFlag = function ()
{
    browser.tabs.query({active: true, currentWindow: true}, function (tabs)
    {
        browser.runtime.sendMessage(
            {
                type: REVEAL_FLAG_GET,
                tabId: tabs[0].id
            },
            function (resp) {
                setRevealButton(resp.reveal);
            }
        );
    });
};
setRevealFlag();

/**
 * Adds a listener function to the power button which sends switch on/off command requests to tabs when pressed
 **/
$(REVEAL_BLOCKED_ID).click(function ()
{
    const $revealButton = $(REVEAL_BLOCKED_ID);
    if ($revealButton.text() === REVEAL_BLOCKED_WORDS)
    {
        switchOnReveal();
    }
    else
    {
        switchOffReveal();
    }
});
