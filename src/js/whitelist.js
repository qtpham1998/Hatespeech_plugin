/*******************************************************************************
 *  H8BL*CK - a hatespeech and offensive language remedial plugin
 *  JavaScript file for a categories' words list
 *******************************************************************************/

/**
 * Sends {command} message to all tabs in the window
 * @param command The word blocking command to send
 * @param word The new word to be block
 **/
const sendWhitelistCommand = function (command, word)
{
    browser.tabs.getAllInWindow(null, function (tabs)
    {
        tabs.forEach((tab) =>
        {
            browser.tabs.sendMessage(tab.id,
                {
                    command: command,
                    word: word,
                },
                function (resp)
                {
                    updatePopupData(resp.blocked);
                });
        });
    });
};

/**
 * Adds a listener function to the 'more' element for the category list items.
 * Lists out words of the category in the popup
 **/
const addMoreListener = function () {
    $(CLASS_SELECTOR(CATEGORY_MORE_CLASS)).click(function ()
    {
        const $checkbox = $(this);
        const categoryName = $checkbox.parent().attr(ID_ATTR);

        browser.storage.sync.get([WORD_BANK, CUSTOM_WORD_BANK, WHITELIST], function (result)
        {
            const $wordsList = $(WORDS_LIST_ID);
            const whitelist = new Set(result.whitelist);
            const wordBank = Object.assign({}, result.wordBank, result.customWordBank);
            Object.entries(wordBank).forEach(function ([word, category])
            {
                if (category === categoryName)
                {
                    const identifier = word.replace(new RegExp(NON_IDENTIFIER_REGEX, GI_REG_EXP), DASH_STR);
                    $wordsList.append($.parseHTML(WORD_LIST_ELEMENT(identifier, word, category)));
                    const $wordElem = $(IDENTIFIER_SELECTOR(identifier));
                    toggleCheckBox($wordElem.children(CLASS_SELECTOR(BOX_ITEM_CLASS)), !whitelist.has(word));
                    addWordListener($wordElem)
                }
            });
            $(WORDS_POPUP_ID).show();
        });
    });
    addBackButtonListener();
};

/**
 * Adds a listener function to the word element
 * @param $wordElem The word to add the listener to
 **/
const addWordListener = function ($wordElem) {
    $wordElem.click(function ()
    {
        let command;
        const $wordElem = $(this);
        const word = $wordElem.text();
        const category = $wordElem.attr(CATEGORY_ATTR);
        const $checkbox = $wordElem.children(CLASS_SELECTOR(BOX_ITEM_CLASS));
        const unselect = $checkbox.hasClass(CHECK_CLASS);
        toggleCheckBox($checkbox, !unselect);

        browser.storage.sync.get([WHITELIST, BLOCKED_LIST, CUSTOM_BLOCKED_LIST], function (result) {
            const whitelist = new Set(result.whitelist);
            if (unselect)
            {
                whitelist.add(word);
                command = REMOVE_WORD;
                console.info(INFO_WHITELIST_ADD, word);
            }
            else
            {
                whitelist.delete(word);
                command = ADD_WORD;
                console.info(INFO_WHITELIST_DELETE, word);
            }
            browser.storage.sync.set({whitelist: Array.from(whitelist)});

            const categoriesList = Object.assign({}, result.blockedList, result.customBlockedList);
            if (categoriesList[category])
            {
                sendWhitelistCommand(command, word);
            }
        });
    });
};

/**
 * Adds a listener function to the back button in the category words list
 **/
const addBackButtonListener = function () {
    $(BACK_BUTTON_ID).click(function ()
    {
        $(WORDS_POPUP_ID).hide();
        $(WORDS_LIST_ID).empty();
    });
};