let changeColor = document.getElementById('changeColor');

//Get 'color' from storage, then set the button's color accordingly
chrome.storage.sync.get('color', function (data) {
    changeColor.style.backgroundColor = data.color;
    changeColor.setAttribute('value',data.color);
});

//After clicking the button, change the current window's background
changeColor.onclick = function(element) {
    let color = element.target.value;
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        chrome.tabs.executeScript(
            tabs[0].id,
            {code : 'document.body.style.backgroundColor = "' + color + '";'});
    });
};