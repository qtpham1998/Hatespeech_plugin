/*******************************************************************************
 *  H8BL*CK - a hatespeech and offensive language remedial plugin
 *  JavaScript file with inspection functions
 *******************************************************************************/

/**
 * Gets all elements with #INSPECTED_TAGS tags and returns filtered results
 * @return {Array} Array of DOM elements to inspect
 **/
const getDomElements = function ()
{
    return  $(INSPECTED_TAGS).filter(function (_, elem)
    {
        const text = $(elem).clone().children().remove().end().text();
        return ACCEPTABLE_REGEX.test(text);
    });
};

/**
 * Checks whether the given string contains offensive languages
 * @param text The text to check
 * @param wordBank Map of offensive words to category
 * @param whitelist Set of whitelisted words
 * @return {Array} of offensive words found
 **/
const checkOffensiveLanguage = function (text, wordBank, whitelist)
{
    return Object.entries(wordBank).filter(function ([word, _])
    {
        return !whitelist.has(word) && text.search(new RegExp(WORD_PREFIX_REGEX(word), GI_REG_EXP)) !== -1;
    });
};

/**
 * Wraps matches of 'WORD_PREFIX_REGEX(word)' in an HTML 'span' element
 * @param elemHtml The HTML code of the element
 * @param word The offensive word appearing in elemText
 * @param category The category the word belongs to
 * @param score The toxicity score of the element
 * @return {String} The flagged HTML code
 **/
const wrapMatches = function (elemHtml, word, category, score)
{
    const title = REDACTED_TITLE(category, score);
    const matches = [...elemHtml.matchAll(new RegExp(WORD_PREFIX_REGEX(word), GI_REG_EXP))];

    matches.forEach(function ([initial, _])
    {
        const wrapper = REDACTED_ELEMENT(category, initial, title, word);
        const regex = new RegExp(NEGATIVE_LOOKBEHIND_REGEX(initial, DATA_INITIAL_PRECEDENT), GI_REG_EXP);
        elemHtml = elemHtml.replace(regex, wrapper);
    });
    return elemHtml;
};

/**
 * Flags offensive contents by wrapping them in a new element
 * @param $elem The jQuey element with offensive content
 * @param offensiveWords The map from offensive words to the categories
 * @param score The toxicity score of the element
 **/
const flagOffensiveWords = function ($elem, offensiveWords, score)
{
    for (let [word, category] of offensiveWords)
    {
        $elem.html((_, elemHtml) => wrapMatches(elemHtml, word, category, score));
    }
    hideTaggedElement($elem, offensiveWords);
};

/**
 * Checks whether the given string contains offensive languages
 * @param toAnalyse The list of sentences to analyse
 * @param info Dictionary of information regarding the text to analyse
 **/
const sendForAnalysis = function (toAnalyse, info) {
    browser.runtime.sendMessage(
{
            command: ANALYSE_REQUEST,
            analyse: toAnalyse,
            info: info,
        }
    )
};

/**
 * Processes the response from Perspective API
 * @param analysed The response from Perspective API, map from text to toxicity score
 * @param info Dictionary of information regarding the text to analyse
 **/
const processAnalysisResponse = function (analysed, info)
{
    const $taggedElem = $(ATTRIBUTE_SELECTOR(EMPTY_STR, TAG_ATTR, info.tag));
    const score = analysed[$taggedElem.text()];

    if (score >= TOXICITY_SCORE_THRESHOLD || score < 0)
    {
        flagOffensiveWords($taggedElem, info.blocked, score);
    }
    $taggedElem.removeAttr(TAG_ATTR);
};

/**
 * Gets the closest ancestor that would contain a whole sentence
 * @param $elem The jQuey element
 **/
const getContextElement = function ($elem) {
    while (INNER_TAGS.has($elem.prop(TAG_NAME_PROP)))
    {
        $elem = $elem.parent();
    }
    return $elem;
};

/**
 * Iterates over the web page's elements and flags potentially offensive texts
 **/
const inspectElements = function ()
{
    let divElements = getDomElements();
    browser.storage.sync.get([WORD_BANK, WHITELIST, CUSTOM_WORD_BANK, REPLACE_LIST], function (result)
    {
        divElements.each((_,elem) =>
        {
            const $elem = $(elem);
            /* Get text of element only (without its child elements' texts) */

            replaceWord($elem, result.replaceList);
        });

        let tag = 0;
        const whitelist = new Set(result.whitelist);
        for(let [word, replacement] of Object.entries(result.replaceList)){
          delete result.wordBank[word];
          delete result.customWordBank[word];
        }

        if (result.customWordBank)
        {
            divElements = getDomElements();

            divElements.each((_, elem) =>
            {
                const $elem = getContextElement($(elem));
                // If this context element has been already inspected, can move on to the next one
                if ($elem.attr(TAG_ATTR) !== undefined)
                {
                    return;
                }

                flagOffensiveWords($elem, Object.entries(result.customWordBank), 1);
            })
        }

        divElements = getDomElements();

        divElements.each((_, elem) =>
        {
            const $elem = getContextElement($(elem));
            // If this context element has been already inspected, can move on to the next one
            if ($elem.attr(TAG_ATTR) !== undefined)
            {
                return;
            }

            const text = $elem.text();
            const blockedWords = checkOffensiveLanguage(text, result.wordBank, whitelist);

            if (blockedWords.length > 0)
            {
                const info = {tag: tag, blocked: blockedWords};
                sendForAnalysis(text, info);
                $elem.attr(TAG_ATTR, tag);
                tag++;
            }
        });
        $(HTML_TAG).removeClass(DISPLAY_NONE_CLASS);
    });
};

/**
 * Receive request from plugin with perspective API response to flag given texts as offensive
 **/
browser.runtime.onMessage.addListener(function(req, _, _)
{
    if (req.command === ANALYSE_REQUEST)
    {
        processAnalysisResponse(req.texts, req.info);
    }
});
