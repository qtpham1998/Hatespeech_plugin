QUnit.module('Test: background.js');

QUnit.test('ParseCSVFileTest', function (assert)
{
    let data = 'category,word\none,comma\ntwo,separated\nthree,file';
    let parsedData = parseCsvFile(data);

    assert.equal(parsedData.length, 3, 'Parsed data has correct number of elements.');
    assert.ok(parsedData.includes('separated'), 'Parsed data contains file data.');
    assert.notOk(parsedData.includes('word'), 'First line is skipped.')
});