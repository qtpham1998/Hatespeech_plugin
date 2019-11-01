describe('Test: tabs.js', function () {
    it('hBlockTest', function ()
    {
        const tabId = 4869;
        const count = 13;

        expect(hBlock.lookUp(tabId)).toBe(0);

        hBlock.setData(tabId, count);

        expect(hBlock.lookUp(tabId)).toBe(count);
    });
});