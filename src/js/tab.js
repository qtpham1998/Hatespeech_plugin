/*******************************************************************************
 *  H8BL*CK - a hatespeech and offensive language remedial plugin
 *  JavaScript file with components for managing each tab
 *******************************************************************************/

const hBlock = {
   tabData: new Map(),

    lookUp: function(tabId) {
        console.log("Fetching data: " + this.tabData);
        return this.tabData.get(tabId) || 0;
    },

    setData: function (tabId, blocked) {
        console.log("Setting data: " + this.tabData);
        this.tabData[tabId] = blocked;
    }
};

browser.runtime.onMessage.addListener(function (req, sender, resp)
{
   switch (req.type)
   {
       case 'getTabData':
           resp({blocked: hBlock.lookUp(req.value)});
           return;
       case 'setTabData':
           hBlock.setData(req.value, req.blocked);
           return;
       default:
           return;
   }
});