/*******************************************************************************
 *  H8BL*CK - a hatespeech and offensive language remedial plugin
 *  JavaScript file for selecting categories
 *******************************************************************************/

/**
 * Sends {command} message to all tabs in the window
 * @param command The power command to send
 * @param categoryName The name of the category
 * @param removeCategory remove category class from the element
 **/
const sendCategoryCommand = function (command, categoryName, removeCategory=false)
{
    browser.tabs.getAllInWindow(null, function (tabs)
    {
        tabs.forEach((tab) => {
            browser.tabs.sendMessage(tab.id,
                {
                    command: command,
                    category: categoryName,
                    remove: removeCategory
                },
                function (resp)
                {
                    updatePopupData(resp.blocked, command === ADD_CATEGORY);
                });
        });
    });
};

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
        tabs.forEach((tab) => {
            browser.tabs.sendMessage(tab.id,
                {
                    command: command,
                    word: word,
                    category: category,
                    block: block
                },
                function (resp)
                {
                    updatePopupData(resp.blocked, command === ADD_WORD);
                });
        });
    });
};

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
        tabs.forEach((tab) => {
            browser.tabs.sendMessage(tab.id,
                {
                    command: command,
                    word: word,
                    replace: replacement
                },
                function (resp)
                {
                    //updatePopupData(resp.blocked, command === ADD_WORD);
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
        browser.storage.sync.get(['blockedList', 'customBlockedList'], function (result)
        {
            const blockedList = result.blockedList;
            const customBlockedList = result.customBlockedList;


            if (blockedList[categoryName] === undefined && customBlockedList[categoryName] === undefined)
            {
                return;
            }

            var select = false;
            if(blockedList[categoryName] === undefined){
              select = !customBlockedList[categoryName];
              customBlockedList[categoryName] = select;
            }else{
              select = !blockedList[categoryName];
              blockedList[categoryName] = select;
            }
            browser.storage.sync.set({blockedList: blockedList, customBlockedList: customBlockedList}, EMPTY_FUNCTION);
            const command = select ? ADD_CATEGORY : REMOVE_CATEGORY;
            sendCategoryCommand(command, categoryName);
        });
    });
};


/**
 * Take input from user for words to be replaced into new words
 **/
const replaceListener = function()
{
  $(REPLACE_SUBMIT_BUTTON).click(function (){
    $(REPLACE_WARNING).hide();
    browser.storage.sync.get(['replaceList', 'wordBank', 'customWordBank'], function(result){
      var replaceList = result.replaceList;
      const wordInput = $(WORD_TO_REPLACE).val();
      const replaceInput = $(WORD_REPLACEMENT).val();

      $(WORD_TO_REPLACE).val("");
      $(WORD_REPLACEMENT).val("");

      if(wordInput.length == 0){
        $(REPLACE_WARNING).html("Please enter a word to replace!");
        $(REPLACE_WARNING).show();
        return;
      }else if(replaceInput.length == 0){
        $(REPLACE_WARNING).html("Please enter a replacement");
        $(REPLACE_WARNING).show();
        return;
      }else if(replaceList[wordInput] !== undefined){
        $(REPLACE_WARNING).html("Replacement for " + wordInput +" already existed!");
        $(REPLACE_WARNING).show();
        return;
      }else if(result.wordBank[replaceInput] !== undefined || result.customWordBank[replaceInput] !== undefined){
        $(REPLACE_WARNING).html("Replacement word is blocked!");
        $(REPLACE_WARNING).show();
        return;
      }else{
        for (let [word, replacement] of Object.entries(result.replaceList)){
            if(wordInput === replacement){
              $(REPLACE_WARNING).html( replacement + " is already replacement for " + word);
              $(REPLACE_WARNING).show();
              return;
            }
        }

      }
      replaceList[wordInput] = replaceInput;
      sendReplaceWordCommand(ADD_REPLACEMENT, wordInput, replaceInput);

      browser.storage.sync.set({
          replaceList: replaceList
      }, EMPTY_FUNCTION);
    })
  })
}

/**
 * Take input from user for new words to be block and it's respective category
 **/
const customiseListener = function ()
{
    $(SUBMIT_BLOCK_BUTTON).click(function ()
    {
      $(CUSTOM_WARNING).hide();
        browser.storage.sync.get(['wordBank', 'blockedList', 'customBlockedList','customWordBank', 'replaceList'], function (result)
        {
          const wordBank = result.wordBank;
          const categories = Object.keys(result.blockedList);
          const customCategories = Object.keys(result.customBlockedList);
          const wordInput = $(WORD_TO_BLOCK).val();
          const categoryInput = $(BLOCK_WORD_CATEGORY).val();
          const customWordBank = result.customWordBank;

          $(WORD_TO_BLOCK).val("");
          $(BLOCK_WORD_CATEGORY).val("");

         if(wordInput.length == 0){
            $(CUSTOM_WARNING).html("Please enter a word!");
            $(CUSTOM_WARNING).show();
            return;
         } else if(wordBank[wordInput.toLowerCase()] !== undefined || customWordBank[wordInput.toLowerCase()] !== undefined){
            $(CUSTOM_WARNING).html("Word existed!");
            $(CUSTOM_WARNING).show();
            return;
          }else if(categoryInput.length > 0 && ($.inArray(categoryInput, categories) !== -1 ||
            $.inArray(categoryInput, customCategories) !== -1)){
            $(CUSTOM_WARNING).html("Category existed!");
            $(CUSTOM_WARNING).show();
            return;
          }

          if(categoryInput.length > 0){
              const blockedList = result.customBlockedList;
              blockedList[categoryInput] = true;
              customWordBank[wordInput] = categoryInput;
              browser.storage.sync.set({
                  customBlockedList: blockedList,
                  customWordBank: customWordBank,
              }, function ()
              {
                const option = OPTION_ELEMENT(categoryInput, categoryInput);
                $(CATEGORY_LIST).append(option);
              });
              if(result.replaceList[wordInput] === undefined){
              sendBlockWordCommand(ADD_WORD, wordInput, categoryInput,true);
            }

          }else {
            var selected_category = $(CATEGORY_LIST).find(SELECTED).attr(OPTION_CATEGORY_ATTR);
            customWordBank[wordInput] = selected_category;
            var isBlocked = false;
            if(result.blockedList[selected_category] === undefined){
              isBlocked = result.customBlockedList[selected_category];
            }else{
              isBlocked = result.blockedList[selected_category];
            }
            browser.storage.sync.set({
                customWordBank: customWordBank,
            }, function ()
            {});
            if(result.replaceList[wordInput] === undefined){
            sendBlockWordCommand(ADD_WORD, wordInput, selected_category, isBlocked);
          }
          }


        });
    });
};


/**
 * Injects categories list into checkbox popup
 **/
const loadAllCategory = function(){
  $('#category-button').click(function(){
browser.storage.sync.get(['blockedList', 'blockedLabels','customBlockedList'], function (result)
{
    const labels = result.blockedLabels;
    $(CATEGORY_LIST_ID).empty();
    console.log(result.blockedList);
    console.log(result.customBlockedList);
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

    for (let [category, enabled] of Object.entries(result.customBlockedList))
    {
        const checkbox = LIST_ELEMENT(CHECKBOX_ELEMENT(category, category));
        $(CATEGORY_LIST_ID).append($.parseHTML(checkbox));
        $(IDENTIFIER_SELECTOR(category)).prop(CHECKED_PROP, enabled);
    }
    addCategoryListener();
});
})};


/**
 * Injects categories list into dropdown list for customise words
 **/
const loadCategory = function(){
  $(CUSTOMISE_BUTTON).click(function(){
  browser.storage.sync.get(['blockedList', 'blockedLabels','customBlockedList'], function (result)
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

    $(ATTRIBUTE_SELECTOR(OPTION_TAG, VALUE_ATTR, DEFAULT_LABEL)).attr(SELECTED_ATTR,true);
});
});
  customiseListener();
}


/**
 * Injects function to delete blocked words when click on delete button
 **/
const deleteListeners = function(){
  $(document).on('click',DELETE_WORD_CLASS,function(){
     var word = $(this).attr(WORD_ATTR);
     var row_id = "#" + word+"-row";
     $(row_id).remove();
     browser.storage.sync.get(['customWordBank'], function (result)
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

/**
 * Injects function to delete word replacement when click on delete button
 **/
const deleteReplacement = function(){
  $(document).on('click',DELETE_REPLACEMENT_CLASS,function(){
     var word = $(this).attr(WORD_ATTR);
     var row_id = "#" + word+"-replace";
     $(row_id).remove();
     browser.storage.sync.get(['replaceList'], function (result)
   {
       var replaceList = result.replaceList;
       delete replaceList[word];
       browser.storage.sync.set({
           replaceList: replaceList
       }, function ()
       {
       });
       //sendBlockWordCommand(DELETE_WORD, word, undefined, undefined);

   });
   sendReplaceWordCommand(DELETE_REPLACEMENT, word, undefined)
  });
};

/**
 * Injects function to delete category and its words when click on category button
 **/
const deleteCategories = function(){
  $(document).on('click',CATEGORY_BUTTON_CLASS,function(){
    const category = $(this).attr('category');
     browser.storage.sync.get(['customWordBank','customBlockedList'], function (result)
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

/**
 * Injects table row for user added blocked words
 **/
const loadCustomWordsTable = function(){
  $(ADDED_WORDS_BUTTON).click(function(){
    $(ADDED_WORDS_TABLE).empty();
  browser.storage.sync.get(['customWordBank'], function (result)
{
    for (let [word, category] of Object.entries(result.customWordBank))
    {
        const row = WORD_TABLE_ROW(word, category);
        $(ADDED_WORDS_TABLE).append(row);
    }
});
 deleteListeners();
})};

/**
 * Injects table row for user added replacements
 **/
const loadReplaceTable = function(){
    $(REPLACED_WORDS_BUTTON).click(function(){
    $(REPLACED_WORDS_TABLE).empty();
  browser.storage.sync.get(['replaceList'], function (result)
{
    for (let [word, replacement] of Object.entries(result.replaceList))
    {
        const row = REPLACE_TABLE_ROW(word, replacement);
        $(REPLACED_WORDS_TABLE).append(row);
    }
});
deleteReplacement();
})};


/**
 * Injects categories button for all user added categories
 **/
const loadCustomCategoryButtons = function(){
  $(ADDED_CATEGORIES_BUTTON).click(function(){
    $(ADDED_CATEGORIES).empty();
    browser.storage.sync.get(['customBlockedList'], function (result)
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
};


replaceListener();
loadCategory();
loadAllCategory();
loadCustomWordsTable();
loadReplaceTable();
loadCustomCategoryButtons();
