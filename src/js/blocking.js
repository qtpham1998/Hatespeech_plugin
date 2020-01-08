/*******************************************************************************
 *  H8BL*CK - a hatespeech and offensive language remedial plugin
 *  JavaScript file with blocking functions
 *******************************************************************************/

/* ****************************************************
 *                     REDACTION
 * ****************************************************/
/**
 * Redacts the given element
 * @param $elem The element to hide
 **/
const hideDomElement = function ($elem)
{
    $elem.text(REDACTED_TEXT);
    $elem.addClass(REDACTED_CLASS);
    $elem.off();
    /* Add listener to reveal word when clicked */
    $elem.click(function (e)
    {
        e.stopPropagation();
        $elem.text(function (_, currText)
        {
            return currText === REDACTED_TEXT ? $elem.attr(INITIAL_DATA_ATTR) : REDACTED_TEXT;
        });
    });
};

/**
 * Flags custom words and hides them if necessary
 * @param word The word to flag
 **/
hideWord = function (word)
{
    $(ATTRIBUTE_SELECTOR(SPAN_TAG, ORIGIN_ATTR, word)).each((_, elem) => hideDomElement($(elem)));
};

/**
 * Flags custom words and hides them if necessary
 * @param word The word to flag
 * @param category category of the words
 * @param block Whether to block the word
 **/
const hideCustomWord = function (word, category, block)
{
    const regex = new RegExp(WORD_PREFIX_REGEX(word), GI_REG_EXP);

    getDomElements().each((_, elem) =>
    {
        const $elem = $(elem);
        const elemText = $elem.html();

        if (elemText.search(regex) !== -1)
        {
            $elem.html(wrapMatches(elemText, word, category, 1));
            $elem.find(ATTRIBUTE_SELECTOR(SPAN_TAG, CATEGORY_ATTR, EMPTY_STR)).each(function (_, redactedElem) {
                const $redactedElem = $(redactedElem);
                if (!$redactedElem.attr(INITIAL_DATA_ATTR) === word || block)
                {
                    hideDomElement($redactedElem);
                }
            });
        }
    });
};

/**
 * Hides recently flagged elements if power is on and corresponding category is selected
 * @param $elem The element to hide
 * @param blocked The map from blocked words to the categories
 **/
const hideTaggedElement = function ($elem, blocked)
{
    browser.storage.sync.get([POWER, BLOCKED_LIST, CUSTOM_BLOCKED_LIST, WHITELIST], function (result)
    {
        const whitelist = new Set(result.whitelist);
        const categories = Object.assign({}, result.blockedList, result.customBlockedList);
        if (result.power)
        {
            for (let [word, category] of blocked)
            {
                if (!whitelist.has(word) && categories[category])
                {
                    $elem.find(ATTRIBUTE_SELECTOR(SPAN_TAG, ORIGIN_ATTR, word))
                        .each(function (_, elem)
                        {
                            hideDomElement($(elem));
                        });
                }
            }
            notifyTabContextManager(getRedactedCount());
        }
    });
};

/**
 * Hides elements flagged as offensive with respect to the given category
 * @param category The category of words to hide
 * @return {int} The number of elements hidden
 **/
const hideElementsByCategory = function (category)
{
    const $elements = $(ATTRIBUTE_SELECTOR(SPAN_TAG, CATEGORY_ATTR, category));
    $elements.each((_, elem) => hideDomElement($(elem)));
    return $elements.length;
};

/**
 * Hides all elements flagged as offensive
 **/
const hideAllElements = function ()
{
    browser.storage.sync.get([BLOCKED_LIST, CUSTOM_BLOCKED_LIST], function (result)
    {
        var allBlockedList = $.extend({}, result.blockedList, result.customBlockedList);
        for (let [category, enabled] of Object.entries(allBlockedList))
        {
            if (enabled)
            {
                hideElementsByCategory(category);
            }
        }
    });
};

/**
 * Hides all elements marked as redacted
 **/
const hideAllRedactedElements = function ()
{
    $(CLASS_SELECTOR(REDACTED_CLASS)).each((_, elem) => hideDomElement($(elem)));
};

/* ****************************************************
 *                     REVEAL
 * ****************************************************/
/**
 * Reveals a redacted given element
 * @param $elem The element to reveal
 * @param removeClass Whether the redacted class style should be removed. Defaults to true.
 **/
const revealDomElement = function ($elem, removeClass = true)
{
    $elem.text($elem.attr(INITIAL_DATA_ATTR));
    if (removeClass)
    {
        $elem.removeClass(REDACTED_CLASS);
    }
    $elem.off();
};

/**
 * Reveals elements flagged as offensive with respect to the given category
 * @param category The category of words to hide
 * @param remove Whether to unflag elements (for custom categories)
 * @return {int} The number of elements revealed
 **/
const revealElementsByCategory = function (category, remove)
{
    const $elements = $(ATTRIBUTE_SELECTOR(SPAN_TAG, CATEGORY_ATTR, category));
    $elements.each((_, elem) => revealDomElement($(elem)));
    if (remove)
    {
        $elements.each((_, elem) => removeElementInspection($(elem)));
    }
    return $elements.length;
};

/**
 * Reveals all redacted elements
 * @param removeClass Whether the redacted class style should be removed. Defaults to true.
 **/
const revealAllElements = function (removeClass = true)
{
    $(CLASS_SELECTOR(REDACTED_CLASS)).each((_, elem) => revealDomElement($(elem), removeClass));
};

/**
 * Reveals a custom word
 * @param word Word to be revealed
 * @param remove Whether to remove the element from inspection
 **/
const revealWord = function (word, remove)
{
    const $elements = $(ATTRIBUTE_SELECTOR(SPAN_TAG, ORIGIN_ATTR, word));
    $elements.each((_, elem) => revealDomElement($(elem)));
    if (remove)
    {
        $elements.each((_, elem) => removeElementInspection($(elem)));
    }
};

/* ****************************************************
 *                 UTILS
 * ****************************************************/
/**
 * Remove the redaction attributes of a given elem
 * @param $elem The element which category needed to be removed
 **/
const removeElementInspection = function ($elem)
{
    $elem.removeAttr(INITIAL_DATA_ATTR);
    $elem.removeAttr(CATEGORY_ATTR);
    $elem.removeAttr(ORIGIN_ATTR);
    $elem.removeAttr(REPLACE_ATTR);
    $elem.off();
};
