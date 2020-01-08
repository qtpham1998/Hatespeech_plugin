describe('Test: power.js', function () {
    it('SwitchPowerPluginTest', function ()
    {
        const $powerButton = $(POWER_BUTTON_ID);
        const $blockedWords = $(PLUGIN_WRAP_ID);

        switchOffPlugin();
        expect($powerButton).toHaveAttr(SRC_ATTR, GREEN_BUTTON_PATH);
        expect($blockedWords).toHaveClass(DISPLAY_NONE_CLASS);

        switchOnPlugin();
        expect($powerButton).toHaveAttr(SRC_ATTR, RED_BUTTON_PATH);
        expect($blockedWords).not.toHaveClass(DISPLAY_NONE_CLASS);
    });
});