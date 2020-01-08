/*******************************************************************************
 *  H8BL*CK - a hatespeech and offensive language remedial plugin
 *  JavaScript file for selecting categories
 *******************************************************************************/

/**
 * Sends {command} message to all tabs in the window
 * @param command The word replacing command to send
 * @param word The new word to be replaced
 * @param replacement The replacement for this word
 **/
const sendReplaceWordCommand = function (command, word, replacement)
{
    browser.tabs.getAllInWindow(null, function (tabs)
    {
        tabs.forEach((tab) =>
        {
            browser.tabs.sendMessage(tab.id,
                {
                    command: command,
                    word: word,
                    replace: replacement
                },
                function (resp)
                {
                    updatePopupData(resp.blocked);
                });
        });
    });
};

/**
 * Validates the submitted replacement
 * @param wordInput The word to be replaced
 * @param replaceInput The replacement for the word
 * @param result The result containing lists for checking validity
 * @return {boolean} Whether the input is valid or not
 **/
const validReplaceInput = function (wordInput, replaceInput, result)
{
    let valid = true;
    const $replaceWarning = $(WARNING_MESSAGE_ID);
    const category = result.wordBank[replaceInput] || result.customWordBank[replaceInput];
    if (wordInput.length === 0)
    {
        $replaceWarning.text(WARN_EMPTY_INPUT);
        valid = false;
    }
    else if (replaceInput.length === 0)
    {
        $replaceWarning.text(WARN_EMPTY_REPLACEMENT);
        valid = false;
    }
    else if (result.replaceList[wordInput] !== undefined)
    {
        $replaceWarning.text(WARN_REPLACEMENT_EXISTS(wordInput));
        valid = false;
    }
    else if (category !== undefined)
    {
        const categories = Object.assign({}, result.blockedList, result.customBlockedList);
        const whitelist = new Set(result.whitelist);
        if (categories[category] && !whitelist.has(replaceInput))
        {
            $replaceWarning.text(WARN_REPLACEMENT_BLOCKED);
            valid = false;
        }
    }
    else
    {
        for (let [word, replacement] of Object.entries(result.replaceList))
        {
            if (wordInput === replacement)
            {
                $replaceWarning.text(replacement + " is already replacement for " + word);
                valid = false;
            }
        }

    }
    return valid;
};

/**
 * Resets the replacement form
 **/
const resetReplaceForm = function ()
{
    $(REPLACE_WORD_INPUT).val(EMPTY_STR);
    $(REPLACEMENT_INPUT).val(EMPTY_STR);
};

/**
 * Adds a replacement to the list
 * @param wordInput The word to be replaced
 * @param replaceInput The replacement for the word
 * @param replaceList The replacement list
 **/
const addReplacement = function (wordInput, replaceInput, replaceList)
{
    replaceList[wordInput] = replaceInput;
    browser.storage.sync.set({replaceList: replaceList});
    sendReplaceWordCommand(ADD_REPLACEMENT, wordInput, replaceInput);
};

/**
 * Adds a listener function to take input from user for replacements
 **/
const addReplaceSubmitListener = function ()
{
    $(REPLACE_SUBMIT_BUTTON_ID).click(function ()
    {
        browser.storage.sync.get([REPLACE_LIST, WORD_BANK, CUSTOM_WORD_BANK, BLOCKED_LIST, CUSTOM_BLOCKED_LIST, WHITELIST], function (result)
        {
            const wordInput = $(REPLACE_WORD_INPUT).val();
            const replaceInput = $(REPLACEMENT_INPUT).val();
            resetReplaceForm();

            if (!validReplaceInput(wordInput, replaceInput, result))
            {
                showWaningPopup();
                return;
            }

            addReplacement(wordInput, replaceInput, result.replaceList);
        });
    });
};

/**
 * Adds a listener function that injects replaced words into table of 'replaced-list-popup'
 **/
const addReplacedWordsListener = function ()
{
    $(REPLACED_WORDS_BUTTON).click(function ()
    {
        const $replacedWordsTable = $(REPLACED_WORDS_TABLE_ID);
        $replacedWordsTable.empty();
        browser.storage.sync.get([REPLACE_LIST], function (result)
        {
            for (let [word, replacement] of Object.entries(result.replaceList))
            {
                const row = REPLACE_TABLE_ROW(word, replacement);
                $replacedWordsTable.append(row);
            }
            addDeleteReplaceListener();
        });
    });
};

/**
 * Injects function to delete word replacement when click on delete button
 **/
const addDeleteReplaceListener = function ()
{
    $(CLASS_SELECTOR(DELETE_CUSTOM_CLASS)).click(function ()
    {
        const $row = $(this).parent().parent();
        const word = $row.attr(ID_ATTR);
        $row.remove();
        browser.storage.sync.get([REPLACE_LIST], function (result)
        {
            const replaceList = result.replaceList;
            delete replaceList[word];
            browser.storage.sync.set({replaceList: replaceList});

        });
        sendReplaceWordCommand(DELETE_REPLACEMENT, word)
    });
};

/**
 * Adds all listener functions related to word replacement
 **/
const addReplaceListener = function ()
{
    addReplaceSubmitListener();
    addReplacedWordsListener();
};
addReplaceListener();