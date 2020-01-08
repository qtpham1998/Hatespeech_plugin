/*******************************************************************************
 *  H8BL*CK - a hatespeech and offensive language remedial plugin
 *  JavaScript file to be injected into specified pages
 *******************************************************************************/

/**
 * Sends message to update the tab manager
 * @param offensiveWordsCount The number of offensive csv in the tab
 * @param command The command to send. Defaults to POST
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
    return $(CLASS_SELECTOR(REDACTED_CLASS)).toArray().length || 0;
};

/**
 * Checks whether the page is supported by the plugin
 * @param hostname URL of the page
 * @return {boolean} Whether page is supported or not
 **/
const isUnsupportedPage = function (hostname)
{
    return UNSUPPORTED_PAGES_LIST.some(function (page)
    {
        return hostname.includes(page);
    });
};

/**
 * Checks if the site is supported by the plugin and performs the necessary actions -
 * either warns user of this or if supported, carries on as usual
 */
const checkSupported = function ()
{
    if (isUnsupportedPage(window.location.hostname))
    {
        const warnedUnsupported = localStorage.getItem(WARNED_UNSUPPORTED_TAG);
        if (warnedUnsupported !== TRUE)
        {
            alert(WARN_UNSUPPORTED_PAGE);
            localStorage.setItem(WARNED_UNSUPPORTED_TAG, TRUE);
        }
        $(HTML_TAG).show();
    }
    else
    {
        inspectElements();
    }
};

/**
 * Gets the language of the current tab
 **/
const getTabLanguage = function ()
{
    const language = document.getElementsByTagName(HTML_TAG)[0].getAttribute(LANG_ATTR);
    return language ? language.substring(0, 2) : ENGLISH_LANGUAGE;
};

/**
 * Replaces words in replaceList then redacts others
 **/
const switchOn = function ()
{
  replaceAllElements();
  hideAllElements();
};

/**
 * Replaces words in replaceList then redacts others
 **/
const switchOff = function ()
{
    revealAllReplacements();
    revealAllElements();
    localStorage.setItem(WARNED_UNSUPPORTED_TAG, FALSE);
};

/**
 * Receive request from plugin to power on or power off and hide or show hate speech
 **/
browser.runtime.onMessage.addListener(function(req, _, resp)
{
    let count;
    switch (req.command)
    {
        case GET_REQUEST:
            count = getRedactedCount();
            break;

        case SWITCH_ON:
            switchOn();
            break;
        case SWITCH_OFF:
            switchOff();
            break;

        case ADD_CATEGORY:
            hideElementsByCategory(req.category);
            count = getRedactedCount();
            break;
        case REMOVE_CATEGORY:
            revealElementsByCategory(req.category, req.remove);
            count = getRedactedCount();
            break;

        case ADD_WORD:
            hideWord(req.word);
            count = getRedactedCount();
            break;
        case REMOVE_WORD:
            revealWord(req.word, false);
            count = getRedactedCount();
            break;

        case REVEAL_ON:
            revealAllElements(false);
            break;
        case REVEAL_OFF:
            hideAllRedactedElements();
            break;

        case ADD_CUSTOM_WORD:
            hideCustomWord(req.word, req.category, req.block);
            count = getRedactedCount();
            break;
        case DELETE_CUSTOM_WORD:
            revealWord(req.word, true);
            count = getRedactedCount();
            break;

        case ADD_REPLACEMENT:
            replaceWordInstances(req.word, req.replace);
            count = getRedactedCount();
            break;
        case DELETE_REPLACEMENT:
            removeWordReplacements(req.word);
            count = getRedactedCount();
            break;
    }
    if (resp !== undefined && count !== undefined)
    {
        resp({blocked: getRedactedCount()})
    }
});

/**
 * Prints H8BL*CK to console
 **/
const printASCII = function ()
{
    console.log(
        ' .----------------. .----------------. .----------------. .----------------. .----------------. .----------------. .----------------. \n' +
        '| .--------------. | .--------------. | .--------------. | .--------------. | .--------------. | .--------------. | .--------------. |\n' +
        '| |  ____  ____  | | |     ____     | | |   ______     | | |   _____      | | |      _       | | |     ______   | | |  ___  ____   | |\n' +
        '| | |_   ||   _| | | |   .\' __ \'.   | | |  |_   _ \\    | | |  |_   _|     | | |   /\\| |/\\    | | |   .\' ___  |  | | | |_  ||_  _|  | |\n' +
        '| |   | |__| |   | | |   | (__) |   | | |    | |_) |   | | |    | |       | | |   \\     /    | | |  / .\'   \\_|  | | |   | |_/ /    | |\n' +
        '| |   |  __  |   | | |   .`____\'.   | | |    |  __\'.   | | |    | |   _   | | |  |_     _|   | | |  | |         | | |   |  __\'.    | |\n' +
        '| |  _| |  | |_  | | |  | (____) |  | | |   _| |__) |  | | |   _| |__/ |  | | |   /     \\    | | |  \\ `.___.\'\\  | | |  _| |  \\ \\_  | |\n' +
        '| | |____||____| | | |  `.______.\'  | | |  |_______/   | | |  |________|  | | |   \\/|_|\\/    | | |   `._____.\'  | | | |____||____| | |\n' +
        '| |              | | |              | | |              | | |              | | |              | | |              | | |              | |\n' +
        '| \'--------------\' | \'--------------\' | \'--------------\' | \'--------------\' | \'--------------\' | \'--------------\' | \'--------------\' |\n' +
        ' \'----------------\' \'----------------\' \'----------------\' \'----------------\' \'----------------\' \'----------------\' \'----------------\' ')
};

/**
* On opening a new page, begin inspection
**/
printASCII();
notifyTabContextManager(0, true);
checkSupported();
