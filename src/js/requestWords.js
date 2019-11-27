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

function retrieveWords(tokenReceived, key, page) {

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
        console.log(words.length);
        for (let i = 0; i < words.length; i++) {
            allWordsReceived.push(words[i]);
        }
    });

    if (allWordsReceived.length == 0) {
        console.log("NO WORDS RECEIVED, let's try again..");
    }

}

function returnAllWordsList() {
    return allWordsReceived;
}

//var token = authenticate();
const keyList = ["WnxszacNJAUDfmhaRj4DpAFEuXPBTZUZ", "oxdKzspzxPvsskdMupfHhgbnnRqrWmvt", "HQTBtxnWeNReUZAvfPpoqFrjFeLnoJRg"];
let allWordsReceived = [];

var tokenA = a(keyList[1]);
// if (token === "") {
//     console.log("Can't retrieve token..may have reached the api request limit.")
// } else {

// The word list has 37 pages
for (let i = 0; i < 37; i++) {
    retrieveWords(tokenA, keyList[1], i+1);
}
console.log(returnAllWordsList());

// }





