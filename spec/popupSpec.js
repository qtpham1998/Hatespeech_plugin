describe('Test: popup.js', function () {
    it('FormatNumberTest', function ()
    {
        const numberInput = formatNumber(5);
        const stringInput = formatNumber('10');

        expect(typeof numberInput).toEqual(STRING_TYPE);
        expect(numberInput).toEqual('5');
        expect(typeof stringInput).toEqual(STRING_TYPE);
        expect(stringInput).toEqual('10');
    });

    it('UpdateBlockedDataTest', function ()
    {
        updateBlockedData();
        const $blockedStats = $(BLOCKED_NUM_ID);

        expect($blockedStats).toHaveText('13');
        expect($blockedStats).not.toHaveText(QUESTION_MARK_STR);
        expect($blockedStats).toContainHtml('<i class="ban icon"></i>');
    });
});