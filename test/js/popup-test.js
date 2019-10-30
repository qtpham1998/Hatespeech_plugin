QUnit.module('Test: popup.js');

QUnit.test('FormatNumberTest', function (assert)
{
    let numberInput = formatNumber(5);
    let stringInput = formatNumber('10');

    assert.equal(typeof numberInput, STRING_TYPE, 'Number input returns string.');
    assert.deepEqual(numberInput, '5', 'Number input return correct output.');
    assert.equal(typeof stringInput, STRING_TYPE, 'String input returns string.');
    assert.deepEqual(stringInput, '10', 'String input return correct output.');
});

QUnit.test('UpdateBlockedDataTest', function (assert)
{
    updateBlockedData();
    const $blockedStats = $(BLOCKED_NUM_ID);

    assert.ok($blockedStats.text().includes('13'), 'Stats element contains blocked data.');
    assert.notOk($blockedStats.text().includes(QUESTION_MARK_STR), 'Placeholder was replaced by blocked data.');
    assert.ok($blockedStats.html().includes('<i class="ban icon"></i>'), 'Stats element retains the icon.');
});