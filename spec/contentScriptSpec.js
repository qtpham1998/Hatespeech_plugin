describe('Test: contentScript.js', function () {
    const offensiveWords = new Map();
    offensiveWords.set('arse', 'profanity');

    it('HasOffensiveLanguageTest', function () {
        const offensiveLanguage = {shit: 'profanity', fuck: 'profanity', arse: 'profanity'};
        const offensiveText = `The question immediately put Walsh on his arse and the show ground to halt for several 
        minutes as he tried to compose himself, footage the producers decided against cutting because they, like 
        everyone on set that day found it fucking hilarious. As expected, the moment was a hit with viewers and clips 
        of Walsh losing his shit immediately went viral. A fact that wasn\'t lost on producers or the question setters 
        for the show that decided to capitalise on the influx of new viewers tuning in to see Walsh laughing his hole 
        off.`;
        const nonOffensiveText = `If you're not familiar with The Chase it's in the simplest sense a quiz show where a
        team composed of members of the public will answer questions in an attempt to win some money. The twist
        (because there’s always a twist with these shows) is that contestants are “chased” by a seasoned quiz
        champion and general knowledge buff who will attempt to answer more questions than they do. Part of the
        show’s draw is that all of these Chasers as they’re known are given flamboyant, over the top personalities
        and nicknames like The Beast or The Dark Destroyer.`;

        expect(hasOffensiveLanguage(' ', offensiveLanguage).size).toBe(0);
        expect(hasOffensiveLanguage(offensiveText, offensiveLanguage).size).toBe(2);
        expect(hasOffensiveLanguage(nonOffensiveText, offensiveLanguage).size).toBe(0);
    });

    it('HideRevealDomElementTest', function () {
        const offensiveWords = new Map();
        offensiveWords.set('arse', 'profanity');
        const $offensiveElem = $('p:contains(arse)');
        const content = $offensiveElem.text();

        flagOffensiveWords($offensiveElem, offensiveWords);
        const $redacted = $('span[data-category~="profanity"]');

        hideDomElement($redacted);
        expect($offensiveElem).toContainText('[Redacted]');

        revealDomElement($redacted);
        expect($offensiveElem).toHaveText(content);
        expect($offensiveElem).not.toContainText('[Redacted]');
    });
});