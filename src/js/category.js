document.addEventListener('DOMContentLoaded', function() {

    console.log("DOMContentLoaded");
    // onClick's logic below:
    $("input[type=checkbox]").change(function() {
        let name = $(this).attr("name");
        browser.storage.sync.get(['blockedList'], function(result){
            var blockedList = result.blockedList;
            console.log("name :" + name);
            console.log("blockedList[name] :" + blockedList[name]);

            if (!blockedList[name]) {
                console.log("first if" + blockedList[name]);
                blockedList[name] = true;
                checkbox_id = "#" + name;
                $(checkbox_id).prop("checked",true);
                browser.storage.sync.set({blockedList: blockedList}, function (){});
                browser.tabs.getAllInWindow(null, function(tabs) {
                    for(var i = 0; i < tabs.length; i++){
                        browser.tabs.sendMessage(tabs[i].id, {command: "add category", category: name}, function(response){

                        });
                    }
                });
            } else {
                blockedList[name] = false;
                console.log("first if " + name);
                console.log("first if " + blockedList[name]);
                checkbox_id = "#" + name;
                $(checkbox_id).prop("checked",false);
                browser.storage.sync.set({blockedList: blockedList}, function (){});
                browser.tabs.getAllInWindow(null, function(tabs) {
                    for (var i = 0; i < tabs.length; i++) {
                        browser.tabs.sendMessage(tabs[i].id, {command: "remove category", category: name}, function(response){

                        });
                    }
                });
            }
        });
    }
  );
});
