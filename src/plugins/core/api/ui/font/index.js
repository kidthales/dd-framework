/**
 * Core plugin API user interface font module.
 *
 * @module    dd.core.ui.font
 * @author    kidthales <kidthales@agogpixel.com>
 * @copyright 2023 kidthales
 * @license   {@link https://github.com/kidthales/dd-framework/blob/main/LICENSE.txt | MIT License}
 */

/**
 * @private
 */
var _fontConstants = require('./constants');

/**
 * Exposes methods & properties for managing fonts.
 */
module.exports = {
  /**
   * {@linkcode "dd.core.ui.font.getFontData" | dd.core.ui.font.getFontData}
   */
  getFontData: require('./get-font-data'),

  /**
   * @see {@link "@dd/core/ui/font/constants" | @dd/core/ui/font/constants}
   */
  type: {
    bitmap: _fontConstants.bitmap,
    ttf: _fontConstants.ttf
  }
};
