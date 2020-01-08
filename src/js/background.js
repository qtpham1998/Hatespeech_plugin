/*******************************************************************************
 *  H8BL*CK - a hatespeech and offensive language remedial plugin
 *  JavaScript file to be run when the extension ins installed/updated
 *******************************************************************************/

/**
 * Parses the given CSV file data
 * @param data The CSV data
 * @param reverse Whether the mapping should be reversed
 * @return Map of the parsed CSV file
 **/
const parseCsvData = function (data, reverse = false) {
    let dataMap = {};
    const csvData = $.csv.toArrays(data);
    csvData.splice(0, 1);
    if (reverse)
    {
        csvData.forEach((element) => dataMap[element[1]] = element[0]);
    }
    else
    {
        csvData.forEach((element) => dataMap[element[0]] = element[1]);
    }
    return dataMap;
};

/**
 * Parses the CSV file and saves languages to chrome storage in the form of a map from word to category
 * @param data The CSV data
 **/
const loadLanguages = function(data)
{
    const languages = parseCsvData(data);
    browser.storage.sync.set({languagesList: languages}, function ()
    {
        console.info(INFO_LOADED_LANGUAGES);
        setInterval(getOffensiveWordsList, 5 * MS_IN_A_DAY);
    });
};

/**
 * Parses the CSV file and saves wordBank to chrome storage in the form of a map from word to category
 * @param data The CSV data
 **/
const loadWordBank = function(data)
{
    const words = parseCsvData(data, true);
    browser.storage.sync.set({wordBank: words, customWordBank: {}}, function ()
    {
        console.info(INFO_LOADED_WORDS);
    });
};

/**
 * Parses the CSV file and saves Spanish wordBank to chrome storage in the form of a map from word to category
 * @param data The CSV data
 **/
const loadSpanishWordBank = function(data)
{
    const words = parseCsvData(data, true);
    browser.storage.sync.set({esWordBank: words}, function ()
    {
        console.info(INFO_LOADED_SPANISH_WORDS);
    });
};

/**
 * Loads all the lists into storage
 * @param data The CSV data
 **/
const loadBlockedLists = function (data)
{
    const blockedLabels = parseCsvData(data);
    const blockedList = {};
    for (let [category, _] of Object.entries(blockedLabels))
    {
        blockedList[category] = true;
    }

    browser.storage.sync.set({
        blockedList: blockedList,
        blockedLabels: blockedLabels,
        customBlockedList: {},
        customBlockedLabels: {},
        replaceList: {},
        whitelist: [],
    }, function ()
    {
        console.info(INFO_LOADED_CATEGORIES)
    });
};

/**
 * Turn on the plugin on installation
 **/
const setPowerOn = function ()
{
    browser.storage.sync.set({power: true}, function ()
    {
        console.info(INFO_POWER_ON);
    });
};

/**
 * Loads CSV files on installation/update
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
                loadWordBank(response);
            }
        });

        $.ajax(
            {
                type: GET_REQUEST,
                url: browser.runtime.getURL(SPANISH_WORDS_FILE_PATH),
                dataType: TEXT_TYPE,
                success: function (response)
                {
                    loadSpanishWordBank(response);
                }
        });

        $.ajax(
        {
            type: GET_REQUEST,
            url: browser.runtime.getURL(CATEGORIES_FILE_PATH),
            dataType: TEXT_TYPE,
            success: function (response)
            {
                loadBlockedLists(response);
            }
        });

        $.ajax(
            {
                type: GET_REQUEST,
                url: browser.runtime.getURL(LANGUAGES_FILE_PATH),
                dataType: TEXT_TYPE,
                success: function (response)
                {
                    loadLanguages(response);
                }
        });

        setPowerOn();
    }
);
