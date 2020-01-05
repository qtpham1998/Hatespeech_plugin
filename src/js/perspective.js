/*******************************************************************************
 *  H8BL*CK - a hatespeech and offensive language remedial plugin
 *  JavaScript file to for using the Perspective API service
 *******************************************************************************/

/**
 * Requests toxicity score from Perspective API
 * @param tabId The ID of the requesting tab
 * @param toAnalyse Array of paragraphs to be analysed
 * @param info Dictionary of information regarding the text to analyse
 **/
const analysePerspective = function (tabId, toAnalyse, info)
{
    const data =
        {
            data: JSON.stringify([toAnalyse, (info.tag % NUMBER_OF_API_KEYS).toLocaleString()])
        };

    $.ajax(
    {
        type: PUT_REQUEST,
        url: PERSPECTIVE_API_URL,
        dataType: JSON_TYPE,
        data: data,
        success: function (response, _, _)
        {
            browser.tabs.sendMessage(tabId, {command: ANALYSE_REQUEST, texts: response, info: info});
        },
        error: function(err, _, _)
        {
            console.log(ERROR_FAILED_PERSPECTIVE_REQ, err.statusText || err.responseText.message || err.responseText);
            const response = {};
            response[toAnalyse] = TOXICITY_SCORE_THRESHOLD;
            browser.tabs.sendMessage(tabId, {command: ANALYSE_REQUEST, texts: response, info: info});
        }
    })
};

/**
 * Receive request from plugin to interact with third party services
 **/
browser.runtime.onMessage.addListener(function(req, sender, _)
{
    if (req.command === ANALYSE_REQUEST) {
        analysePerspective(sender.tab.id, req.analyse, req.info);
    }
});
