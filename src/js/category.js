/*******************************************************************************
 *  H8BL*CK - a hatespeech and offensive language remedial plugin
 *  JavaScript file for selecting categories
 *******************************************************************************/

/**
 * Sends {command} message to all tabs in the window
 * @param command The power command to send
 * @param categoryName The name of the category
 **/
const sendCategoryCommand = function (command, categoryName)
{
    console.log(getCurrentData());
    browser.tabs.getAllInWindow(null, function (tabs)
    {
        tabs.forEach((tab) =>
        {
            browser.tabs.sendMessage(tab.id,
        {
                    command: command,
                    category: categoryName,
                    data: getCurrentData()
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
const addCheckboxListener = function () {
    $(CLASS_SELECTOR(CATEGORY_ITEM_CLASS)).find(CLASS_SELECTOR(BOX_ITEM_CLASS)).click(function () {
        const $checkbox = $(this);
        const categoryName = $checkbox.parent().attr(ID_ATTR);
        const select = !$checkbox.hasClass(CHECK_CLASS);
        const command = select ? ADD_CATEGORY : REMOVE_CATEGORY;

        browser.storage.sync.get([BLOCKED_LIST], function (result) {
            const blockedList = result.blockedList;
            blockedList[categoryName] = select;
            browser.storage.sync.set({blockedList: blockedList});
        });
        toggleCheckBox($checkbox, select, categoryName);
        sendCategoryCommand(command, categoryName);
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
 * Injects categories list into checkbox popup
 **/
browser.storage.sync.get([BLOCKED_LIST, BLOCKED_LABELS], function (result)
{
    const labels = result.blockedLabels;
    for (let [category, enabled] of Object.entries(result.blockedList))
    {
        if (labels[category] === undefined)
        {
            return;
        }

        const checkbox = CATEGORY_LIST_ELEMENT(category, labels[category]);
        $(CATEGORY_LIST_ID).append($.parseHTML(checkbox));
        const $checkbox = $(IDENTIFIER_SELECTOR(category)).children(ICON_TAG);
        toggleCheckBox($checkbox, enabled);
    }
    addCategoryItemListener();
});

