/*******************************************************************************
 *  H8BL*CK - a hatespeech and offensive language remedial plugin
 *  JavaScript file to be injected into specified pages
 *******************************************************************************/

/**
 * Checks if a warning has been issued and warns user of this if not
 */
const warnUnsupported = function () {
    const warnedUnsupported = localStorage.getItem(WARNED_UNSUPPORTED_TAG);
    if (warnedUnsupported !== TRUE)
    {
        alert(WARN_UNSUPPORTED_PAGE);
        localStorage.setItem(WARNED_UNSUPPORTED_TAG, TRUE);
    }
};

/**
 * Receive request from plugin to power on or power off
 **/
browser.runtime.onMessage.addListener(function(request, _, _)
{
    switch (request.command)
    {
        case SWITCH_ON:
            warnUnsupported();
            break;
        case SWITCH_OFF:
            localStorage.setItem(WARNED_UNSUPPORTED_TAG, FALSE);
            break;
    }
});

/**
 * On opening a new page, warn user
 **/
warnUnsupported();
