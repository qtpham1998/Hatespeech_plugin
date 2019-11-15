/*******************************************************************************
 *  H8BL*CK - a hatespeech and offensive language remedial plugin
 *  JavaScript file to be run when the extension ins installed/updated
 *******************************************************************************/

/**
 * Parses the CSV file and saves data to chrome storage
 * @param data The CSV data
 **/
const loadWordBank = function(data)
{
    var words = {};
    $.csv.toArrays(data).forEach((element) => words[element[1]] = element[0]);

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
browser.runtime.onInstalled.addListener(function()
    {
        $.ajax(
        {
            type: 'GET',
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
