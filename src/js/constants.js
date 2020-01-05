/*******************************************************************************
 *  H8BL*CK - a hatespeech and offensive language remedial plugin
 *  JavaScript file for constants
 *******************************************************************************/

/**
 * Constant representing empty string
 **/
const EMPTY_STR = '';
/**
 * Constant representing a space
 **/
const SPACE_STR = ' ';
/**
 * Constant representing a dash
 **/
const DASH_STR = '-';
/**
 * Constant representing true string
 **/
const TRUE = 'true';
/**
 * Constant representing false string
 **/
const FALSE = 'false';
/**
 * Constant representing warnedUnsupported tag
 **/
const WARNED_UNSUPPORTED_TAG = 'warnedUnsupported';
/**
* An empty function
**/
const EMPTY_FUNCTION = function () {};

/* ****************************************************
 *                        REGEX
 * ****************************************************/
/**
 * Constant representing acceptable characters regex
 **/
const ACCEPTABLE_REGEX = /.*[a-zA-Z\-']+.*/;
/**
 * Constant representing the flag for a global and case-insensitive reg expression
 **/
const GI_REG_EXP = 'gi';

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
 * Constant representing JSON data type
 **/
const JSON_TYPE = 'json';

/* ****************************************************
 *                      STORAGE
 * ****************************************************/
/**
 * Constant representing the wordBank key
 **/
const WORD_BANK = 'wordBank';
/**
 * Constant representing the power key
 **/
const POWER = 'power';
/**
 * Constant representing the blockedList key
 **/
const BLOCKED_LIST = 'blockedList';
/**
 * Constant representing the blockedLabels key
 **/
const BLOCKED_LABELS = 'blockedLabels';
/**
 * Constant representing the whitelist key
 **/
const WHITELIST = 'whitelist';

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
 * Constant sending command to not reveal blocked content
 **/
const REVEAL_OFF = 'reveal-off';
/**
 * Constant sending command to reveal blocked content
 **/
const REVEAL_ON = 'reveal-on';
/**
 * Constant sending command to update a tab's reveal flag
 **/
const REVEAL_FLAG_UPDATE = 'reveal-flag-update';
/**
 * Constant sending command to get a tab's reveal flag
 **/
const REVEAL_FLAG_GET = 'reveal-flag-get';
/**
 * Constant representing GET request
 **/
const GET_REQUEST = 'GET';
/**
 * Constant representing POST request
 **/
const POST_REQUEST = 'POST';
/**
 * Constant representing PUT request
 **/
const PUT_REQUEST = 'PUT';


/* ****************************************************
 *                  HTML ELEMENTS
 * ****************************************************/
/**
 * Constant representing HTML tags to be inspected
 **/
const INSPECTED_TAGS = 'p,h1,h2,h3,h4,h5,h6,span,a,em,b,i,ul,ol,li,cite';
/**
 * Constant representing HTML tags contained inside another content tag
 **/
const INNER_TAGS = new Set(['EM','I','B']);
/**
 * Constant representing the 'tagName' property
 **/
const TAG_NAME_PROP = 'tagName';
/**
 * Constant representing HTML 'span' tag
 **/
const SPAN_TAG = 'span';
/**
 * Constant representing HTML 'i' tag
 **/
const ICON_TAG = 'i';
/**
 * Constant representing the data initial attribute precedent for negative lookbehind
 **/
const DATA_INITIAL_PRECEDENT = 'data-initial=[\'|"]';

/* ****************** HTML ID *********************** */
/**
 * Constant representing power button id
 **/
const POWER_BUTTON_ID = "#power-button";
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
 * Constant representing reveal blocked button id
 **/
const REVEAL_BLOCKED_ID = '#reveal-blocked-button';
/**
 * Constant representing category list id
 **/
const CATEGORY_LIST_ID = "#category-list";
/**
 * Constant representing words list id
 **/
const WORDS_LIST_ID = "#words-list";
/**
 * Constant representing words popup id
 **/
const WORDS_POPUP_ID = "#words-popup";
/**
 * Constant representing back button id
 **/
const BACK_BUTTON_ID = "#back-button";
/**
 * Constant representing error message id
 **/
const ERROR_MESSAGE_ID = "#error-message";

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
 * Constant representing the tag key
 **/
const TAG_ATTR = 'data-tag';
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
const CHECK_CLASS = 'check';
/**
 * Constant representing HTML 'ban' class
 **/
const BAN_ICON_CLASS = 'ban';
/**
 * Constant representing HTML 'displayNone' class
 **/
const DISPLAY_NONE_CLASS = 'displayNone';
/**
 * Constant representing HTML 'on' class
 **/
const ON_CLASS = 'on';
/**
 * Constant representing HTML 'off' class
 **/
const OFF_CLASS = 'off';
/**
 * Constant representing HTML 'categoryItem' class
 **/
const CATEGORY_ITEM_CLASS = 'categoryItem';
/**
 * Constant representing HTML 'wordItem' class
 **/
const WORD_ITEM_CLASS = 'wordItem';
/**
 * Constant representing HTML 'boxItem' class
 **/
const BOX_ITEM_CLASS = 'boxItem';
/**
 * Constant representing HTML 'more' class
 **/
const CATEGORY_MORE_CLASS = 'more';

/* ****************************************************
 *                      CATEGORIES
 * ****************************************************/
/**
 * Constant representing the profanity category
 **/
const PROFANITY_CATEGORY = 'profanity';
/**
 * Constant representing the disability category
 **/
const DISABLIST_CATEGORY = 'disablist';
/**
 * Constant representing the anti-religion category
 **/
const XENOPHOBIC_CATEGORY = 'xenophobic';
/**
 * Constant representing the sexism category
 **/
const SEXIST_CATEGORY = 'sexist';
/**
 * Constant representing the racism category
 **/
const RACIST_CATEGORY = 'racist';
/**
 * Constant representing the anti-religion category
 **/
const RELIGION_CATEGORY = 'anti-religion';
/**
 * Constant representing the anti-lgbt category
 **/
const LGBT_CATEGORY = 'anti-lgbt';

/* ****************************************************
 *                 PERSPECTIVE API
 * ****************************************************/
/**
 * Constant representing the authentication URL
 **/
const PERSPECTIVE_API_URL = 'https://h8bl-ck.herokuapp.com/analyse';
/**
 * Constant representing the number of API keys for Perspective API
 **/
const NUMBER_OF_API_KEYS = 6;
/**
 * Constant representing analyse command for Perspective API
 **/
const ANALYSE_REQUEST = 'analyse';
/**
 * Constant representing the toxicity score from Perspective API threshold
 **/
const TOXICITY_SCORE_THRESHOLD = 0.6;
/**
 * Constant representing the languages supported by Perspective API, in ISO 639-1 format
 **/
const PERSPECTIVE_SUPPORTED_LANGUAGES = new Set(['en', 'fr', 'es', 'it', 'de', 'pt']);

/* ****************************************************
 *                      HATEBASE
 * ****************************************************/
/**
 * Constant representing the authentication URL
 **/
const AUTHENTICATION_URL = 'https://api.hatebase.org/4-4/authenticate';
/**
 * Constant representing the URL to request vocabulary from Hatebase
 **/
const HB_REQUEST_URL = 'https://api.hatebase.org/4-4/get_vocabulary';
/**
 * Constant representing the 'api_key' form key
 **/
const API_KEY = 'api_key';
/**
 * Constant representing the 'token' form key
 **/
const TOKEN_KEY = 'token';
/**
 * Constant representing the 'page' form key
 **/
const PAGE_KEY = 'page';
/**
 * Constant representing the 'jsonp' data type
 **/
const JSONP_DATA_TYPE = 'jsonp';
/**
 * Constant representing the multipart/form-data MIME type
 **/
const FORM_DATA_MIMETYPE = 'multipart/form-data';
/**
 * Constant representing the 'term' key
 **/
const TERM_KEY = 'term';
/**
 * Constant representing the Hatebase disability category
 **/
const HB_DISABLIST_CATEGORY = 'is_about_disability';
/**
 * Constant representing the Hatebase anti-religion category
 **/
const HB_XENOPHOBIC_CATEGORY = 'is_about_ethnicity';
/**
 * Constant representing the Hatebase sexism category
 **/
const HB_SEXIST_CATEGORY = 'is_about_gender';
/**
 * Constant representing the Hatebase racism category
 **/
const HB_RACIST_CATEGORY = 'is_about_nationality';
/**
 * Constant representing the Hatebase anti-religion category
 **/
const HB_RELIGION_CATEGORY = 'is_about_religion';
/**
 * Constant representing the Hatebase anti-lgbt category
 **/
const HB_LGBT_CATEGORY = 'is_about_sexual_orientation';

/* ****************************************************
 *                      FILE PATHS
 * ****************************************************/
/**
 * Constant representing the path to the smallOffensiveList.csv file
 **/
const WORDS_FILE_PATH = '../csv/smallOffensiveList.csv';
/**
 * Constant representing the path to the categories.csv file
 **/
const CATEGORIES_FILE_PATH = '../csv/categories.csv';
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
