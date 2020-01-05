/*******************************************************************************
 *  H8BL*CK - a hatespeech and offensive language remedial plugin
 *  JavaScript file with blocking functions
 *******************************************************************************/

/**
 * Redacts the given element
 * @param $elem The element to hide
 **/
const hideDomElement = function ($elem)
{
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
 * Hides recently flagged elements if power is on and corresponding category is selected
 * @param $elem The element to hide
 * @param blocked The map from blocked words to the categories
 **/
const hideTaggedElement = function ($elem, blocked)
{
    browser.storage.sync.get([POWER, BLOCKED_LIST], function (result)
    {
        if (result.power)
        {
            for (let [_, category] of blocked)
            {
                if (result.blockedList[category])
                {
                    $elem.find(ATTRIBUTE_SELECTOR(SPAN_TAG, CATEGORY_ATTR, category))
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
 * Reveals elements flagged as offensive with respect to the given category
 * @param category The category of words to hide
 * @return {int} The number of elements revealed
 **/
const revealElementsByCategory = function (category)
{
    const $elements = $(ATTRIBUTE_SELECTOR(SPAN_TAG, CATEGORY_ATTR, category));
    $elements.each((_, elem) => revealDomElement($(elem)));
    return $elements.length;
};

/**
 * Hides all elements flagged as offensive
 **/
const hideAllElements =  function ()
{
    browser.storage.sync.get([BLOCKED_LIST], function (result)
    {
        var count = 0;
        for (let [category, enabled] of Object.entries(result.blockedList))
        {
            if (enabled)
            {
                count += hideElementsByCategory(category);
            }
        }
        notifyTabContextManager(count);
    });
};

/**
 * Hides all elements marked as redacted
 **/
const hideAllRedactedElements = function ()
{
    $(CLASS_SELECTOR(REDACTED_CLASS)).each((_, elem) => hideDomElement($(elem)));
};

/**
 * Reveals all redacted elements
 * @param removeClass Whether the redacted class style should be removed. Defaults to true.
 **/
const revealAllElements =  function (removeClass = true)
{
    $(CLASS_SELECTOR(REDACTED_CLASS)).each((_, elem) => revealDomElement($(elem), removeClass));
};
