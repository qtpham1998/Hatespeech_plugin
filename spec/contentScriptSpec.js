describe('Test: contentScript.js', function () {
   //
   // beforeAll(function () {
   //    $('body').append(mockWebPage);
   // });
   //
   // afterAll(function () {
   //    $(mockWebPage).remove();
   // });

   it('GetDomElementsTest', function ()
   {
      const words = getDomElements();

      expect(words.length).toEqual(8);
      expect(words.includes('')).toBe(false);
   });

   it('HasOffensiveLanguageTest', function ()
   {
      const offensiveLanguage = ['shit', 'fuck', 'arse'];
      const offensiveText = $('p:contains(arse)').text();
      const nonOffensiveText = $('p:contains(The Dark Destroyer)').text();

      expect(hasOffensiveLanguage(' ', offensiveLanguage)).toBe(false);
      expect(hasOffensiveLanguage(offensiveText, offensiveLanguage)).toBe(true);
      expect(hasOffensiveLanguage(nonOffensiveText, offensiveLanguage)).toBe(false);
   });

   it('HideDomElementTest', function ()
   {
      const $offensiveElem = $('p:contains(arse)');
      const content = $offensiveElem.text();
      hideDomELement($offensiveElem);

      expect($offensiveElem).toHaveAttr(INITIAL_DATA_ATTR, content);
      expect($offensiveElem).toHaveText(WARN_OFFENSIVE_TEXT);
      expect($offensiveElem).toHaveClass(OFFENSIVE_WARNING);
      showDomELement($offensiveElem);
   });

   it('RevertElementsTest', function ()
   {
      const $offensiveElem = $('p:contains(arse)');
      const content = $offensiveElem.text();
      hideDomELement($offensiveElem);
      revertElements();

      expect($offensiveElem).toHaveText(content);
      expect($offensiveElem).not.toHaveAttr(INITIAL_DATA_ATTR);
      expect($offensiveElem).not.toHaveClass(OFFENSIVE_WARNING);
   });
});