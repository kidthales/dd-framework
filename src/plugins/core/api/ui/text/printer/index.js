/**
 * Core plugin API user interface text printer module.
 *
 * @module    dd.core.ui.text.printer
 * @author    kidthales <kidthales@agogpixel.com>
 * @copyright 2023 kidthales
 * @license   {@link https://github.com/kidthales/dd-framework/blob/main/LICENSE.txt | MIT License}
 */

/**
 * Exposes methods & properties for printing UI text.
 */
module.exports = {
  /**
   * {@linkcode "dd.core.ui.text.printer.constants" | dd.core.ui.text.printer.constants}
   */
  constants: require('./constants'),

  /**
   * {@linkcode "dd.core.ui.text.printer.create" | dd.core.ui.text.printer.create}
   */
  create: require('./create'),

  /**
   * {@linkcode "dd.core.ui.text.printer.createConstructor" | dd.core.ui.text.printer.createConstructor}
   */
  createConstructor: require('./create-constructor'),

  /**
   * {@linkcode "dd.core.ui.text.printer.getConstructor" | dd.core.ui.text.printer.getConstructor}
   */
  getConstructor: require('./get-constructor')
};
