/*******************************************************************************
 *  H8BL*CK - a hatespeech and offensive language remedial plugin
 *  JavaScript file to be injected into specified pages
 *******************************************************************************/

const domInspector = (function ()
{
    /**
     * Constant representing HTML tag to be inspected
     **/
    const INSPECTED_TAGS = 'p,h1,h2,h3,h4,h5,h6';
    /**
     * Constant representing the max number of elements to inspect
     **/
    const MAX_ELEMENTS = 1000;
    /**
     * Constant representing whitespace regex
     **/
    const WHITESPACE_REGEX = /\S/;
    /**
     * Constant representing the query for active tab
     **/
    const ACTIVE_TAB_QUERY = '#tabs :visible';
    /**
     * Constant representing the number of offensive words found
     **/
    var offensiveWordsCount = 0;

    /**
     * Gets all elements with #INSPECTED_TAGS tags and returns filtered results
     * @return {Array} Array of DOM elements to inspect
     * @protected
     **/
    const _getDomElements = function ()
    {
        let divElements = $(INSPECTED_TAGS).filter(function (elem)
        {
            return WHITESPACE_REGEX.test(elem);
        }).toArray();

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
    const _hasOffensiveLanguage = function (text, wordBank)
    {
        let wordsList = text.split(' ');
        return wordsList.some(function (word)
        {
            return wordBank.includes(word);
        });
    };

    /**
     * Sends message to update the tab manager
     * @param offensiveWordsCount The number of offensive words in the tab
     * @protected
     **/
    const _updateTabContextManager = function (offensiveWordsCount)
    {
        browser.tabs.getCurrent(function (tab) {
            browser.runtime.sendMessage(
                {
                    type: 'setTabData',
                    value: tab.id,
                    blocked: offensiveWordsCount
                })
        });
    };

    /**
     * Iterates over the web page's elements and inspects them
     * @return {int} The number of offensive words found in the page
     **/
    const _inspectElements = function ()
    {
        let divElements = _getDomElements();
        browser.storage.sync.get(['wordBank'], function (result)
        {
            offensiveWordsCount = 0;
            for (var i = divElements.length - 1; i >= 0; i--) {
                let innerText = divElements[i].innerText;
                if (_hasOffensiveLanguage(innerText, result.wordBank))
                {
                    offensiveWordsCount++;
                    console.log("DEBUG - Found word in: " + innerText);
                    // Function call to hide word
                }
            }
            _updateTabContextManager(offensiveWordsCount);
        });
    };

    return _inspectElements()
})();

