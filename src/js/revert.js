/**
add listener to the power button and send request to tab based on power on or power off event
**/

document.addEventListener('DOMContentLoaded', function() {

    // onClick's logic below:
    $(LINK).click(function() {

      browser.storage.sync.get(['power'], function(result){

      if(result.power){
        browser.browserAction.setIcon({path: GREY_ICON_PATH});
        $(POWER_BUTTON).attr(SRC,GREEN_BUTTON_PATH);
        $(BLOCKED_WORDS).css({"display":"none"});

        browser.tabs.getAllInWindow(null, function(tabs) {
        for(var i = 0; i < tabs.length; i++){
           browser.tabs.sendMessage(tabs[i].id, {command: SWITCH_OFF}, function(response){
           });
         }
       });
     }else{

       $(POWER_BUTTON).attr(SRC,RED_BUTTON_PATH);
       $(BLOCKED_WORDS).removeAttr("style");

       browser.tabs.getAllInWindow(null, function(tabs) {
         for(var i = 0; i < tabs.length; i++){
           browser.tabs.sendMessage(tabs[i].id, {command: SWITCH_ON}, function(response){
           });
         }
       });

     }

     browser.storage.sync.set({power: !result.power}, function (){});

    });
      });
});
