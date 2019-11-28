/*******************************************************************************
 *  H8BL*CK - a hatespeech and offensive language remedial plugin
 *  JavaScript file to be injected into specified pages
 *******************************************************************************/

 /**
  * Iterates over the web page's offensive word and show them
  **/
 const _revertElements = function ()
 {
     $('a.redacted').each(function(i, dom){
       var oldText = $(dom).attr("original");
       $(dom).removeAttr('original');
       $(dom).html(oldText);
       $(dom).removeClass('redacted');
     })
 };


 const _revertElementsByCategory = function (category)
 {
     var j = 0;
     $('a.redacted').each(function(i, dom){

       if($(dom).attr("word-category") === category){
         var oldText = $(dom).attr('original');
         $(dom).removeAttr('original');
         $(dom).html(oldText);
         $(dom).removeClass('redacted');
         j++;
       }
     })
     browser.runtime.sendMessage(
         {
             type: "remove category",
             removed: j
         })
 };


const domInspector = (function (blockedCategory)
{

    /**
    * Gets all elements with #INSPECTED_TAGS tags and returns filtered results
    * @return {Array} Array of DOM elements to inspect
    * @protected
    **/
    const _getDomElements = function ()
    {
        let divElements = $(INSPECTED_TAGS).toArray();
        divElements = divElements.filter(function (elem) {
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
     * @protected
     **/
    const _hasOffensiveLanguage = function (text, wordBank, blockedList)
    {
        let wordsList = text.trim().split(SPACE_STR);
        var blockedWords = {};
        var counter = 0;
        var hasOffensiveLanguage = false;
        wordsList.forEach(function (word)
        {
            if(Object.keys(wordBank).includes(word.toLowerCase()) && blockedList[wordBank[word.toLowerCase()]]){
                blockedWords[word] = wordBank[word.toLowerCase()];
                counter++;
                hasOffensiveLanguage = true;
            };
        });
        return [hasOffensiveLanguage,blockedWords, counter];
    };

    //ADDED:
    /**
     * Return an array of occurred categories in the paragraph
     * @param text The element inner text to check
     * @param wordBank Array of offensive words
     * @return  Array of categories
     * @protected
     **/
    /*
        const _getOffensiveLanguageCategory = function (text, wordBank) {
            let wordsList = text.trim().split(SPACE_STR);
            var categories = [];
            wordsList.forEach(function (word)
            {
                if(wordBank.has(word.toLowerCase())){
                    categories.push(wordBank.get(word.toLowerCase()));
                }
            });
            return categories;
        };
    */

    //ADDED:
    /**
     * Return an array of occurred offensive words in the paragraph
     * @param text The element inner text to check
     * @param wordBank Array of offensive words
     * @return  Array of offensive words
     * @protected
     **/
    /*
    const _getOffensiveWords = function (text, wordBank) {
        let wordsList = text.trim().split(SPACE_STR);
        var offensiveWords = [];
        wordsList.forEach(function (word)
        {
            if(wordBank.has(word.toLowerCase())){
                offensiveWords.push(wordBank.get(word.toLowerCase()));
            }
        });
        return offensiveWords;
    };
    */

    const _hasOffensiveLanguageCategory = function (text, wordBank, category)
    {
        var blockedWords = {};
        var counter = 0;
        let wordsList = text.trim().split(SPACE_STR);
        var hasOffensiveLanguage = false;
        wordsList.forEach(function (word)
            {
               if(Object.keys(wordBank).includes(word.toLowerCase()) && wordBank[word.toLowerCase()] === category){
                 counter++;
                 blockedWords[word] = category;
                 hasOffensiveLanguage = true;
            };
        });
        return [hasOffensiveLanguage, blockedWords, counter];
    };

    /**
     * Sends message to update the tab manager
     * @param offensiveWordsCount The number of offensive words in the tab
     * @protected
     **/
    const _updateTabContextManager = function (offensiveWordsCount)
    {
        browser.runtime.sendMessage(
            {
                type: POST_REQUEST,
                blocked: offensiveWordsCount
            })
    };

    const _updateTabContextManagerCategory = function (offensiveWordsCount)
    {
        browser.runtime.sendMessage(
            {
                type: "add-category",
                blocked: offensiveWordsCount
            })
    };

    /**
     * Hides the element in the page
     * @param $elem The jQuey element to hide
     **/
    const _hideDomELement = function ($elem, blockedWords)
    {
        // $elem.attr("word-category", category);
        // $elem.attr(INITIAL_DATA_ATTR, $elem.html());
        // $elem.html(WARN_OFFENSIVE_TEXT);
        for(var k in blockedWords){
          var originalText = $elem.html();
          var replaced = originalText.replace(new RegExp(k, 'g'), "<a class='redacted' word-category='" +blockedWords[k]+ "' "+"original='"+k+"'"+" onClick=this.innerHTML='"+k+"'>" + "[Redacted]"+"</a>");
          $elem.html(replaced);
        }
        // $elem.addClass(OFFENSIVE_WARNING);
    };




    /**
     * Iterates over the web page's elements and inspects them
     * @return {int} The number of offensive words found in the page
     **/
    const _inspectElements = function ()
    {
        let divElements = _getDomElements();

        browser.storage.sync.get(['wordBank'], function (result1)
        {
          browser.storage.sync.get(['blockedList'], function (result2){
            var offensiveWordsCount = 0;
            for (var i = divElements.length - 1; i >= 0; i--) {
                let innerText = divElements[i].innerText;

                //ADDED: for each divElement, check the paragraph has how many offensive categories and words
                /*
                    var offensiveCategories = _getOffensiveLanguageCategory(innerText, result1.wordBank);
                    var offensiveWords = _getOffensiveWords(innerText, wordBank);
                    if(offensiveCategories.length != 0)
                    {
                        console.info(INFO_FOUND_TEXT, innerText);
                        offensiveWordsCount += offensiveWords.length;
                        _hideDomELement($(divElements[i]), offensiveCategories.join());

                    }s
                 */

                var hasOffensiveLanguage = blockedCategory === ""? _hasOffensiveLanguage(innerText, result1.wordBank, result2.blockedList):
                                           _hasOffensiveLanguageCategory(innerText, result1.wordBank, blockedCategory);
                if (hasOffensiveLanguage[0])
                {
                    // console.info(INFO_FOUND_TEXT, innerText);
                    offensiveWordsCount+=hasOffensiveLanguage[2];
                    _hideDomELement($(divElements[i]), hasOffensiveLanguage[1]);
                }

            }
             if(blockedCategory === ""){
              _updateTabContextManager(offensiveWordsCount);
            }else{
              _updateTabContextManagerCategory(offensiveWordsCount);
            }
          });
        });
    };

    return _inspectElements();
});

/*
* Receive request from plugin to power on or power off and hide or show hate speech
*/
browser.runtime.onMessage.addListener(function(request, sender, sendResponse){
     if(request.command === SWITCH_OFF){
         _revertElements();
     }else if (request.command === SWITCH_ON){
         domInspector("");
     }else if(request.command === "add category"){
         domInspector(request.category);
     }else if(request.command === "remove category"){
         _revertElementsByCategory(request.category);
     }
     sendResponse({result: "success"});
 });


/*
* On opening a new tab, check if the plugin if switched on before blocking the words
*/
 browser.storage.sync.get(['power'], function (result)
 {
    if(result.power){
        domInspector("");
 }
 });
