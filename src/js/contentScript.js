/*******************************************************************************
 *  JavaScript file to be injected into specified pages
 *******************************************************************************/


/**
 * Inspects a web page for any offensive languages
 **/
const domInspector = (function () {
    /**
     * Checks whether the given string contains offensive languages
     * @param elem The element string to check
     * @return {boolean} Whether the given element contains offensive words
     * @protected
     **/
    var _hasOffensiveLanguage = function (elem) {

    };

    return {
        /**
         * Iterates over the web page's elements and inspects them
         **/
        inspectElements: function () {
            let divElements = document.getElementsByTagName("div");
            for (var i = divElements.length - 1; i >= 0; i--) {
                if (_hasOffensiveLanguage(divElements[i].textContent)) {
                    // Function call to hide word
                }
            }
        }
    }
})();

domInspector.inspectElements();

