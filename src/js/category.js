/*******************************************************************************
 *  H8BL*CK - a hatespeech and offensive language remedial plugin
 *  JavaScript file for selecting categories
 *******************************************************************************/

/**
 * Sends {command} message to all tabs in the window
 * @param command The power command to send
 * @param categoryName The name of the category
 **/
const sendCategoryCommand = function (command, categoryName,remove)
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
                    data: getCurrentData(),
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
const addCheckboxListener = function () {
    $(CLASS_SELECTOR(CATEGORY_ITEM_CLASS)).find(CLASS_SELECTOR(BOX_ITEM_CLASS)).click(function () {
        const $checkbox = $(this);
        const categoryName = $checkbox.parent().attr(ID_ATTR);
        const select = !$checkbox.hasClass(CHECK_CLASS);
        const command = select ? ADD_CATEGORY : REMOVE_CATEGORY;

        browser.storage.sync.get([BLOCKED_LIST,CUSTOM_BLOCKED_LIST], function (result) {
          if(result.blockedList[categoryName] == undefined){
            const blockedList = result.customBlockedList;
            blockedList[categoryName] = select;
            browser.storage.sync.set({customBlockedList: blockedList});
          }else{
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
 * Injects categories list into checkbox popup
 **/
$('#category-button').click(function(){
  $(CATEGORY_LIST_ID).empty();
browser.storage.sync.get([BLOCKED_LIST, BLOCKED_LABELS, CUSTOM_BLOCKED_LIST], function (result)
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

    for (let [category, enabled] of Object.entries(result.customBlockedList))
    {
        const checkbox = CUSTOM_CATEGORY_LIST_ELEMENT(category, category);
        $(CATEGORY_LIST_ID).append($.parseHTML(checkbox));
        const $checkbox = $(IDENTIFIER_SELECTOR(category)).children(ICON_TAG);
        toggleCheckBox($checkbox, enabled);
    }

    addCategoryItemListener();
});
});

/**
 * Injects categories button for all user added categories
 **/
$(ADDED_CATEGORIES_BUTTON).click(function(){
    $(ADDED_CATEGORIES).empty();
    browser.storage.sync.get([CUSTOM_BLOCKED_LIST], function (result)
  {
      for (let [category, enabled] of Object.entries(result.customBlockedList))
      {
          console.log(category);
          const button = CATEGORY_BUTTON(category);
          $(ADDED_CATEGORIES).append(button);
      }
  });
  deleteCategories();
});

/**
 * Injects function to delete category and its words when click on category button
 **/
const deleteCategories = function(){
  $(document).on('click',CATEGORY_BUTTON_CLASS,function(){
    const category = $(this).attr(OPTION_CATEGORY_ATTR);
    $('#' + category + '-option').remove();
     browser.storage.sync.get([CUSTOM_WORD_BANK,CUSTOM_BLOCKED_LIST], function (result)
   {
       var customWordBank = result.customWordBank;
       var customBlockedList = result.customBlockedList;
       delete customBlockedList[category];
       for (let [word, wordCategory] of Object.entries(result.customWordBank))
       {
         if(wordCategory === category){
           delete customWordBank[word];
         }
       }
       browser.storage.sync.set({
           customBlockedList: customBlockedList,
           customWordBank: customWordBank
       }, function ()
       {
       });

   });
   sendCategoryCommand(REMOVE_CATEGORY,category, true);
   $(this).remove();
  });
};
