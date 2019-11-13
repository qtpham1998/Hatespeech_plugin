describe('Test: background.js', function () {
    it('ParseCSVFileTest', function ()
    {
        const data = 'category,word\none,comma\ntwo,separated\nthree,file';
        const parsedData = parseCsvFile(data);

        expect(parsedData.length).toBe(3);
        expect(parsedData).toContain('separated');
        expect(parsedData).not.toContain('word');
    });
});
