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
const WORD_PREFIX_REGEX = (sub) => `\\b${sub}(s|(\\w?(ing|er|able|y|ed)))?\\b`;

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
 *     <li> {2} - The attribute value to look for </li>
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


/* ****************************************************
 *                   HTML ELEMENTS
 * ****************************************************/
/**
 * Wrapper element for replaced word
 * <ul>
 *     <li> {0} -The original word </li>
 *     <li> {1} - The replacement word </li>
 * </ul>
 **/
const REPLACED_ELEMENT = (word, replacement) => `<span class='replaced' data-replace='${replacement}' data-initial='${word}'>${replacement}</span>`;

/**
 * Span element categories appearing an a list
 * <ul>
 *     <li> {0} - The category id </li>
 *     <li> {1} - The category label </li>
 * </ul>
 **/
const CATEGORY_ELEMENT = (identifier, label) => `<span id='${identifier}'><i class='boxItem icon square outline'></i>${label}<i class='more icon caret right'></i></span>`;

/**
 * Span element of user added categories appearing an a list
 * <ul>
 *     <li> {0} - The category id </li>
 *     <li> {1} - The category label </li>
 * </ul>
 **/
const CUSTOM_CATEGORY_ELEMENT = (identifier, label) => `<span id='${identifier}'><i class='boxItem icon square outline'></i>${label}</span>`;

/**
 * List element for categories list
 * <ul>
 *     <li> {0} - The category id </li>
 *     <li> {1} - The category label </li>
 * </ul>
 **/
const CATEGORY_LIST_ELEMENT = (identifier, label) => `<li class='categoryItem'>${CATEGORY_ELEMENT(identifier, label)}</li>`;

/**
 * List element for user added categories list
 * <ul>
 *     <li> {0} - The category id </li>
 *     <li> {1} - The category label </li>
 * </ul>
 **/
const CUSTOM_CATEGORY_LIST_ELEMENT = (identifier, label) => `<li class='categoryItem'>${CUSTOM_CATEGORY_ELEMENT(identifier, label)}</li>`;

/**
 * List element for words list
 * <ul>
 *     <li> {0} - The word id </li>
 *     <li> {1} - The word </li>
 * </ul>
 **/
const WORD_LIST_ELEMENT = (identifier, word) => `<li id='${identifier}' class='wordItem'><i class='boxItem icon square outline'></i>${word}</li>`;
/**
 * option element for select categories
 * <select>
 *  <option>{0} - The category name</option>
 *  <option>{1} - The category id</option>
 * </select>
 **/
const OPTION_ELEMENT = (category, value) => `<option id= '${category}-option' category = '${category}' value = '${value}'> ${category} </option>`;

/**
 * table row entry for user added word
 * <table>
 *  <tbody>
 *    <tr>{0} - the added word to be block</tr>
 *    <tr>{1} - choosen category of the word</tr>
 *  </tbpdy>
 * </table>
 **/
const WORD_TABLE_ROW = (word, category) => `<tr id='${word}-row'><td> ${word} </td><td> ${category} </td><td><button class="delete-word" word='${word}'> delete </button></td></tr>`

/**
 * table row entry for user added replacement
 * <table>
 *  <tbody>
 *    <tr>{0} - the added word to be block</tr>
 *    <tr>{1} - replacement for the word</tr>
 *  </tbpdy>
 * </table>
 **/
const REPLACE_TABLE_ROW = (word, replacement) => `<tr id='${word}-replace'><td> ${word} </td><td> ${replacement} </td><td><button class="delete-replacement" word='${word}'> delete </button></td></tr>`

/**
 * button for the user added category, click to delete the category
 **/
const CATEGORY_BUTTON = (category) => `<button class="category-custom-button" category='${category}'>
                                       <span class="align">${category}</span></button>`
