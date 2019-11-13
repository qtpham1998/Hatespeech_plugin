/*******************************************************************************
 *  H8BL*CK - a hatespeech and offensive language remedial plugin
 *  JavaScript file to be run when the extension ins installed/updated
 *******************************************************************************/

/**
 * Parses the CSV file and saves data to chrome storage
 * @param data The CSV data
 * @return {Array} The list of offensive words loaded from csv file
 **/
const parseCsvFile = function(data)
{
    var words = [];
    $.csv.toArrays(data).forEach(function(element)
    {
        words.push(element[1])
    });
    words.splice(0, 1);
    return words;
};

/**
 * Stores arrays of offensive workds in browser storage
 * @param words The array of offensive words
 **/
const storeWordBank = function(words)
{
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
            dataType: TEXT_TYPE,
            success: function (response)
            {
                storeWordBank(parseCsvFile(response));
                setPowerOn();
            }
        });
    }
);
