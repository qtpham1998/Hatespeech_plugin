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
    const divElements = $(INSPECTED_TAGS).toArray();
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
  * Iterates over the web page's offensive word and show them
  **/
const revertElements = function ()
{
    $(OFFENSIVE_WARNING_CLASS).each(function (i, dom)
    {
        const $dom = $(dom);
        $dom.html($dom.attr(INITIAL_DATA_ATTR));
        $dom.removeAttr(INITIAL_DATA_ATTR);
        $dom.removeClass(OFFENSIVE_WARNING);
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
 * Receive requests from plugin to power on or power off and hide or show hate speech
 **/
browser.runtime.onMessage.addListener(function (request, sender, sendResponse)
{
    switch (request.command)
    {
        case SWITCH_ON:
            inspectElements();
            break;
        case SWITCH_OFF:
            revertElements();
            break;
    }
});

/**
 * On opening a new tab, check if the plugin if switched on before blocking the words
 **/
browser.storage.sync.get(['power'], function (result)
{
    if (result.power)
    {
        inspectElements();
    }
});