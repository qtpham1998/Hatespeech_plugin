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
        tabs.forEach((tab) => {
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
                    updatePopupData(resp.blocked, command === ADD_WORD);
                });
        });
    });
};

/**
 * Take input from user for new words to be block and it's respective category
 **/
const customiseListener = function ()
{
    $(SUBMIT_BLOCK_BUTTON).click(function ()
    {
      $(CUSTOM_WARNING).hide();
      const wordInput = $(WORD_TO_BLOCK).val();
      const categoryInput = $(BLOCK_WORD_CATEGORY).val();
        browser.storage.sync.get([WORD_BANK, BLOCKED_LIST, CUSTOM_BLOCKED_LIST,CUSTOM_WORD_BANK, REPLACE_LIST], function (result)
        {
          const wordBank = result.wordBank;
          const categories = Object.keys(result.blockedList);
          const customCategories = Object.keys(result.customBlockedList);
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
 * Injects categories list into dropdown list for customise words
 **/
$(CUSTOMISE_BUTTON).click(function(){
  browser.storage.sync.get([BLOCKED_LIST, BLOCKED_LABELS,CUSTOM_BLOCKED_LIST], function (result)
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
    customiseListener();
});
});

/**
 * Injects table row for user added blocked words
 **/
$(ADDED_WORDS_BUTTON).click(function(){
    $(ADDED_WORDS_TABLE).empty();
    browser.storage.sync.get([CUSTOM_WORD_BANK, BLOCKED_LIST, BLOCKED_LABELS,CUSTOM_BLOCKED_LIST], function (result)
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
const deleteListeners = function(){
  $(document).on('click',DELETE_WORD_CLASS,function(){
     var word = $(this).attr(WORD_ATTR);
     var row_id = "#" + word+"-row";
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
