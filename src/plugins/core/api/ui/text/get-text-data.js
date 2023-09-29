/**
 * Core plugin API user interface text get text data module.
 *
 * @module    dd.core.ui.text.getTextData
 * @author    kidthales <kidthales@agogpixel.com>
 * @copyright 2023 kidthales
 * @license   {@link https://github.com/kidthales/dd-framework/blob/main/LICENSE.txt | MIT License}
 */

/**
 * @param {number} textId
 * @returns {import("./types").TextData|undefined}
 */
module.exports = function (textId) {
  var getLocaleCode = require('@dd/common').getLocaleCode,
    getFontData = require('../font/get-font-data'),
    agtkText = Agtk.texts.get(textId),
    /** @type {string} */
    message,
    /** @type {import("./types").FontData|undefined} */
    font;

  if (!agtkText) {
    return;
  }

  message = agtkText.getText(getLocaleCode());

  if (agtkText.fontId >= 0) {
    font = getFontData(agtkText.fontId);
  }

  return {
    textId: textId,
    message: message,
    font: font,
    letterSpacing: agtkText.letterSpacing,
    lineSpacing: agtkText.lineSpacing
  };
};
