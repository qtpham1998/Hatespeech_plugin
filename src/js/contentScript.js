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
    let divElements = $(INSPECTED_TAGS).toArray();
    divElements = divElements.filter(function (elem) {
        return ALPHA_REGEX.test(elem.innerText);
    });

    if (divElements.length > MAX_ELEMENTS)
    {
        divElements.length = MAX_ELEMENTS;
    }
    return divElements;
};

/**
 * Sends message to update the tab manager
 * @param messageType The type of message to send, with POST as default
 * @param offensiveWordsCount The number of offensive words in the tab
 **/
const updateTabContextManager = function (offensiveWordsCount, messageType = POST_REQUEST)
{
    browser.runtime.sendMessage(
        {
            type: messageType,
            blocked: offensiveWordsCount
        })
};

/**
 * Checks whether the given string contains offensive languages
 * @param textToInspect The element inner text to check
 * @param wordBank Map of offensive words to category
 * @return {Map} of the offensive words found to its category
 **/
const hasOffensiveLanguage = function (textToInspect, wordBank)
{
    const wordsList = textToInspect.trim().split(SPACE_STR);
    const blockedWords = new Map();
    wordsList.forEach(function (text)
    {
        // TODO: Remove special characters
        const word = text.toLowerCase();
        const category = wordBank[word];
        if (category !== undefined)
        {
            blockedWords.set(word, category);
        }
    });
    return blockedWords;
};

/**
 * Wraps offensive word in an HTML 'span' element
 * @param $elem The jQuey element with offensive content
 * @param offensiveWords The map from offensive words to the categories
 **/
const flagOffensiveWords = function ($elem, offensiveWords)
{
    offensiveWords.forEach(function (category, word, _)
    {
        let elemText = $elem.html();
        const wrapper = REDACTED_ELEMENT(category, word);
        elemText = elemText.replace(new RegExp(word, GI_REG_EXP), wrapper);
        $elem.html(elemText);
    });
};

/**
 * Redacts the given element
 * @param elem The element to hide
 **/
const hideDomElement = function (elem)
{
    const $elem = $(elem);
    $elem.text(REDACTED_TEXT);
    $elem.addClass(REDACTED_CLASS);

    /* Add listener to reveal word when clicked */
    $elem.click(function (e)
    {
        e.stopPropagation();
        $elem.text(function(_, currText) {
            return currText === REDACTED_TEXT ? $elem.attr(INITIAL_DATA_ATTR) : REDACTED_TEXT;
        });
    });
};

/**
 * Reveals a redacted given element
 * @param elem The element to reveal
 **/
const revealDomElement = function (elem)
{
    const $elem = $(elem);
    $elem.text($elem.attr(INITIAL_DATA_ATTR));
    $elem.removeClass(REDACTED_CLASS);
    $elem.off();
};

/**
 * Hides elements flagged as offensive with respect to the given category
 * @param category The category of words to hide
 * @param updateData Whether to update tab data
 **/
const hideElementsByCategory = function (category, updateData = true)
{
    const elements = $(ATTRIBUTE_SELECTOR(SPAN_TAG, CATEGORY_ATTR, category)).toArray();
    elements.forEach(hideDomElement);
    if (updateData)
    {
        updateTabContextManager(elements.length, ADD_CATEGORY_UPDATE);
    }
    return elements.length;
};

/**
 * Reveals elements flagged as offensive with respect to the given category
 * @param category The category of words to hide
 * @param updateData Whether to update tab data
 **/
const revealElementsByCategory = function (category, updateData = true)
{
    const elements = $(ATTRIBUTE_SELECTOR(SPAN_TAG, CATEGORY_ATTR, category)).toArray();
    elements.forEach(revealDomElement);
    if (updateData)
    {
        updateTabContextManager(elements.length, REMOVE_CATEGORY_UPDATE);
    }
    return elements.length;
};

/**
 * Hides all elements flagged as offensive
 **/
const hideAllElements =  function ()
{
    browser.storage.sync.get(['blockedList'], function (result)
    {
        var count = 0;
        for (let [category, enabled] of Object.entries(result.blockedList))
        {
            if (enabled)
            {
                count += hideElementsByCategory(category, false);
            }
        }
        updateTabContextManager(count);
    });
};

/**
 * Reveals all redacted elements
 **/
const revealAllElements =  function ()
{
    const elements = $(CLASS_SELECTOR(REDACTED_CLASS)).toArray();
    elements.forEach(revealDomElement);
};

/**
 * Iterates over the web page's elements and flags potentially offensive texts
 **/
const inspectElements = function ()
{
    let divElements = getDomElements();
    browser.storage.sync.get(['wordBank'], function (result)
    {
        divElements.forEach((elem) =>
        {
            const $elem = $(elem);
            /* Get text of element only (without its child elements' texts) */
            const innerText = $elem.clone().children().remove().end().text();

            const blockedList = hasOffensiveLanguage(innerText, result.wordBank);
            if (blockedList.size > 0)
            {
                flagOffensiveWords($elem, blockedList);
            }
        });
    });
};

/**
 * Checks whether the page is supported by the plugin
 * @param hostname URL of the page
 * @return {boolean} Whether page is supported or not
 **/
const _isUnsupportedPage = function (hostname)
{
    const unsupportedPagesList = [TWITTER, FACEBOOK];
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
    if (_isUnsupportedPage(window.location.hostname))
    {
        const warnedUnsupported = localStorage.getItem(WARNED_UNSUPPORTED_TAG);
        if (warnedUnsupported !== TRUE)
        {
            alert(WARN_UNSUPPORTED_PAGE);
            localStorage.setItem(WARNED_UNSUPPORTED_TAG, TRUE);
        }
    }
    else
    {
        hideAllElements();
    }
};

/**
 * Receive request from plugin to power on or power off and hide or show hate speech
 **/
browser.runtime.onMessage.addListener(function(request, _, resp)
{
    let count = 0;
    switch (request.command)
    {
        case SWITCH_ON:
            _checkSupported();
            break;
        case SWITCH_OFF:
            revealAllElements();
            localStorage.setItem(WARNED_UNSUPPORTED_TAG, FALSE);
            break;
        case ADD_CATEGORY:
            count = hideElementsByCategory(request.category);
            resp({blocked: count});
            break;
        case REMOVE_CATEGORY:
            count = revealElementsByCategory(request.category);
            resp({blocked: count});
            break;
    }
});

/**
* On opening a new tab, check if the plugin is switched on before blocking the words
**/
inspectElements();
browser.storage.sync.get(['power'], function (result)
{
    if (result.power) {
        _checkSupported();
    }
});

