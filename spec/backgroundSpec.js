describe('Test: background.js', function () {
    it('ParseCSVFileTest', function ()
    {
        const data = 'category,word\none,comma\ntwo,separated\nthree,file';
        const parsedDataKeys = Object.values(parseCsvData(data));

        expect(parsedDataKeys.length).toBe(3);
        expect(parsedDataKeys).toContain('separated');
        expect(parsedDataKeys).not.toContain('word');
    });
});
