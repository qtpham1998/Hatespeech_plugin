/*******************************************************************************
 *  H8BL*CK - a hatespeech and offensive language remedial plugin
 *  JavaScript file for templates
 *******************************************************************************/

/**
 * Wrapper element for offensive content
 * <ul>
 *     <li> {0} - The category the offensive word belongs to </li>
 *     <li> {1} - The toxicity score </li>
 * </ul>
 **/
const REDACTED_TITLE = (category, score) => `Text contains ${category}${category === PROFANITY_CATEGORY ? "." : " content."} Toxicity score is ${score < 0 ? 0.5 : score.toPrecision(3)}`;

/* ****************************************************
 *                        REGEX
 * ****************************************************/
/**
 * Regex for expressions with prefix 'sub', and specified suffixes
 * <ul>
 *     <li> {0} - The word substring to look for </li>
 * </ul>
 **/
const WORD_PREFIX_REGEX = (sub) => `\\b${sub}(s|ing|er|able|y|ed)?\\b`;

/**
 * Regex for exact word match
 * <ul>
 *     <li> {0} - The word to look for </li>
 * </ul>
 **/
// const EXACT_WORD_REGEX = (word) => `\\b${word}\\b`;

/**
 * Regex for expressions not preceded by 'pre'
 * <ul>
 *     <li> {0} - The expression to look for </li>
 *     <li> {1} - The precedent expression to avoid </li>
 * </ul>
 **/
const NEGATIVE_LOOKBEHIND_REGEX = (expr, pre) => `(?<!${pre})${expr}`;

/* ****************************************************
 *                   CSS SELECTION
 * ****************************************************/
/**
 * JQuery selector with specific class
 * <ul>
 *     <li> {0} - The relevant class </li>
 * </ul>
 **/
const CLASS_SELECTOR = (htmlClass) => `.${htmlClass}`;

/**
 * JQuery selector with specific class
 * <ul>
 *     <li> {0} - The relevant id </li>
 * </ul>
 **/
const IDENTIFIER_SELECTOR = (identifier) => `#${identifier}`;

/**
 * JQuery selector for span element with a specific attribute-value
 * <ul>
 *     <li> {0} - The type of element </li>
 *     <li> {1} - The relevant attribute </li>
 *     <li> {2} - The attribute value to look for. Can be empty </li>
 * </ul>
 **/
const ATTRIBUTE_SELECTOR = (type, attr, value) => `${type}[${attr}` + (value === EMPTY_STR ? `]` : `~='${value}'`);

/* ****************************************************
 *                   HTML ELEMENTS
 * ****************************************************/
/**
 * Wrapper element for offensive content
 * <ul>
 *     <li> {0} - The category the offensive word belongs to </li>
 *     <li> {1} - The initial text </li>
 * </ul>
 **/
const REDACTED_ELEMENT = (category, initial, title, origin) => `<span title='${title}' data-category='${category}' data-origin='${origin}' data-initial='${initial}'>${initial}</span>`;

/**
 * Wrapper element for replaced word
 * <ul>
 *     <li> {0} -The origin word </li>
 *     <li> {1} - The replacement word </li>
 *     <li> {2} - The initial word </li>
 * </ul>
 **/
const REPLACED_ELEMENT = (word, replacement, initial) => `<span class='replaced' data-origin='${word}' data-replacement='${replacement}' data-initial='${initial}'>${replacement}</span>`;

/* ****************************************************
 *            HTML ELEMENTS IN POPUP
 * ****************************************************/
/**
 * Span element categories appearing an a list
 * <ul>
 *     <li> {0} - The category id </li>
 *     <li> {1} - The category label </li>
 * </ul>
 **/
const CATEGORY_ELEMENT = (identifier, label) => `<span id='${identifier}'><i class='boxItem icon square outline'></i>${label}<i class='more icon caret right'></i></span>`;

/**
 * List element for categories list
 * <ul>
 *     <li> {0} - The category id </li>
 *     <li> {1} - The category label </li>
 * </ul>
 **/
const CATEGORY_LIST_ELEMENT = (identifier, label) => `<li class='categoryItem'>${CATEGORY_ELEMENT(identifier, label)}</li>`;

/**
 * List element for words list
 * <ul>
 *     <li> {0} - The word id </li>
 *     <li> {1} - The word </li>
 *     <li> {2} - The category it belongs to </li>
 * </ul>
 **/
const WORD_LIST_ELEMENT = (identifier, word, category) => `<li id='${identifier}' data-category='${category}' class='wordItem'><i class='boxItem icon square outline'></i>${word}</li>`;

/**
 * Option element for selecting categories in customise
 * <ul>
 *     <li> {0} - The category name </li>
 *     <li> {1} - The category id </li>
 * </ul>
 **/
const SELECT_CATEGORY_OPTION = (category, label) => `<option id='${category}'>${label}</option>`;

/**
 * Table row entry for custom word
 * <ul>
 *     <li> {0} - The custom word </li>
 *     <li> {1} - The category it belongs to </li>
 * </ul>
 **/
const CUSTOM_WORD_TABLE_ROW = (word, category) => `<tr id='${word}' data-category='${category}'><td>${word}</td><td>${category}</td><td><button class='deleteCustom'><i class='icon trash alternate outline'></i></button></td></tr>`;

/**
 * Table row entry for custom category
 * <ul>
 *     <li> {0} - The custom category </li>
 *     <li> {1} - The custom category label </li>
 * </ul>
 **/
const CUSTOM_CATEGORY_TABLE_ROW = (category, label) => `<tr id='${category}'><td>${label}</td><td><button class='deleteCustom'><i class='icon trash alternate outline'></i></button></td></tr>`;

/**
 * Table row entry for custom category
 * <ul>
 *     <li> {0} - The word </li>
 *     <li> {1} - The word's replacement </li>
 * </ul>
 **/
const REPLACE_TABLE_ROW = (word, replacement) => `<tr id='${word}'><td>${word}</td><td>${replacement}</td><td><button class="deleteCustom"><i class='icon trash alternate outline'></i></button></td></tr>`;
