chrome.runtime.onInstalled.addListener(function() {
    //Set the default color to "3aa757"
    chrome.storage.sync.set({color: '#3aa757'}, function () {
        console.log("The color is green.");
    });

    //PageStateMatcher: the extension only applies on certain webpages which satisfies conditions
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [new chrome.declarativeContent.PageStateMatcher({
                pageUrl: {hostEquals: 'developer.chrome.com'},
            })],
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
    });
});

