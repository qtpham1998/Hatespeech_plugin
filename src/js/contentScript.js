/*******************************************************************************
 *  H8BL*CK - a hatespeech and offensive language remedial plugin
 *  JavaScript file to be injected into specified pages
 *******************************************************************************/

/**
 * Gets all elements with #INSPECTED_TAGS tags and returns filtered results
 * @return {Array} Array of DOM elements to inspect
 **/
const getDomElements = function ()
{
    var divElements = $(INSPECTED_TAGS).toArray();
    divElements = divElements.filter(function (elem)
    {
        return elem.innerText.trim();
    });
    if (divElements.length > MAX_ELEMENTS)
    {
        divElements.length = MAX_ELEMENTS;
    }
    return divElements;
};

/**
 * Checks whether the given string contains offensive languages
 * @param text The element inner text to check
 * @param wordBank Array of offensive words
 * @return {boolean} Whether the given text contains offensive words
 **/
const hasOffensiveLanguage = function (text, wordBank)
{
    const wordsList = text.trim().split(SPACE_STR);
    return wordsList.some(function (word)
    {
        return wordBank.includes(word.toLowerCase());
    });
};

/**
 * Sends message to update the tab manager
 * @param offensiveWordsCount The number of offensive words in the tab
 * @protected
 **/
const updateTabContextManager = function (offensiveWordsCount)
{
    browser.runtime.sendMessage(
        {
            type: POST_REQUEST,
            blocked: offensiveWordsCount
        })
};

/**
 * Hides the element in the page
 * @param $elem The jQuey element to hide
 **/
const hideDomELement = function ($elem)
{
    $elem.attr(INITIAL_DATA_ATTR, $elem.html());
    $elem.html(WARN_OFFENSIVE_TEXT);
    $elem.addClass(OFFENSIVE_WARNING);
};

/**
 * Shows the given DOM element
 * @param $elem The jQuery element to show
 **/
const showDomELement = function ($elem)
{
    $elem.html($elem.attr(INITIAL_DATA_ATTR));
    $elem.removeAttr(INITIAL_DATA_ATTR);
    $elem.removeClass(OFFENSIVE_WARNING);
};

 /**
  * Iterates over the web page's offensive word and show them
  **/
const revertElements = function ()
{
    $(OFFENSIVE_WARNING_CLASS).each(function (i, dom)
    {
        showDomELement($(dom));
    })
};

/**
 * Iterates over the web page's elements and inspects them
 **/
const inspectElements = function ()
{
    const divElements = getDomElements();
    browser.storage.sync.get(['wordBank'], function (result)
    {
        var offensiveWordsCount = 0;
        for (var i = divElements.length - 1; i >= 0; i--)
        {
            const innerText = divElements[i].innerText;
            if (hasOffensiveLanguage(innerText, result.wordBank))
            {
                console.info(INFO_FOUND_TEXT, innerText);
                offensiveWordsCount++;
                hideDomELement($(divElements[i]));
            }
        }
        updateTabContextManager(offensiveWordsCount);
    });
};

/**
 * Checks whether the page is supported by the plugin
 * @param hostname URL of the page
 * @return {boolean} Whether page is supported or not
 **/
const _isUnsupportedPage = function (hostname)
{
    var unsupportedPagesList = [TWITTER, FACEBOOK];
    return unsupportedPagesList.some(function (page)
    {
        return hostname.includes(page);
    });
};

/**
 * Checks if the site is supported by the plugin and performs the necessary actions -
 * either warns user of this or if supported, carries on as usual
 */
const _checkSupported = function ()
{
    if (_isUnsupportedPage(window.location.hostname)) {
        var warnedUnsupported = localStorage.getItem(WARNED_UNSUPPORTED_TAG);
        if (warnedUnsupported !== TRUE) {
            alert(WARN_UNSUPPORTED_PAGE);
            localStorage.setItem(WARNED_UNSUPPORTED_TAG, TRUE);
        }
    } else {
        inspectElements();
    }
};

/**
* Receive request from plugin to power on or power off and hide or show hate speech
**/
browser.runtime.onMessage.addListener(function(request, sender, sendResponse)
{
    switch (request.command)
    {
        case SWITCH_ON:
            _checkSupported();
            break;
        case SWITCH_OFF:
            _revertElements();
            localStorage.setItem(WARNED_UNSUPPORTED_TAG, FALSE);
            break;
    }
});

/**
* On opening a new tab, check if the plugin if switched on before blocking the words
**/
browser.storage.sync.get(['power'], function (result)
{
    if (result.power) {
        _checkSupported();
    }
});
