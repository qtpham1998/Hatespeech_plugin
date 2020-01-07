/*******************************************************************************
 *  H8BL*CK - a hatespeech and offensive language remedial plugin
 *  JavaScript file for selecting categories
 *******************************************************************************/

/**
 * Sends {command} message to all tabs in the window
 * @param command The word blocking command to send
 * @param word The new word to be block
 * @param category The name of the category of the blocked word
 * @param block To block the word or not on call
 **/
const sendBlockWordCommand = function (command, word, category, block)
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
                    data: getCurrentData(),
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
 * @param categories The existing categories
 * @param customCategories The existing custom categories
 * @param wordBank The word bank
 * @param customWordBank The custom word bank
 * @return {boolean} Whether the input is valid or not
 **/
const validInput = function (wordInput, categoryInput, categories, customCategories, wordBank, customWordBank)
{
    let valid = true;
    const $customWarning = $(CUSTOM_WARNING_ID);

    if (wordInput.length === 0 && categoryInput.length === 0)
    {
        $customWarning.html(WARN_EMPTY_INPUT);
        valid = false;
    }
    else if (wordBank[wordInput] !== undefined || customWordBank[wordInput] !== undefined)
    {
        $customWarning.html(WARN_WORD_EXISTS);
        valid = false;
    }
    else if (categories.includes(categoryInput) || customCategories.includes(categoryInput))
    {
        $customWarning.html(WARN_CATEGORY_EXISTS);
        valid = false;
    }
    $customWarning.show();
    return valid
};

/**
 * Resets the customise form
 **/
const resetCustomiseForm = function ()
{
    $(CUSTOM_WARNING_ID).hide();
    $(WORD_TO_BLOCK).val(EMPTY_STR);
    $(BLOCK_WORD_CATEGORY).val(EMPTY_STR);
};

/**
 * Adds a listener function to take input from user for new words (and its categories) to be blocked
 **/
const addCustomiseListener = function ()
{
    $(SUBMIT_BLOCK_BUTTON_ID).click(function ()
    {
        const wordInput = $(WORD_TO_BLOCK).val();
        const categoryInput = $(BLOCK_WORD_CATEGORY).val();
        resetCustomiseForm();

        browser.storage.sync.get([WORD_BANK, BLOCKED_LIST, CUSTOM_BLOCKED_LIST, CUSTOM_WORD_BANK, REPLACE_LIST], function (result)
        {
            const wordBank = result.wordBank;
            const customWordBank = result.customWordBank;
            const categories = Object.keys(result.blockedList);
            const customCategories = Object.keys(result.customBlockedList);

            if (!validInput(wordInput, categoryInput, categories, customCategories, wordBank, customWordBank))
            {
                return;
            }

            if (categoryInput.length > 0)
            {
                const blockedList = result.customBlockedList;
                blockedList[categoryInput] = true;
                customWordBank[wordInput] = categoryInput;
                browser.storage.sync.set({customBlockedList: blockedList, customWordBank: customWordBank}, function ()
                {
                    const option = OPTION_ELEMENT(categoryInput, categoryInput);
                    $(CATEGORY_LIST).append(option);
                });
                if (result.replaceList[wordInput] === undefined)
                {
                    sendBlockWordCommand(ADD_WORD, wordInput, categoryInput, true);
                }

            }
            else
            {
                var selected_category = $(CATEGORY_LIST).find(SELECTED).attr(OPTION_CATEGORY_ATTR);
                customWordBank[wordInput] = selected_category;
                var isBlocked = false;
                if (result.blockedList[selected_category] === undefined)
                {
                    isBlocked = result.customBlockedList[selected_category];
                }
                else
                {
                    isBlocked = result.blockedList[selected_category];
                }
                browser.storage.sync.set({
                    customWordBank: customWordBank,
                }, function ()
                {
                });
                if (result.replaceList[wordInput] === undefined)
                {
                    sendBlockWordCommand(ADD_WORD, wordInput, selected_category, isBlocked);
                }
            }


        });
    });
};

/**
 * Injects categories list into dropdown list for customise words
 **/
$(CUSTOMISE_BUTTON_ID).click(function ()
{
    browser.storage.sync.get([BLOCKED_LIST, BLOCKED_LABELS, CUSTOM_BLOCKED_LIST], function (result)
    {
        $(CATEGORY_LIST).empty();
        const labels = result.blockedLabels;
        for (let [category, enabled] of Object.entries(result.blockedList))
        {
            if (labels[category] === undefined)
            {
                return;
            }
            const option = OPTION_ELEMENT(category, labels[category]);
            $(CATEGORY_LIST).append(option);
        }
        for (let [category, enabled] of Object.entries(result.customBlockedList))
        {
            const option = OPTION_ELEMENT(category, labels[category]);
            $(CATEGORY_LIST).append(option);
        }

        $(ATTRIBUTE_SELECTOR(OPTION_TAG, VALUE_ATTR, DEFAULT_LABEL)).attr(SELECTED_ATTR, true);
        addCustomiseListener();
    });
});

/**
 * Injects table row for user added blocked words
 **/
$(ADDED_WORDS_BUTTON).click(function ()
{
    $(ADDED_WORDS_TABLE).empty();
    browser.storage.sync.get([CUSTOM_WORD_BANK, BLOCKED_LIST, BLOCKED_LABELS, CUSTOM_BLOCKED_LIST], function (result)
    {
        for (let [word, category] of Object.entries(result.customWordBank))
        {
            const row = WORD_TABLE_ROW(word, category);
            $(ADDED_WORDS_TABLE).append(row);
        }
        deleteListeners();
    });
});

/**
 * Injects function to delete blocked words when click on delete button
 **/
const deleteListeners = function ()
{
    $(document).on('click', DELETE_WORD_CLASS, function ()
    {
        var word = $(this).attr(WORD_ATTR);
        var row_id = "#" + word + "-row";
        $(row_id).remove();
        browser.storage.sync.get([CUSTOM_WORD_BANK], function (result)
        {
            var customWordBank = result.customWordBank;
            delete customWordBank[word];
            browser.storage.sync.set({
                customWordBank: customWordBank,
            }, function ()
            {
            });
            sendBlockWordCommand(DELETE_WORD, word, undefined, undefined);

        });
    });
};
