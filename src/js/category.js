/*******************************************************************************
 *  H8BL*CK - a hatespeech and offensive language remedial plugin
 *  JavaScript file for selecting categories
 *******************************************************************************/

/**
 * Sends {command} message to all tabs in the window
 * @param command The power command to send
 * @param categoryName The name of the category
 * @param remove Whether the category is deleted. Defaults to false
 **/
const sendCategoryCommand = function (command, categoryName, remove = false)
{
    browser.tabs.getAllInWindow(null, function (tabs)
    {
        tabs.forEach((tab) =>
        {
            browser.tabs.sendMessage(tab.id,
                {
                    command: command,
                    category: categoryName,
                    remove: remove
                },
                function (resp)
                {
                    updatePopupData(resp.blocked);
                });
        });
    });
};

/**
 * Adds a listener function to the checkboxes and more functionality
 **/
const addCheckboxListener = function ()
{
    $(CLASS_SELECTOR(CATEGORY_ITEM_CLASS)).find(CLASS_SELECTOR(BOX_ITEM_CLASS)).click(function ()
    {
        const $checkbox = $(this);
        const categoryName = $checkbox.parent().attr(ID_ATTR);
        const select = !$checkbox.hasClass(CHECK_CLASS);
        const command = select ? ADD_CATEGORY : REMOVE_CATEGORY;

        browser.storage.sync.get([BLOCKED_LIST, CUSTOM_BLOCKED_LIST], function (result)
        {
            if (result.blockedList[categoryName] === undefined)
            {
                const blockedList = result.customBlockedList;
                blockedList[categoryName] = select;
                browser.storage.sync.set({customBlockedList: blockedList});
            }
            else
            {
                const blockedList = result.blockedList;
                blockedList[categoryName] = select;
                browser.storage.sync.set({blockedList: blockedList});
            }
        });
        toggleCheckBox($checkbox, select, categoryName);
        sendCategoryCommand(command, categoryName, false);
    });
};

/**
 * Adds a listener function to the category list items
 **/
const addCategoryItemListener = function ()
{
    addCheckboxListener();
    addMoreListener();
};

/**
 * Injects categories list into checkbox popup when category button is clicked
 **/
$(CATEGORY_BUTTON_ID).click(function ()
{
    const $categoryList = $(CATEGORY_LIST_ID);
    $categoryList.empty();
    browser.storage.sync.get([BLOCKED_LIST, BLOCKED_LABELS, CUSTOM_BLOCKED_LIST, CUSTOM_BLOCKED_LABELS], function (result)
    {
        const labels = Object.assign({}, result.blockedLabels, result.customBlockedLabels);
        const categoriesList = Object.assign({}, result.blockedList, result.customBlockedList);

        for (let [category, enabled] of Object.entries(categoriesList))
        {
            if (labels[category] === undefined)
            {
                return;
            }

            const checkbox = CATEGORY_LIST_ELEMENT(category, labels[category]);
            $categoryList.append($.parseHTML(checkbox));
            const $checkbox = $(IDENTIFIER_SELECTOR(category)).children(ICON_TAG);
            toggleCheckBox($checkbox, enabled);
        }

        addCategoryItemListener();
    });
});
