/*******************************************************************************
 *  H8BL*CK - a hatespeech and offensive language remedial plugin
 *  JavaScript file for Chromium browser API
 *******************************************************************************/

if (self.browser instanceof Object)
{
    self.chrome = self.browser;
}
else
{
    self.browser = self.chrome;
}