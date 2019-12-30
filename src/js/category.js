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
    browser.tabs.getAllInWindow(null, function (tabs)
    {
        tabs.forEach((tab) => {
            browser.tabs.sendMessage(tab.id,
                {
                    command: command,
                    category: categoryName
                },
                function (resp)
                {
                    updatePopupData(resp.blocked, command === ADD_CATEGORY);
                });
        });
    });
};

/**
 * Adds a listener function to the checkboxes which updates blocked content when changes occur
 **/
const addCategoryListener = function ()
{
    $(ATTRIBUTE_SELECTOR(INPUT_TAG, TYPE_ATTR, CHECKBOX_INPUT_TYPE)).change(function ()
    {
        const $checkbox = $(this);
        const categoryName = $checkbox.attr(ID_ATTR);
        browser.storage.sync.get(['blockedList'], function (result)
        {
            const blockedList = result.blockedList;
            if (blockedList[categoryName] === undefined)
            {
                return;
            }

            const select = !blockedList[categoryName];
            blockedList[categoryName] = select;
            browser.storage.sync.set({blockedList: blockedList}, EMPTY_FUNCTION);
            const command = select ? ADD_CATEGORY : REMOVE_CATEGORY;
            sendCategoryCommand(command, categoryName);
        });
    });
};

/**
 * Injects categories list into checkbox popup
 **/
browser.storage.sync.get(['blockedList', 'blockedLabels'], function (result)
{
    const labels = result.blockedLabels;
    for (let [category, enabled] of Object.entries(result.blockedList))
    {
        if (labels[category] === undefined)
        {
            return;
        }
        const checkbox = LIST_ELEMENT(CHECKBOX_ELEMENT(category, labels[category]));
        $(CATEGORY_LIST_ID).append($.parseHTML(checkbox));
        $(IDENTIFIER_SELECTOR(category)).prop(CHECKED_PROP, enabled);
    }
    addCategoryListener();
});

