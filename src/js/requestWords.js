//Authentication

function a(key) {
    var form = new FormData();
    form.append("api_key", key);

    var settings = {
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

    var token = "";
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

function retrieveWords(tokenReceived, key) {

    var form = new FormData();
    form.append("api_key", key);
    form.append("token", tokenReceived);
    //form.append("language", "ZHO");

    var settings = {
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

    var allWordsReceived = [];
    $.ajax(settings).done(function (response) {
        //console.log(response);
        const words = JSON.parse(response).result;
        console.log(words.length);
        for (var i = 0; i < words.length; i++) {
            allWordsReceived.push(words[i]);
        }
    });

    if (allWordsReceived.length == 0) {
        console.log("NO WORDS RECEIVED, let's try again..");
    }
    return allWordsReceived;
}

//var token = authenticate();
const keyList = ["WnxszacNJAUDfmhaRj4DpAFEuXPBTZUZ", "oxdKzspzxPvsskdMupfHhgbnnRqrWmvt", "HQTBtxnWeNReUZAvfPpoqFrjFeLnoJRg"];
var i = 0;
var tokenA = a(keyList[1]);
// if (token === "") {
//     console.log("Can't retrieve token..may have reached the api request limit.")
// } else {
console.log(retrieveWords(tokenA, keyList[1]));

// }





