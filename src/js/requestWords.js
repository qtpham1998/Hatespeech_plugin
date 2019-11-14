//Authentication

function a() {
    var form = new FormData();
    form.append("api_key", "oxdKzspzxPvsskdMupfHhgbnnRqrWmvt");

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

    $.ajax(settings).done(function (response) {
        console.log(response);
        // console.log(JSON.toString(response) + "hello");
        // token = response.result["token"];
        // console.log(token);
    });
}
function authenticate() {
    var formAu = new FormData();
    formAu.append("api_key", "oxdKzspzxPvsskdMupfHhgbnnRqrWmvt");

    //console.log(formAu);

    //const dataList = {api_key:"oxdKzspzxPvsskdMupfHhgbnnRqrWmvt"};

    var token = "";
    $.ajaxSetup({async:false});
    $.ajax({
        method: "POST",
        url: "https://api.hatebase.org/4-4/authenticate",
        data: {
            api_key: "oxdKzspzxPvsskdMupfHhgbnnRqrWmvt"
        },
        success: function(response) {
            console.log(response);
            const resp = JSON.parse(response.body);
            token = resp.result["token"];
        },
        error: function (response) {
            console.log("DEBBUG: IN AJAX FAILURE");
            console.log(response);
        }
    });
    $.ajaxSetup({async:true});
    console.log(token);
    if (token === "") {
        console.log("oh no");
    }
    return token;
}

function retrieveWords(token, language) {
    const dataList = [{
        'api_key': "HQTBtxnWeNReUZAvfPpoqFrjFeLnoJRg",
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
//console.log(retrieveWords(token, "zho"));
a();




