QUnit.module('Test: contentScript.js');

QUnit.test('GetDomElementsTest', function (assert)
{
   let words = getDomElements();

   // QUnit sometimes adds elements to the page
   assert.ok(words.length === 15 || words.length === 25, 'Queried elements count.');
   assert.ok(words.includes(''), 'No empty string fetched.');
});

QUnit.test('HasOffensiveLanguageTest', function (assert)
{
   const offensiveLanguage = ['shit', 'fuck', 'arse'];
   const offensiveText = $('p:contains(arse)').text();
   const nonOffensiveText = $('p:contains(The Dark Destroyer)').text();

   assert.notOk(hasOffensiveLanguage(' ', offensiveLanguage), 'Empty string.');
   assert.ok(hasOffensiveLanguage(offensiveText, offensiveLanguage), 'Text with offensive language.');
   assert.notOk(hasOffensiveLanguage(nonOffensiveText, offensiveLanguage), 'Text with no offensive language.');
});

QUnit.test('HideDomElementTest', function (assert)
{
   $offensiveElem = $('p:contains(arse)');
   const content = $offensiveElem.text();
   hideDomELement($offensiveElem);

   assert.ok($offensiveElem[0].hasAttribute(INITIAL_DATA_ATTR), 'Has data-initial attribute.');
   assert.deepEqual($offensiveElem.attr(INITIAL_DATA_ATTR), content, 'Initial content is saved.');
   assert.deepEqual($offensiveElem.text(), WARN_OFFENSIVE_TEXT, 'Element replaced with warning.');
   assert.ok($offensiveElem.hasClass(OFFENSIVE_WARNING), 'OffensiveWarning class added.')
});

QUnit.test('RevertElementsTest', function (assert)
{
   $offensiveElem = $('p:contains(arse)');
   const content = $offensiveElem.text();
   hideDomELement($offensiveElem);
   revertElements();

   assert.deepEqual($offensiveElem.text(), content, 'Element regains content.');
   assert.notOk($offensiveElem[0].hasAttribute(INITIAL_DATA_ATTR), 'Data-initial attribute was removed.');
   assert.notOk($offensiveElem.hasClass(OFFENSIVE_WARNING), 'OffensiveWarning class was removed.')
});