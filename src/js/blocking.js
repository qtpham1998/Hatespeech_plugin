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
    $elem.off();

    $elem.click(function (e)
    {
        e.stopPropagation();
        // console.log($(this).attr(INITIAL_DATA_ATTR));
        $elem.text(function(_, currText) {
            return currText === REDACTED_TEXT ? $elem.attr(INITIAL_DATA_ATTR) : REDACTED_TEXT;
        });
    });

    /* Add listener to reveal word when clicked */
};

const showRedacted = function (){
  $("." + REDACTED_CLASS).off();
  $("." + REDACTED_CLASS).click(function (e)
  {
      e.stopPropagation();
      console.log($(this).attr(INITIAL_DATA_ATTR));
      // console.log($(this).attr(INITIAL_DATA_ATTR));
      $(this).text(function(_, currText) {
          return currText === REDACTED_TEXT ? $(this).attr(INITIAL_DATA_ATTR) : REDACTED_TEXT;
      });
  });
}

/**
 * Hides recently flagged elements if power is on and corresponding category is selected
 * @param $elem The element to hide
 * @param blocked The map from blocked words to the categories
 **/
const hideTaggedElement = function ($elem, blocked)
{
    browser.storage.sync.get([POWER, BLOCKED_LIST, CUSTOM_BLOCKED_LIST], function (result)
    {
        if (result.power)
        {
            for (let [_, category] of blocked)
            {
                if (result.blockedList[category] || result.customBlockedList[category])
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
 * Reveals words blocked by the user
 * @param word word to be revealed
 **/
const revealElementsByWord = function(word){
  const $elements = $(ATTRIBUTE_SELECTOR(SPAN_TAG, ORIGIN_ATTR, word));
  $elements.each((_, elem) => revealDomElement($(elem)));
  $elements.each((_, elem) => removeElementCategory($(elem)));
  return $elements.length;
}

/**
 * Reveals elements flagged as offensive with respect to the given category
 * @param category The category of words to hide
 * @return {int} The number of elements revealed
 **/
const revealElementsByCategory = function (category, remove)
{
    const $elements = $(ATTRIBUTE_SELECTOR(SPAN_TAG, CATEGORY_ATTR, category));
    $elements.each((_, elem) => revealDomElement($(elem)));
    if(remove){
      $elements.each((_, elem) => removeElementCategory($(elem)));
    }
    return $elements.length;
};

/**
 * Hides all elements flagged as offensive
 **/
const hideAllElements =  function ()
{
    replaceAllWord();
    browser.storage.sync.get([BLOCKED_LIST, CUSTOM_BLOCKED_LIST], function (result)
    {
        var count = 0;
        var allBlockedList = $.extend({}, result.blockedList, result.customBlockedList);
        for (let [category, enabled] of Object.entries(allBlockedList))
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
    $(CLASS_SELECTOR(REPLACED_CLASS)).each((_, elem) => revealReplacement($(elem)));
    $(CLASS_SELECTOR(REDACTED_CLASS)).each((_, elem) => revealDomElement($(elem), removeClass));
};


/**
 * flag elements as offensive based on user given word and hide it based on requirement
 * @param word The word to flag
 * @param  category category of the words
 * @param block to block the word or not
 **/
const hideElementsByWord = function(word, category, block){
  let divElements = getDomElements();
  browser.storage.sync.get([WHITELIST], function (result){
  divElements.each((_,elem) =>
      {
          const whitelist = new Set(result.whitelist)
          const $elem = getContextElement($(elem));
          if ($elem.attr(TAG_ATTR) !== undefined)
          {

              return;
          }

          const text = $elem.text();

          const map = {};
          map[word] = category;
          const blockedWords = checkOffensiveLanguage(text, map, whitelist);
          flagOffensiveWords($elem, blockedWords, 1);
        });
      });
};

/**
 * Remove the category attribute of a given elem
 * @param elem The element which category needed to be removed
 **/
const removeElementCategory = function (elem)
{
  const $elem = $(elem);
  $elem.removeAttr(CATEGORY_ATTR);
  $elem.removeAttr(INITIAL_DATA_ATTR);
  $elem.removeAttr(ORIGIN_ATTR);
}

/**
 * Replace the given element
 * @param elem The element to hide
 * @param wordReplacements word to be replaced and it's replacements
 **/
const replaceWord = function ($elem, wordReplacements)
{
  for (let [word, replacement] of Object.entries(wordReplacements))
  {
    let elemText = $elem.html();
    const wrapper = REPLACED_ELEMENT(word, replacement);
    elemText = elemText.replace(new RegExp(word, GI_REG_EXP), wrapper);
    $elem.html(elemText);
  };
};

/**
 * replace word based on user given word and replacement
 * @param word The word to be replaced
 * @param  replacement replacement for the word
 **/
const replaceElementsByWord = function(word, replacement){
  browser.storage.sync.get([WORD_BANK, CUSTOM_WORD_BANK], function (result){
      if(result.wordBank[word] !== undefined || result.customWordBank !== undefined){
           const elements = $(ATTRIBUTE_SELECTOR(SPAN_TAG, ORIGIN_ATTR, word)).toArray();
           elements.forEach(function(elem){
             const $elem = $(elem);
             revealDomElement($elem);
             removeElementCategory($elem);
           });
      }

        let divElements = getDomElements();
        divElements.each((_,elem) =>
            {
                const $elem = $(elem);
                var map = {};
                map[word] = replacement;
                replaceWord($elem, map);
            });
  });
}

/**
 * Reveals a replaced given element
 * @param elem The element to reveal
 **/
const revealReplacement = function (elem)
{
    const $elem = $(elem);
    $elem.text($elem.attr(INITIAL_DATA_ATTR));
    $elem.off();
};


/**
 * Remove all the replacement class for the word and reveal it's original word
 * @param word the word to be reverted
 **/
const removeElementsReplacement = function(word){
  browser.storage.sync.get([WORD_BANK, CUSTOM_WORD_BANK], function (result){

    const elements = $(ATTRIBUTE_SELECTOR(SPAN_TAG, INITIAL_DATA_ATTR, word)).toArray();
    elements.forEach(function(elem){
      const $elem = $(elem);
      $elem.text($elem.attr(INITIAL_DATA_ATTR));
      $elem.removeAttr(INITIAL_DATA_ATTR);
      $elem.removeAttr(REPLACE_ATTR);
      $elem.removeClass(REPLACED_CLASS);
      $elem.off();

      if(result.wordBank[word] !== undefined || result.customWordBank[word] !== undefined){
        let elemText = $elem.html();
        var category = result.wordBank[word] === undefined ? result.customWordBank[word] : result.wordBank[word];
        var map = {};
        map[word] = category;
        flagOffensiveWords($elem, Object.entries(map), 1);
      }
    });
  });
};

/**
Replace all the words in replaceList
**/
const replaceAllWord = function(){
   const elements = $(ATTRIBUTE_SELECTOR(SPAN_TAG, 'class', REPLACED_CLASS)).toArray();
   elements.forEach(function(elem){
     const $elem = $(elem);
     $elem.text($elem.attr(REPLACE_ATTR));
   });

}
