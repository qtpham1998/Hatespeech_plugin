/*******************************************************************************
 *  H8BL*CK - a hatespeech and offensive language remedial plugin
 *  JavaScript file for revealing blocked content
 *******************************************************************************/

const sendRevealCommand = function (command)
{
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {revealCommand: command}, function(response) {});
    });
};

$(REVEAL_BLOCKED_ID).on('click', function ()
{
    browser.storage.sync.get(['reveal'], function (result)
    {
        if (!result.reveal)
        {
            sendRevealCommand(REVEAL_ON);
            $(REVEAL_BLOCKED_ID).html("Hide Blocked Content");
            //console.info(INFO_REVEAL_ON);
        }
        else
        {
            sendRevealCommand(REVEAL_OFF);
            $(REVEAL_BLOCKED_ID).html("Reveal Blocked Content");
            //console.info(INFO_REVEAL_OFF);
        }
        browser.storage.sync.set({reveal: !result.reveal}, function () {});
    });
});