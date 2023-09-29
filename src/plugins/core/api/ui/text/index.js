/**
 * Core plugin API user interface text module.
 *
 * @module    dd.core.ui.text
 * @author    kidthales <kidthales@agogpixel.com>
 * @copyright 2023 kidthales
 * @license   {@link https://github.com/kidthales/dd-framework/blob/main/LICENSE.txt | MIT License}
 */

/**
 * Exposes methods & properties for creating & managing UI text.
 */
module.exports = {
  /**
   * {@linkcode "dd.core.ui.text.createTextSprites" | dd.core.ui.text.createTextSprites}
   */
  createTextSprites: require('./create-text-sprites'),

  /**
   * {@linkcode "dd.core.ui.text.getTextData" | dd.core.ui.text.getTextData}
   */
  getTextData: require('./get-text-data'),

  /**
   * {@linkcode "dd.core.ui.text.printer" | dd.core.ui.text.printer}
   */
  printer: require('./printer')
};
