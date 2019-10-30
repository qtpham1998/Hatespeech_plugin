/*******************************************************************************
 *  H8BL*CK - a hatespeech and offensive language remedial plugin
 *  JavaScript file for mock browser used in testing
 *******************************************************************************/
const browser =
{
    runtime:
    {
        onMessage:
        {
            addListener(callback) {}
        },
        onInstalled:
        {
            addListener(callback) {}
        },
        sendMessage(request, callback)
        {
            // Popup blocked data mock
            callback({blocked: 13})
        }
    },

    storage:
    {
        sync:
        {
            get(list, callback)
            {
                callback({power: false});
            }
        }
    },

    tabs:
    {
        onActivated:
        {
            addListener(callback) {}
        },
        getAllInWindow(param, callback) {},
        query(data, callback)
        {
            callback([{id: 1234}]);
        }
    },

    browserAction:
    {
        setIcon(params) {}
    }
};