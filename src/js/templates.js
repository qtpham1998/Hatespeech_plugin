/*******************************************************************************
 *  H8BL*CK - a hatespeech and offensive language remedial plugin
 *  JavaScript file for templates
 *******************************************************************************/

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
const ATTRIBUTE_SELECTOR = (type, attr, value) => `${type}[${attr}~='${value}'`;

/* ****************************************************
 *                   HTML ELEMENTS
 * ****************************************************/
/**
 * Wrapper element for offensive words
 * <ul>
 *     <li> {0} - The categories the offensive word belongs to </li>
 *     <li> {1} - The initial text </li>
 * </ul>
 **/
const REDACTED_ELEMENT = (category, initial) => `<span title='Text contains ${category} content' data-category='${category}' data-initial='${initial}'>${initial}</span>`;

/**
 * Checkbox element for categories
 * <ul>
 *     <li> {0} - The category id </li>
 *     <li> {1} - The category label </li>
 * </ul>
 **/
const CHECKBOX_ELEMENT = (identifier, label) => `<input id='${identifier}' type='checkbox'> ${label}`;

/**
 * List element for categories list
 * <ul>
 *     <li> {0} - List element </li>
 * </ul>
 **/
const LIST_ELEMENT = (element) => `<li>${element}</li>`;
