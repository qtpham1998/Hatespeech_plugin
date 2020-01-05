/*******************************************************************************
 *  H8BL*CK - a hatespeech and offensive language remedial plugin
 *  JavaScript file to be run when the extension ins installed/updated
 *******************************************************************************/

/**
 * Gets the settings necessary for a Hatebase request
 * @param token The authentication token
 * @param key The API key
 * @param page The page number
 **/
const getRequestSettings = function (key, token, page)
{
    const form = new FormData();
    form.append(API_KEY, key);
    let reqUrl = AUTHENTICATION_URL;
    if (token !== undefined)
    {
        reqUrl = HB_REQUEST_URL;
        form.append(TOKEN_KEY, token);
        form.append(PAGE_KEY, page);
    }

    return {
        crossDomain: true,
        url: reqUrl,
        method: POST_REQUEST,
        headers: {
            dataType: JSONP_DATA_TYPE
        },
        processData: false,
        contentType: false,
        mimeType: FORM_DATA_MIMETYPE,
        data: form,
        error: function (xhr, _, _) {
            const err = JSON.parse(xhr.responseText);
            console.error(ERROR_FAILED_HATEBASE_REQ, err.errors);
        }
    };
};

/**
 * Requests an authentication token from HateBase
 * @param key The ID of current tab
 * @return {token} The authentication token
 **/
const authenticate = function (key)
{
    const settings = getRequestSettings(key);

    $.ajax(settings).done(function (response)
    {
        const token = JSON.parse(response).result[TOKEN_KEY];
        retrieveWords(token, key);
    });
};

/**
 * Retrieves words from Hatebase and stores them in the wordBank
 * @param token The authentication token
 * @param key The API key
 **/
const retrieveWords = function (token, key)
{
    browser.storage.sync.get([WORD_BANK], function (result)
    {
        const wordBank = result.wordBank;
        for (let i = 1; i <= 5; i++)
        {
            const settings = getRequestSettings(key, token, i);
            $.ajax(settings).done(function (response)
            {
                console.info(INFO_HATEBASE_SUCCESS, i);
                const results = JSON.parse(response).result;
                addResponseToWordBank(wordBank, results);
            });
        }
    });

};

/**
 * Retrieves words from Hatebase and stores them in the wordBank
 * @param wordBank The current wordBank
 * @param resultSet The response results from the request
 **/
const addResponseToWordBank = function (wordBank, resultSet)
{
    resultSet.forEach(function (word)
    {
        const term = word[TERM_KEY].toLowerCase();
        if (term.includes(SPACE_STR))
        {
            return;
        }
        wordBank[term] = categorize(word);
    });
    browser.storage.sync.set({wordBank: wordBank});
};

/**
 * Translates Hatebase category to one used by the plugin
 * @param word A result from the request to Hatebase
 * @return {string} The corresponding category
 **/
const categorize = function (word) {
    if (word[HB_DISABLIST_CATEGORY])
    {
        return DISABLIST_CATEGORY;
    }
    else if (word[HB_XENOPHOBIC_CATEGORY])
    {
        return XENOPHOBIC_CATEGORY;
    }
    else if (word[HB_LGBT_CATEGORY])
    {
        return LGBT_CATEGORY;
    }
    else if (word[HB_RELIGION_CATEGORY])
    {
        return RELIGION_CATEGORY;
    }
    else if (word[HB_RACIST_CATEGORY])
    {
        return RACIST_CATEGORY;
    }
    else if (word[HB_SEXIST_CATEGORY])
    {
        return SEXIST_CATEGORY;
    }
    return PROFANITY_CATEGORY;
};

/**
 * Request an authentication token and retrieves additional offensive words
 **/
function getOffensiveWordsList()
{
    // API keys used for hatebase
    const keyList = ["WnxszacNJAUDfmhaRj4DpAFEuXPBTZUZ", "oxdKzspzxPvsskdMupfHhgbnnRqrWmvt", "HQTBtxnWeNReUZAvfPpoqFrjFeLnoJRg"];
    authenticate(keyList[1]);
}
//getOffensiveWordsList();