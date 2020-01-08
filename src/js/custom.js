/*******************************************************************************
 *  H8BL*CK - a hatespeech and offensive language remedial plugin
 *  JavaScript file for custom words/categories
 *******************************************************************************/

/**
 * Sends {command} message to all tabs in the window
 * @param command The word blocking command to send
 * @param word The new word to be block
 * @param category The name of the category of the blocked word
 * @param block To block the word or not on call
 **/
const sendCustomWordCommand = function (command, word, category, block)
{
    browser.tabs.getAllInWindow(null, function (tabs)
    {
        tabs.forEach((tab) =>
        {
            browser.tabs.sendMessage(tab.id,
        {
                    command: command,
                    word: word,
                    category: category,
                    block: block,
                },
                function (resp)
                {
                    updatePopupData(resp.blocked);
                });
        });
    });
};

/**
 * Validates the submitted word/category
 * @param wordInput The input word
 * @param categoryInput The input category
 * @param words The existing words
 * @param categories The existing categories
 * @param replaceList The replacements list
 * @return {boolean} Whether the input is valid or not
 **/
const validInput = function (wordInput, categoryInput, words, categories, replaceList)
{
    let valid = true;
    const $customWarning = $(WARNING_MESSAGE_ID);

    if (wordInput.length === 0 && categoryInput.length === 0)
    {
        $customWarning.text(WARN_EMPTY_INPUT);
        valid = false;
    }
    else if (words.includes(wordInput))
    {
        $customWarning.text(WARN_WORD_EXISTS);
        valid = false;
    }
    else if (categories.includes(categoryInput))
    {
        $customWarning.text(WARN_CATEGORY_EXISTS);
        valid = false;
    }
    else if (Object.values(replaceList).includes(wordInput))
    {
        $customWarning.text(WARN_WORD_REPLACEMENT);
        valid = false;
    }
    return valid
};

/**
 * Resets the customise form
 **/
const resetCustomiseForm = function ()
{
    $(CUSTOM_WORD_INPUT).val(EMPTY_STR);
    $(CUSTOM_CATEGORY_INPUT).val(EMPTY_STR);
};

/**
 * Catpitalises the name of the category
 **/
const getLabel = function (categoryName)
{
    return categoryName.charAt(0).toUpperCase() + categoryName.slice(1);
};

/**
 * Adds a word to the custom word bank, and a new category if given
 * @param wordInput The new word
 * @param categoryInput The new category, can be empty
 * @param blockedList The categories list
 * @param customBlockedList The custom categories list
 * @param customWordBank The custom word bank
 **/
const addCustomWord = function (wordInput, categoryInput, blockedList, customBlockedList, customWordBank)
{
    let category, isBlocked;

    if (categoryInput.length > 0)
    {
        category = categoryInput;
        isBlocked = true;

        // Adds new category to the list
        const categoryLabel = getLabel(categoryInput);
        customBlockedList[categoryInput] = true;
        browser.storage.sync.get([CUSTOM_BLOCKED_LABELS], function (result)
        {
           const customBlockedLabels = result.customBlockedLabels;
           customBlockedLabels[category] = categoryLabel;
           browser.storage.sync.set({customBlockedList: customBlockedList, customBlockedLabels: customBlockedLabels});
        });
        // Adds label to selection list
        $(CATEGORY_SELECT_LIST_ID).append(SELECT_CATEGORY_OPTION(categoryInput, getLabel(categoryLabel)));
    }
    else
    {
        category = $(CATEGORY_SELECT_LIST_ID).find(SELECTED_OPT).attr(ID_ATTR);
        isBlocked = blockedList[category] || customBlockedList[category];
    }

    customWordBank[wordInput] = category;
    browser.storage.sync.set({customWordBank: customWordBank});
    sendCustomWordCommand(ADD_CUSTOM_WORD, wordInput, category, isBlocked);
};

/**
 * Adds a listener function to take input from user for new words (and its categories) to be blocked
 **/
const addCustomiseSubmitListener = function ()
{
    $(SUBMIT_BLOCK_BUTTON_ID).click(function ()
    {
        const wordInput = $(CUSTOM_WORD_INPUT).val();
        const categoryInput = $(CUSTOM_CATEGORY_INPUT).val();
        resetCustomiseForm();

        browser.storage.sync.get([WORD_BANK, CUSTOM_WORD_BANK, BLOCKED_LIST, CUSTOM_BLOCKED_LIST, REPLACE_LIST], function (result)
        {
            const customWordBank = result.customWordBank;
            const blockedList = result.blockedList;
            const customBlockedList = result.customBlockedList;
            const words = [...Object.keys(result.wordBank), ...Object.keys(customWordBank)];
            const categories = [...Object.keys(blockedList), ...Object.keys(customBlockedList)];

            // If input is invalid, gives warning and stops
            if (!validInput(wordInput, categoryInput, words, categories, result.replaceList))
            {
               showWaningPopup();
               return;
            }

            addCustomWord(wordInput, categoryInput, blockedList, customBlockedList, customWordBank);
        });
    });
};

/**
 * Adds a listener function that injects categories list into dropdown selection for customise
 **/
const addCustomiseButtonListener = function ()
{
    $(CUSTOMISE_BUTTON_ID).click(function ()
    {
        const $categoriesList = $(CATEGORY_SELECT_LIST_ID);
        $categoriesList.empty();
        browser.storage.sync.get([BLOCKED_LIST, BLOCKED_LABELS, CUSTOM_BLOCKED_LIST, CUSTOM_BLOCKED_LABELS], function (result)
        {
            const labels = Object.assign({}, result.blockedLabels, result.customBlockedLabels);
            const list = Object.assign({}, result.blockedList, result.customBlockedList);

            for (let [category, _] of Object.entries(list))
            {
                if (labels[category] === undefined)
                {
                    continue;
                }
                const option = SELECT_CATEGORY_OPTION(category, labels[category]);
                $categoriesList.append(option);
            }

            $(ATTRIBUTE_SELECTOR(OPTION_TAG, ID_ATTR, CUSTOM_CATEGORY)).attr(SELECTED_ATTR, true);
        });
    });
};

/**
 * Adds a listener function that injects custom words into table of 'custom-words-popup'
 **/
const addCustomWordsListener = function ()
{
    $(CUSTOM_WORDS_BUTTON).click(function ()
    {
        const $customWordsTable = $(CUSTOM_WORDS_TABLE_ID);
        $customWordsTable.empty();
        browser.storage.sync.get([CUSTOM_WORD_BANK, BLOCKED_LABELS, CUSTOM_BLOCKED_LABELS], function (result)
        {
            const categories = Object.assign({}, result.blockedLabels, result.customBlockedLabels);
            for (let [word, category] of Object.entries(result.customWordBank))
            {
                const row = CUSTOM_WORD_TABLE_ROW(word, categories[category]);
                $customWordsTable.append(row);
            }
            addDeleteWordListener();
        });
    });
};

/**
 * Adds a listener function to delete word   click on category button
 **/
const addDeleteWordListener = function ()
{
    $(CLASS_SELECTOR(DELETE_CUSTOM_CLASS)).click(function ()
    {
        const $row = $(this).parent().parent();
        const word = $row.attr(ID_ATTR);
        $row.remove();
        browser.storage.sync.get([CUSTOM_WORD_BANK], function (result)
        {
            const customWordBank = result.customWordBank;
            delete customWordBank[word];
            browser.storage.sync.set({customWordBank: customWordBank});
            sendCustomWordCommand(DELETE_CUSTOM_WORD, word);
        });
    });
};


/**
 * Adds a listener function that injects custom categories into table of 'custom-categories-popup'
 **/
const addCustomCategoriesListener = function ()
{
    $(CUSTOM_CATEGORIES_BUTTON).click(function ()
    {
        const $customCategoriesTable = $(CUSTOM_CATEGORIES_TABLE_ID);
        $customCategoriesTable.empty();
        browser.storage.sync.get([CUSTOM_BLOCKED_LIST, CUSTOM_BLOCKED_LABELS], function (result)
        {
            for (let [category, label] of Object.entries(result.customBlockedLabels))
            {
                const button = CUSTOM_CATEGORY_TABLE_ROW(category, label);
                $customCategoriesTable.append(button);
            }
            addDeleteCategoriesListener();
        });
    });
};

/**
 * Injects function to delete category and its words when click on category button
 **/
const addDeleteCategoriesListener = function ()
{
    $(CLASS_SELECTOR(DELETE_CUSTOM_CLASS)).click(function ()
    {
        const $row = $(this).parent().parent();
        const category = $row.attr(ID_ATTR);
        $row.remove();
        browser.storage.sync.get([CUSTOM_WORD_BANK, CUSTOM_BLOCKED_LIST, CUSTOM_BLOCKED_LABELS], function (result)
        {
            const customWordBank = result.customWordBank;
            const customBlockedList = result.customBlockedList;
            const customBlockedLabels = result.customBlockedLabels;

            delete customBlockedList[category];
            delete customBlockedLabels[category];
            for (let [word, wordCategory] of Object.entries(result.customWordBank))
            {
                if (wordCategory === category)
                {
                    delete customWordBank[word];
                }
            }

            browser.storage.sync.set({
                customWordBank: customWordBank,
                customBlockedList: customBlockedList,
                customBlockedLabels: customBlockedLabels
            });
            sendCategoryCommand(REMOVE_CATEGORY, category, true);
        });
    });
};

/**
 * Adds all listener functions related to custom words/categories
 **/
const addCustomiseListener = function ()
{
    addCustomiseButtonListener();
    addCustomiseSubmitListener();
    addCustomWordsListener();
    addCustomCategoriesListener();

};
addCustomiseListener();

