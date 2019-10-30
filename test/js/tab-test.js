QUnit.module('Test: tabs.js');

QUnit.test('hBlockTest', function (assert)
{
    const tabId = 4869;
    const count = 13;

    assert.equal(hBlock.lookUp(tabId), 0, 'Default count is 0');

    hBlock.setData(tabId, count);

    assert.equal(hBlock.lookUp(tabId), count, 'Set tab data.');
});