//Authentication

function a(key) {
    var form = new FormData();
    form.append("api_key", key);

    var settings = {
        "async": true,
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

    var token;
    $.ajax(settings).done(function (response) {
        console.log(response);
        token = JSON.parse(response).result["token"];
        console.log(token);
    });

    if (!token) {
        console.error("NO TOKEN RECEIVED, let's try again..");
        token = a(key2);
    }
    return token;
}

function retrieveWords(token, language) {
    const dataList = [{
        'api_key': "enTeQEPwfVQFcWxRZVJUGEGHXJUYTYDy",
        'format': "json",
        'token': token,
        "language": "zho"
    }];

    var r = $.ajax({
        type: "POST",
        url: "https://api.hatebase.org/4-4/authenticate",
        data: dataList,
        success: function(response) {
            console.log(response);
        }
    });

    const arr = JSON.parse(r);
    console.log(arr);

    var wordList = [];
    for (var i in arr.result) {
        // append the "term" item, which is the offensive word, into wordList
        wordList.push(i["term"]);
    }
    return wordList;
}

//var token = authenticate();

const key1 = "WnxszacNJAUDfmhaRj4DpAFEuXPBTZUZ";
const key2 = "oxdKzspzxPvsskdMupfHhgbnnRqrWmvt";
const token = a(key1);
console.log(retrieveWords(token, "zho"));




