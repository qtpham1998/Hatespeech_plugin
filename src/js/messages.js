/*******************************************************************************
 *  H8BL*CK - a hatespeech and offensive language remedial plugin
 *  JavaScript file for messages
 *******************************************************************************/

/* ****************************************************
 *              CONSOLE INFO MESSAGES
 * ****************************************************/
/**
 * Message indicating list of words have been loaded
 **/
const INFO_LOADED_WORDS = 'INFO: Loaded words into storage.';

/**
 * Message indicating list of categories have been loaded
 **/
const INFO_LOADED_CATEGORIES = 'INFO: Loaded categories into storage.';

/**
 * Message indicating power is set to off
 **/
const INFO_POWER_OFF = 'INFO: Power is switched off.';

/**
 * Message indicating power is set to on
 **/
const INFO_POWER_ON = 'INFO: Power is switched on.';

/**
 * Message indicating the tab's data is being fetched
 * <ul>
 *     <li> {0} - The tab's ID </li>
 *     <li> {1} - The tab's data </li>
 * </ul>
 **/
const INFO_GET_DATA = 'INFO: Fetching data for tab %d, count is %d';

/**
 * Message indicating a tab's data is being set
 * <ul>
 *     <li> {0} - The tab's ID </li>
 *     <li> {1} - The number of offensive words detected in the tab </li>
 * </ul>
 **/
const INFO_SET_DATA = 'INFO: Setting data for tab %d, with offensive word count of %d';

/**
* Message indicating the tab's data is being fetched
* <ul>
*     <li> {0} - The tab's ID </li>
*     <li> {1} - The tab's reveal flag 0/1 </li>
* </ul>
**/
const INFO_GET_REVEAL_FLAG = 'INFO: Fetching reveal flag for tab %d, flag is %d';

/**
 * Message indicating a tab's data is being set
 * <ul>
 *     <li> {0} - The tab's ID </li>
 *     <li> {1} - The boolean set for the tab 0/1 </li>
 * </ul>
 **/
const INFO_SET_REVEAL_FLAG = 'INFO: Setting reveal flag for tab %d to %d';
/**
 * Message indicating not revealing blocked content
 **/
const INFO_REVEAL_OFF = 'INFO: Not revealing blocked content';

/**
 * Message indicating revealing blocked content
 **/
const INFO_REVEAL_ON = 'INFO: Revealing blocked content';

/**
 * Message indicating a successful request to Hatebase
 **/
const INFO_HATEBASE_SUCCESS = 'INFO: Successful request to Hatebase #%d';

/**
 * Message indicating a word has been whitelisted
 **/
const INFO_WHITELIST_ADD = 'INFO: The word "%s" has been whitelisted';

/**
 * Message indicating a a word has been removed from the whitelist
 **/
const INFO_WHITELIST_DELETE = 'INFO: The word "%s" has been removed from the whitelist';

/* ****************************************************
 *              CONSOLE ERROR MESSAGES
 * ****************************************************/
/**
 * Error message about failed request to Perspective API
 **/
const ERROR_FAILED_PERSPECTIVE_REQ = 'Perspective request failed: %s';

/**
 * Error message about failed request to Hatebase
 **/
const ERROR_FAILED_HATEBASE_REQ = 'Hatebase request failed: %s';

/* ****************************************************
 *                  PLUGIN MESSAGES
 * ****************************************************/
/**
 * Message warning user that plugin does not support the page
 **/
const WARN_UNSUPPORTED_PAGE = 'H8BL*CK currently does not support this site';

/**
 * Message indicating redacted content
 **/
const REDACTED_TEXT = '[Redacted]';

/**
 * Message on Reveal button when reveal is off
 **/
const REVEAL_BLOCKED_WORDS = 'Reveal Blocked Words';

/**
 * Message on Reveal button when reveal is on
 **/
const HIDE_BLOCKED_WORDS = 'Hide Blocked Words';