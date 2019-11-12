/*******************************************************************************
 *  H8BL*CK - a hatespeech and offensive language remedial plugin
 *  JavaScript file to be run whenever the popup is opened
 *******************************************************************************/

/**
 * Formats number to a string
 * @param count The number to be formatted
 * @return {string} The string representing the given number
 **/
const formatNumber = function (count) {
    switch (typeof count) {
        case NUMBER_TYPE:
            return count.toLocaleString();
        case STRING_TYPE:
            return count;
        default:
            return QUESTION_MARK_STR;
    }
};

/**
 * Gets the data for given tab ID
 **/
(function ()
{
    browser.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
        browser.runtime.sendMessage(
            {
                type: GET_REQUEST,
                tabId: tabs[0].id
            },
            function (resp)
            {
                const $blockedStats = $('#blocked-num');
                const message = $blockedStats.html().replace(QUESTION_MARK_STR, formatNumber(resp.blocked));
                $blockedStats.html(message);
            }
        );
    });
})();

/**
* On startUp, change the power button to green
* and hide hateblock words if the plugin is switched off
**/
browser.storage.sync.get(['power'], function(result){
  if(!result.power){
    $(POWER_BUTTON).attr(SRC,GREEN_BUTTON_PATH);
    $(BLOCKED_WORDS).css({"display":"none"});
  }

});

browser.storage.sync.get(['blockedList'], function(result){
    var blockedList = Object.keys(result.blockedList);
    for(var i = 0; i < blockedList.length; i++){
      var category = blockedList[i];
      if(result.blockedList[category]){
       var checkbox_id = "#" + category;
       console.info(checkbox_id);
       $(checkbox_id).prop("checked",true);
     }
    }
});
