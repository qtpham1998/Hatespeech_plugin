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

const REPLACED_ELEMENT = (word, replacement) => `<span class='replaced' data-replace='${replacement}' data-initial='${word}'>${word}</span>`;

/**
 * Checkbox element for categories
 * <ul>
 *     <li> {0} - The category id </li>
 *     <li> {1} - The category label </li>
 * </ul>
 **/
const CHECKBOX_ELEMENT = (identifier, label) => `<input id='${identifier}' type='checkbox'> ${label}`;

/**
 * option element for select categories
 * <select>
 *  <option>{0} - The category name</option>
 *  <option>{1} - The category id</option>
 * </select>
 **/
const OPTION_ELEMENT = (category, value) => `<option category = '${category}' value = '${value}'> ${category} </option>`;

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

/**
 * List element for categories list
 * <ul>
 *     <li> {0} - List element </li>
 * </ul>
 **/
const LIST_ELEMENT = (element) => `<li>${element}</li>`;
