QUnit.module('Test: revert.js');

QUnit.test('SwitchPowerPluginTest', function (assert)
{
    $powerButton = $(POWER_BUTTON_ID);
    $blockedWords = $(BLOCKED_WORDS_ID);
    assert.ok($powerButton.attr(SRC_ATTR).includes(RED_BUTTON_PATH), 'Default icon is red button.');

    switchOffPlugin();
    assert.ok($powerButton.attr(SRC_ATTR).includes(GREEN_BUTTON_PATH), 'Off plugin shows green button.');
    assert.ok($blockedWords.hasClass(DISPLAY_NONE), 'Off plugin does not show stats.');

    switchOnPlugin();
    assert.ok($powerButton.attr(SRC_ATTR).includes(RED_BUTTON_PATH), 'On plugin shows red button.');
    assert.notOk($blockedWords.hasClass(DISPLAY_NONE), 'On plugin shows stats.');
});