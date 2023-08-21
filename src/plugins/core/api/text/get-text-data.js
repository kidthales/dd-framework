/**
 * @module @dd/core/api/text/get-text-data
 */

/**
 *
 * @param {number} textId
 * @returns {import("./types").TextData|undefined}
 */
module.exports = function (
  /** @type {number} */
  textId
) {
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
    message: message,
    font: font,
    letterSpacing: agtkText.letterSpacing,
    lineSpacing: agtkText.lineSpacing
  };
};
