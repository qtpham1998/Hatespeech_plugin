/*******************************************************************************
 *  H8BL*CK - a hatespeech and offensive language remedial plugin
 *  JavaScript file for a categories' words list
 *******************************************************************************/

/**
 * Adds a listener function to the 'more' element for the category list items.
 * Lists out words of the category in the popup
 **/
const addMoreListener = function () {
    $(CLASS_SELECTOR(CATEGORY_MORE_CLASS)).click(function ()
    {
        const $checkbox = $(this);
        const categoryName = $checkbox.parent().attr(ID_ATTR);

        browser.storage.sync.get([WORD_BANK, WHITELIST], function (result)
        {
            const $wordsList = $(WORDS_LIST_ID);
            const whitelist = new Set(result.whitelist);
            Object.entries(result.wordBank).forEach(function ([word, category])
            {
                if (category === categoryName)
                {
                    const identifier = word.replace(new RegExp(SPACE_STR, GI_REG_EXP), DASH_STR);
                    $wordsList.append($.parseHTML(WORD_LIST_ELEMENT(identifier, word)));
                    const $wordElem = $(IDENTIFIER_SELECTOR(identifier));
                    toggleCheckBox($wordElem.children(CLASS_SELECTOR(BOX_ITEM_CLASS)), !whitelist.has(word));
                    addWordListener($wordElem)
                }
            });
            $(WORDS_POPUP_ID).removeClass(DISPLAY_NONE_CLASS);
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
        const $wordElem = $(this);
        const word = $wordElem.text();
        const $checkbox = $wordElem.children(CLASS_SELECTOR(BOX_ITEM_CLASS));
        const unselect = $checkbox.hasClass(CHECK_CLASS);
        toggleCheckBox($checkbox, !unselect);

        browser.storage.sync.get([WHITELIST], function (result) {
            const whitelist = new Set(result.whitelist);
            if (unselect)
            {
                whitelist.add(word);
                console.info(INFO_WHITELIST_ADD, word);
            }
            else
            {
                whitelist.delete(word);
                console.info(INFO_WHITELIST_DELETE, word);
            }
            browser.storage.sync.set({whitelist: Array.from(whitelist)});
        });
    });
};

/**
 * Adds a listener function to the back button in the category words list
 **/
const addBackButtonListener = function () {
    $(BACK_BUTTON_ID).click(function ()
    {
        $(WORDS_POPUP_ID).addClass(DISPLAY_NONE_CLASS);
        $(WORDS_LIST_ID).empty();
    });
};