/*******************************************************************************
 *  H8BL*CK - a hatespeech and offensive language remedial plugin
 *  JavaScript file for constants
 *******************************************************************************/

/**
 * Constant representing the max number of elements to inspect
 **/
const MAX_ELEMENTS = 5000;
/**
 * Constant representing a space
 **/
const SPACE_STR = ' ';
/**
 * Constant representing true string
 **/
const TRUE = 'true';
/**
 * Constant representing false string
 **/
const FALSE = 'false';
/**
 * Constant representing Twitter host name
 **/
const TWITTER = 'twitter.com';
/**
 * Constant representing Facebook host name
 **/
const FACEBOOK = 'facebook.com';
/**
 * Constant representing warnedUnsupported tag
 **/
const WARNED_UNSUPPORTED_TAG = 'warnedUnsupported';
/**
 * Constant representing alphabet regex
 **/
const ALPHA_REGEX = /.*[a-zA-Z]+.*/;
/**
 * Constant representing the flag for a global and case-insensitive reg expression
 **/
const GI_REG_EXP = 'gi';
/**
* An empty function
**/
const EMPTY_FUNCTION = function () {};

/* ****************************************************
 *                       TYPES
 * ****************************************************/
/**
 * Constant representing string type
 **/
const STRING_TYPE = 'string';
/**
 * Constant representing text data type
 **/
const TEXT_TYPE = 'text';
/**
 * Constant representing selected option
 **/
const SELECTED = ':selected';
/**
 * Constant representing default category
 **/
const DEFAULT_CATEGORY = 'default';
/**
 * Constant representing default label
 **/
const DEFAULT_LABEL = 'Default';

/* ****************************************************
 *                      COMMANDS
 * ****************************************************/
/**
 * Constant sending command to switch off plugin
 **/
const SWITCH_OFF = 'switch-off';
/**
 * Constant sending command to switch on plugin
 **/
const SWITCH_ON = 'switch-on';
/**
 * Constant sending command to add a category
 **/
const ADD_CATEGORY = 'add-category';
/**
 * Constant sending command to remove a category
 **/
const REMOVE_CATEGORY = 'remove-category';
/**
 * Constant sending command to add a new word to block with category of choice
 **/
const ADD_WORD = 'add-word';
/**
 * Constant sending command to remove blocking of a word
 **/
const DELETE_WORD = 'delete-word';
/**
 * Constant sending command to add a replcement for a word
 **/
const ADD_REPLACEMENT = 'add-replacement';
/**
 * Constant sending command to delete a replacement
 **/
const DELETE_REPLACEMENT = 'delete-replacement';
/**
 * Constant sending command to update tab data after selecting a category
 **/
const ADD_CATEGORY_UPDATE = 'add-category-update';
/**
 * Constant sending command to update tab data after un-selecting a category
 **/
const REMOVE_CATEGORY_UPDATE = 'remove-category-update';
/**
 * Constant representing GET
 **/
const GET_REQUEST = 'GET';
/**
 * Constant representing POST
 **/
const POST_REQUEST = 'POST';

/* ****************************************************
 *                  HTML ELEMENTS
 * ****************************************************/
/**
 * Constant representing HTML tags to be inspected
 **/
const INSPECTED_TAGS = 'p,h1,h2,h3,h4,h5,h6,span,a,em,b,i,ul,ol,li';
/**
 * Constant representing HTML 'span' tag
 **/
const SPAN_TAG = 'span';
/**
 * Constant representing HTML 'option' tag
 **/
const OPTION_TAG = 'option';
/**
 * Constant representing HTML 'input' tag
 **/
const INPUT_TAG = 'input';
/**
 * Constant representing the type value 'checkbox' for input tag
 **/
const CHECKBOX_INPUT_TYPE = 'checkbox';

/* ****************** HTML ID *********************** */
/**
 * Constant representing power button id
 **/
const POWER_BUTTON_ID = "#power-button";
/**
 * Constant representing button id
 **/
const BUTTON_ID = "#button";
/**
 * Constant representing blocked wrap id
 **/
const BLOCKED_WRAP_ID = "#blocked-wrap";
/**
 * Constant representing blocked data id
 **/
const BLOCKED_DATA_ID = '#blocked-data';
/**
 * Constant representing blocked icon id
 **/
const BLOCKED_ICON_ID = "#blocked-icon";
/**
 * Constant representing blocked num id
 **/
const BLOCKED_NUM_ID = "#blocked-num";
/**
 * Constant representing category list id
 **/
const CATEGORY_LIST_ID = "#category-list";
/**
 * Constant representing button id for submiting replacement
 **/
const REPLACE_SUBMIT_BUTTON = "#replace-submit";
/**
 * Constant representing button id for submiting words to be blocked
 **/
const SUBMIT_BLOCK_BUTTON = "#custom-block-submit";
/**
 * Constant representing button id for customising word
 **/
const CUSTOMISE_BUTTON = '#custom-block-button';
/**
 * Constant representing warning id when replacing word
 **/
const REPLACE_WARNING = "#replace-warning";
/**
 * Constant representing warning id when adding words to be blocked
 **/
const CUSTOM_WARNING = "#custom-warning";
/**
 * Constant representing textbox id for word to be block
 **/
const WORD_TO_BLOCK = "#custom-block-input";
/**
 * Constant representing textbox id for category of word to be block
 **/
const BLOCK_WORD_CATEGORY = "#custom-block-category";
/**
 * Constant representing textbox id for word to be replace
 **/
const WORD_TO_REPLACE = "#before-replace";
/**
 * Constant representing textbox id for replacement
 **/
const WORD_REPLACEMENT = "#after-replace";
/**
 * Constant representing id category dropdown list
 **/
const CATEGORY_LIST = "#custom-word-list";
/**
 * Constant representing id for added words button
 **/
const ADDED_WORDS_BUTTON = "#new-words";
/**
 * Constant representing id for added categories button
 **/
const ADDED_CATEGORIES_BUTTON = "#new-category";
/**
 * Constant representing id for added categories
 **/
const ADDED_CATEGORIES = "#new-category-buttons";
/**
 * Constant representing id for replaced words button
 **/
const REPLACED_WORDS_BUTTON = "#replaced-words-button";
/**
 * Constant representing id for tbody of added words
 **/
const ADDED_WORDS_TABLE = "#custom-words-table tbody";
/**
 * Constant representing id for tbody of replaced words
 **/
const REPLACED_WORDS_TABLE = "#replaced-words-table tbody";

/* ************** HTML ATTRIBUTES ******************* */
/**
 * Constant representing the data attribute key for hiding
 **/
const INITIAL_DATA_ATTR = 'data-initial';
/**
 * Constant representing the data attribute key for offensive category
 **/
const CATEGORY_ATTR = 'data-category';
/**
 * Constant representing the data attribute key for word replacement
 **/
const REPLACE_ATTR = 'data-replace';
/**
 * Constant representing the value key for selected category
 **/
const VALUE_ATTR = 'value';
/**
 * Constant representing category attribute for options
 **/
const OPTION_CATEGORY_ATTR = 'category';
/**
 * Constant representing the 'src' attribute
 **/
const SRC_ATTR = 'src';
/**
 * Constant representing the 'id' attribute
 **/
const ID_ATTR = 'id';
/**
 * Constant representing the 'type' attribute
 **/
const TYPE_ATTR = 'type';
/**
 * Constant representing the 'word' attribute
 **/
const WORD_ATTR = 'word';
/**
 * Constant representing the 'selected' attribute
 **/
const SELECTED_ATTR = 'selected';
/**
 * Constant representing the 'checked' property
 **/
const CHECKED_PROP = 'checked';

/* **************** HTML CLASSES ******************** */
/**
 * Constant representing HTML 'redacted' class
 **/
const REDACTED_CLASS = 'redacted';
/**
 * Constant representing HTML 'replaced' class
 **/
const REPLACED_CLASS = 'replaced';
/**
 * Constant representing HTML 'clear' class
 **/
const CLEAR_CLASS = 'clear';
/**
 * Constant representing HTML 'check' class
 **/
const CHECK_ICON_CLASS = 'check';
/**
 * Constant representing HTML 'ban' class
 **/
const BAN_ICON_CLASS = 'ban';
/**
 * Constant representing HTML 'displayNone' class
 **/
const DISPLAY_NONE_CLASS = 'displayNone';
/**
 * Constant representing HTML 'delete-word' class
 **/
const DELETE_WORD_CLASS = '.delete-word';
/**
 * Constant representing HTML 'delete-replacement' class
 **/
const DELETE_REPLACEMENT_CLASS = '.delete-replacement';
/**
 * Constant representing HTML 'category-custom-button' class
 **/
const CATEGORY_BUTTON_CLASS = '.category-custom-button';

/* ****************************************************
 *                      FILE PATHS
 * ****************************************************/
/**
 * Constant representing the path to the smallOffensiveList.csv file
 **/
const WORDS_FILE_PATH = '../words/smallOffensiveList.csv';
/**
 * Constant representing the path to the categories.csv file
 **/
const CATEGORIES_FILE_PATH = '../words/categories.csv';
/**
 * Constant representing the path to the red power button
 **/
const RED_BUTTON_PATH = '/img/red_button.png';
/**
 * Constant representing the path to the green power button
 **/
const GREEN_BUTTON_PATH = '/img/green_button.png';
/**
 * Constant representing the path to the blue icon image
 **/
const BLUE_ICON_PATH = '/img/plugin_blue_icon.png';
/**
 * Constant representing the path to the red icon image
 **/
const RED_ICON_PATH = '/img/plugin_darkred_icon.png';
/**
 * Constant representing the path to the grey icon image
 **/
const GREY_ICON_PATH = '/img/plugin_grey_icon.png';
