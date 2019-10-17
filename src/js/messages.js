/*******************************************************************************
 *  H8BL*CK - a hatespeech and offensive language remedial plugin
 *  JavaScript file for messages
 *******************************************************************************/

/**
 * Message indicating list of words have been loaded
 **/
const INFO_LOADED_WORDS = 'INFO: Loaded words into storage.';

/**
 * Message indicating the tab's data is being fetched
 * <ul>
 *     <li> {0} - The tab's ID </li>
 * </ul>
 **/
const INFO_GET_DATA = 'INFO: Fetching data for tab %d';

/**
 * Message indicating a tab's data is being set
 * <ul>
 *     <li> {0} - The tab's ID </li>
 *     <li> {1} - The number of offensive words detected in the tab </li>
 * </ul>
 **/
const INFO_SET_DATA = 'INFO: Setting data for tab %d, with offensive word count of %d';

/**
 * Message indicating that an offensive word was found
 * <ul>
 *     <li> {0} - The text </li>
 * </ul>
 **/
const INFO_FOUND_TEXT = 'INFO: Found offensive word in following \"%s\"';
/**
 * Message warning about offensive content
 **/
const WARN_OFFENSIVE_TEXT = '[Text contains offensive language]';