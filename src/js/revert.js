/*
add listener to the power button and send request to tab based on power on or power off event
*/

document.addEventListener('DOMContentLoaded', function() {
    var link = document.getElementById('link');
    // onClick's logic below:
    link.addEventListener('click', function() {

      browser.storage.sync.get(['powerOff'], function(result){

      if(!result.powerOff){
      browser.browserAction.setIcon({path: GREY_ICON_PATH});
      $("#power-button").attr('src',"/img/green_button.png");
      $("#blocked-words").css({"display":"none"});

      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
   chrome.tabs.sendMessage(tabs[0].id, {command: SWITCH_OFF}, function(response){
     console.log(response.result);
   });
 });
}else{

  $("#power-button").attr('src',"/img/red_button.png");
  $("#blocked-words").removeAttr("style");
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
chrome.tabs.sendMessage(tabs[0].id, {command: SWITCH_ON}, function(response){
 console.log(response.result);
});
});

}

browser.storage.sync.set({powerOff: !result.powerOff}, function (){});

});
    });
});
