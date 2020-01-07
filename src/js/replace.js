/*******************************************************************************
 *  H8BL*CK - a hatespeech and offensive language remedial plugin
 *  JavaScript file for selecting categories
 *******************************************************************************/

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
                 });
         });
     });
 };


 $(REPLACE_SUBMIT_BUTTON_ID).click(function (){
     $(REPLACE_WARNING_ID).hide();
     browser.storage.sync.get([REPLACE_LIST, WORD_BANK, CUSTOM_WORD_BANK], function(result){
       var replaceList = result.replaceList;
       const wordInput = $(WORD_TO_REPLACE).val();
       const replaceInput = $(WORD_REPLACEMENT).val();

       $(WORD_TO_REPLACE).val("");
       $(WORD_REPLACEMENT).val("");

       if(wordInput.length == 0){
         $(REPLACE_WARNING_ID).html("Please enter a word to replace!");
         $(REPLACE_WARNING_ID).show();
         return;
       }else if(replaceInput.length == 0){
         $(REPLACE_WARNING_ID).html("Please enter a replacement");
         $(REPLACE_WARNING_ID).show();
         return;
       }else if(replaceList[wordInput] !== undefined){
         $(REPLACE_WARNING_ID).html("Replacement for " + wordInput +" already existed!");
         $(REPLACE_WARNING_ID).show();
         return;
       }else if(result.wordBank[replaceInput] !== undefined || result.customWordBank[replaceInput] !== undefined){
         $(REPLACE_WARNING_ID).html("Replacement word is blocked!");
         $(REPLACE_WARNING_ID).show();
         return;
       }else{
         for (let [word, replacement] of Object.entries(result.replaceList)){
             if(wordInput === replacement){
               $(REPLACE_WARNING_ID).html( replacement + " is already replacement for " + word);
               $(REPLACE_WARNING_ID).show();
               return;
             }
         }

       }
       replaceList[wordInput] = replaceInput;
       sendReplaceWordCommand(ADD_REPLACEMENT, wordInput, replaceInput);

       browser.storage.sync.set({
           replaceList: replaceList
       }, EMPTY_FUNCTION);
     });
   });


   $(REPLACED_WORDS_BUTTON).click(function(){
       $(REPLACED_WORDS_TABLE).empty();
     browser.storage.sync.get([REPLACE_LIST], function (result)
   {
       for (let [word, replacement] of Object.entries(result.replaceList))
       {
           const row = REPLACE_TABLE_ROW(word, replacement);
           $(REPLACED_WORDS_TABLE).append(row);
       }
   });
   deleteReplacement();
   })

/**
 * Injects function to delete word replacement when click on delete button
 **/
const deleteReplacement = function(){
  $(document).on('click',DELETE_REPLACEMENT_CLASS,function(){
     var word = $(this).attr(WORD_ATTR);
     var row_id = "#" + word+"-replace";
     $(row_id).remove();
     browser.storage.sync.get([REPLACE_LIST], function (result)
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
