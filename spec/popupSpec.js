describe('Test: popup.js', function () {
    it('FormatToStringTest', function ()
    {
        const numberInput = formatToString(5);
        const stringInput = formatToString('10');

        expect(typeof numberInput).toEqual(STRING_TYPE);
        expect(numberInput).toEqual('5');
        expect(typeof stringInput).toEqual(STRING_TYPE);
        expect(stringInput).toEqual('10');
    });

    it('UpdateBlockedDataTest', function ()
    {
        updateBlockedData();
        const $blockedStats = $(BLOCKED_DATA_ID);

        expect($blockedStats).toHaveText('13');
        expect($blockedStats).toContainHtml('<i id="blocked-icon" class="icon ban"></i>');
    });
});