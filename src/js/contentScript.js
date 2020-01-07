/*******************************************************************************
 *  H8BL*CK - a hatespeech and offensive language remedial plugin
 *  JavaScript file to be injected into specified pages
 *******************************************************************************/

/**
 * Sends message to update the tab manager
 * @param offensiveWordsCount The number of offensive csv in the tab
 * @param newTab Whether this is a new tab. Defaults to false
 **/
const notifyTabContextManager = function (offensiveWordsCount, newTab = false)
{
    browser.runtime.sendMessage(
{
            type: POST_REQUEST,
            blocked: offensiveWordsCount,
            newTab: newTab
        })
};

/**
 * Counts the number of redacted elements in the page. Defaults to 0 if an error occurs
 * @return {int} The number of redacted elements
 **/
const getRedactedCount = function ()
{
    return $(CLASS_SELECTOR(REDACTED_CLASS)).length || 0;
};

/**
 * Receive request from plugin to power on or power off and hide or show hate speech
 **/
browser.runtime.onMessage.addListener(function(req, _, resp)
{
    let count = 0;
    switch (req.command)
    {
        case GET_REQUEST:
            resp({blocked: getRedactedCount()});
            break;

        case SWITCH_ON:
            hideAllElements();
            break;
        case SWITCH_OFF:
            revealAllElements();
            break;

        case ADD_CATEGORY:
            count = hideElementsByCategory(req.category);
            notifyTabContextManager(count);
            resp({blocked: (req.data + count) || 0});
            break;
        case REMOVE_CATEGORY:
            count = revealElementsByCategory(req.category, req.remove);
            notifyTabContextManager(count);
            resp({blocked: (req.data - count) || 0});
            break;

        case REVEAL_ON:
            revealAllElements(false);
            break;
        case REVEAL_OFF:
            hideAllRedactedElements();
            break;

        case ADD_WORD:
            hideElementsByWord(req.word, req.category, req.block);
            // showRedacted();
            resp({blocked: (req.data || 0)});
            break;
        case DELETE_WORD:
            count = revealElementsByWord(req.word);
            resp({blocked: (req.data - count || 0)});
            break;

        case ADD_REPLACEMENT:
            replaceElementsByWord(req.word, req.replace);
            // showRedacted();
            break;
        case DELETE_REPLACEMENT:
            removeElementsReplacement(req.word);
            break;
    }
});

/**
* On opening a new page, begin inspection
**/
notifyTabContextManager(0, true);
inspectElements();
