/*
add listener to the power button and send request to tab based on power on or power off event
*/

$(LINK).click(function() {

  browser.storage.sync.get(['power'], function(result){

  if(result.power){
    browser.browserAction.setIcon({path: GREY_ICON_PATH});
    $(POWER_BUTTON).attr(SRC,GREEN_BUTTON_PATH);
    $(BLOCKED_WORDS).css({"display":"none"});
    $(REVEAL_BLOCKED_ID).removeClass({"display":"none"});

    browser.tabs.getAllInWindow(null, function(tabs) {
    for(var i = 0; i < tabs.length; i++){
       browser.tabs.sendMessage(tabs[i].id, {command: SWITCH_OFF}, function(response){
       });
     }
   });
 }else{

   $(POWER_BUTTON).attr(SRC,RED_BUTTON_PATH);
   $(BLOCKED_WORDS).removeAttr("style");
   $(REVEAL_BLOCKED_ID).addClass({"display":"none"});

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