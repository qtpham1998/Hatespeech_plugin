/*******************************************************************************
 *  H8BL*CK - a hatespeech and offensive language remedial plugin
 *  JavaScript file with replacement functions
 *******************************************************************************/

/* ****************************************************
 *                     REPLACE
 * ****************************************************/
/**
 * Replace all word instances by its replacement given by user
 * @param word The word to be replaced
 * @param  replacement replacement for the word
 **/
const replaceWordInstances = function (word, replacement)
{
    browser.storage.sync.get([WORD_BANK, CUSTOM_WORD_BANK], function (result)
    {
        if (result.wordBank[word] !== undefined || result.customWordBank !== undefined)
        {
            $(ATTRIBUTE_SELECTOR(SPAN_TAG, ORIGIN_ATTR, word)).each(function (_, elem)
            {
                const $elem = $(elem);
                revealDomElement($elem);
                removeElementInspection($elem);
            });
        }

        const regex = new RegExp(NEGATIVE_LOOKBEHIND_REGEX(word, DATA_ATTR_PRECEDENT), GI_REG_EXP);
        const map = {};
        map[word] = replacement;
        getDomElements().each((_, elem) =>
        {
            const $elem = $(elem);
            const elemText = $elem.html();
            if (elemText.search(regex) !== -1)
            {
                flagReplaceWords($elem, map);
                // Reinstates reveal function of redacted elements
                $elem.find(ATTRIBUTE_SELECTOR(SPAN_TAG, CATEGORY_ATTR, EMPTY_STR)).each((_, redactedElem) => hideDomElement($(redactedElem)));
            }
        });
    });
};

/**
 * Replaces all the words in replaceList
 **/
const replaceAllElements = function ()
{
    $(CLASS_SELECTOR(REPLACED_CLASS)).each(function (_, elem)
    {
        const $elem = $(elem);
        $elem.text($elem.attr(REPLACE_ATTR));
    });
};


/* ****************************************************
 *                     REVEAL
 * ****************************************************/
/**
 * Reveals a replaced given element
 * @param elem The element to reveal
 **/
const revealReplacement = function (elem)
{
    const $elem = $(elem);
    $elem.text($elem.attr(INITIAL_DATA_ATTR));
};

/**
 * Reveals all replaced elements
 **/
const revealAllReplacements = function ()
{
    $(CLASS_SELECTOR(REPLACED_CLASS)).each((_, elem) => revealReplacement($(elem)));
};

/**
 * Remove all the replacements for the word and reveal it's original word
 * @param word the word to be reverted
 **/
const removeWordReplacements = function (word)
{
    browser.storage.sync.get([WORD_BANK, CUSTOM_WORD_BANK], function (result)
    {
        $(ATTRIBUTE_SELECTOR(SPAN_TAG, ORIGIN_ATTR, word)).each(function (_, elem)
        {
            const $elem = $(elem);
            $elem.removeClass(REPLACED_CLASS);
            revealReplacement($elem);
            removeElementInspection($elem);

            if (result.wordBank[word] !== undefined || result.customWordBank[word] !== undefined)
            {
                const category = result.wordBank[word] || result.customWordBank[word];
                flagOffensiveWords($elem, [[word, category]], 1);
            }
        });
    });
};
