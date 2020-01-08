/*******************************************************************************
 *  H8BL*CK - a hatespeech and offensive language remedial plugin
 *  JavaScript file hiding the page
 *******************************************************************************/

/**
 * Hides the HTML page to avoid glimpses and the content
 **/
browser.storage.sync.get([POWER], function (result) {
    if (result.power)
    {
        $(HTML_TAG).hide();
    }
});