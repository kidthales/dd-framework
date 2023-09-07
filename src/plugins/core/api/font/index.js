/**
 * Font module.
 *
 * @module dd/core/font
 */

/**
 * @private
 */
var _fontConstants = require('./constants');

/**
 *
 */
module.exports = {
  getFontData: require('./get-font-data'),
  type: {
    bitmap: _fontConstants.bitmap,
    ttf: _fontConstants.ttf
  }
};
