/*******************************************************************************
 *  H8BL*CK - a hatespeech and offensive language remedial plugin
 *  JavaScript file to be run when the extension ins installed/updated
 *******************************************************************************/

/**Here's the hatebase stufffffff**/

//Authentication
function a(key) {
    let form = new FormData();
    form.append("api_key", key);

    let settings = {
        "async": false,
        "crossDomain": true,
        "url": "https://api.hatebase.org/4-4/authenticate",
        "method": "POST",
        "headers": {
            "dataType":"jsonp"
        },
        "processData": false,
        "contentType": false,
        "mimeType": "multipart/form-data",
        "data": form
    }

    let token = "";
    $.ajax(settings).done(function (response) {
        console.log(response);
        token = JSON.parse(response).result["token"];
        console.log("TOKEN: " + token);
    });

    if (!token) {
        console.log("NO TOKEN RECEIVED, let's try again..");
    }
    return token;
}

// Actual word retrieving
function retrieveWords(tokenReceived, key, page, allWordsReceived) {

    let form = new FormData();
    form.append("api_key", key);
    form.append("token", tokenReceived);
    form.append("page", page.toString());

    let settings = {
        "async": false,
        "crossDomain": true,
        "url": "https://api.hatebase.org/4-4/get_vocabulary",
        "method": "POST",
        "headers": {
            "dataType":"jsonp"
        },
        "processData": false,
        "contentType": false,
        "mimeType": "multipart/form-data",
        "data": form
    };


    $.ajax(settings).done(function (response) {
        const words = JSON.parse(response).result;
        for (let i = 0; i < words.length; i++) {
            allWordsReceived.push(words[i]);
        }
    });

    if (allWordsReceived.length == 0) {
        console.log("NO WORDS RECEIVED, let's try again..");
    }

}

// Returns all the words retrieved
function returnAllWordsList() {
    // API keys used for hatebase: Trang's, Yiming's,  Ye's, and Helen's
    const keyList = ["WnxszacNJAUDfmhaRj4DpAFEuXPBTZUZ", "oxdKzspzxPvsskdMupfHhgbnnRqrWmvt", "HQTBtxnWeNReUZAvfPpoqFrjFeLnoJRg"];
    let allWordsReceived = [];

    var tokenA = a(keyList[1]);

// The word list has 37 pages
for (let i = 0; i < 10; i++) {
    retrieveWords(tokenA, keyList[1], i+1, allWordsReceived);
}
    return allWordsReceived;
}

// Return the category of the offensive word
function categorize(w) {
    var t = [];
    if (w["is_about_class"]) {
        t = "profanity";
    } else if (w["is_about_disability"]) {
        t = "disablist";
    } else if (w["is_about_ethnicity"]) {
        t = "xenophobia";
    } else if (w["is_about_gender"]) {
        t = "sexual";
    } else if (w["is_about_nationality"]) {
        t = "racist";
    } else if (w["is_about_religion"]) {
        t = "anti-religion";
    } else if (w["is_about_sexual_orientation"]) {
        t = "anti-lgbt";
    } else {
        t = "profanity";
    }

    return t;
}

/**
 * Parses the CSV file and saves data to chrome storage
 * @param data The CSV data
 * @return {Array} The list of offensive words loaded from csv file
 **/
const parseCsvFile = function(data)
{
    var words = {};
    $.csv.toArrays(data).forEach((element) => words[element[1]] = element[0]);

    var hatebaseWords = returnAllWordsList();

    //hatebaseWords.forEach((object) => words[object.[]] = categorize(object));
    if (hatebaseWords.length == 0) {
        console.log("Don't have words from hatebase");
    } else {
        for (let i = 0; i < hatebaseWords.length; i++) {
            var w = hatebaseWords[i];
            var term = w["term"];
            //console.log("term: " + term);

            if (!words.hasOwnProperty(term)) {
                var type = categorize(w);
                //console.log(type);
                words[term] = type;
            }
        }

        console.log(words);
    }

    // words.splice(0, 1);
    browser.storage.sync.set({wordBank: words}, function ()
    {
        console.info(INFO_LOADED_WORDS);
    });
};

/**
 * Turn on the plugin on installation
 **/
const setPowerOn = function()
{
  browser.storage.sync.set({power: true}, function ()
  {
      console.info(INFO_POWER_ON);
  });
}


const setBlockedList = function()
{
  browser.storage.sync.set({blockedList: {"profanity": true, "sexual": true, "disablist": true, "ageist": true, "threat": true, "anti-lgbt": true, "racist": true}}, function ()
  {
      // console.info(INFO_LOADED_BLOCKED_LIST);
  });
}

/**
 * Doesn't reveal blocked content on installation
 **/
const setRevealOff = function()
{
    browser.storage.sync.set({reveal: false}, function ()
    {
        console.info(INFO_REVEAL_OFF);
    });
};

/**
 * Loads CSV file on installation/update
 **/
browser.runtime.onInstalled.addListener(function ()
    {
        $.ajax(
        {
            type: GET_REQUEST,
            url: browser.runtime.getURL(WORDS_FILE_PATH),
            dataType: 'text',
            success: function (response){
                          loadWordBank(response);
                          setPowerOn();
                          setRevealOff();
                          setBlockedList();
                          }
        });
    }
);
