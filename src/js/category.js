
$("input[type=checkbox]").change(function() {
        updateStatsNumber();
 var name = $(this).attr("name");

 browser.storage.sync.get(['blockedList'], function(result){

   var blockedList = result.blockedList;

   if(!blockedList[name]) {

     blockedList[name] = true;
     checkbox_id = "#" + name;
     $(checkbox_id).prop("checked",true);
     browser.storage.sync.set({blockedList: blockedList}, function (){});
     browser.tabs.getAllInWindow(null, function(tabs) {
     for(var i = 0; i < tabs.length; i++){
         browser.tabs.sendMessage(tabs[i].id, {command: "add category", category: name}, updateStatsNumber);
          }
        });

   }else{

     blockedList[name] = false;
     checkbox_id = "#" + name;
     $(checkbox_id).prop("checked",false);
     browser.storage.sync.set({blockedList: blockedList}, function (){});
     browser.tabs.getAllInWindow(null, function(tabs) {
     for(var i = 0; i < tabs.length; i++){
         browser.tabs.sendMessage(tabs[i].id, {command: "remove category", category: name}, updateStatsNumber);
          }
        });

   }

 });
}
);

