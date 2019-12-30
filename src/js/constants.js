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
 * Constant representing the 'checked' property
 **/
const CHECKED_PROP = 'checked';

/* **************** HTML CLASSES ******************** */
/**
 * Constant representing HTML 'redacted' class
 **/
const REDACTED_CLASS = 'redacted';
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
