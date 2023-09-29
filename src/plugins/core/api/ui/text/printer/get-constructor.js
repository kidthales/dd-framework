/**
 * Core plugin API user interface text printer get constructor module.
 *
 * @module    dd.core.ui.text.printer.getConstructor
 * @author    kidthales <kidthales@agogpixel.com>
 * @copyright 2023 kidthales
 * @license   {@link https://github.com/kidthales/dd-framework/blob/main/LICENSE.txt | MIT License}
 */

/**
 * @type {import("./types").PrinterConstructor|undefined}
 * @private
 */
var _Printer;

/**
 * @returns {import("./types").PrinterConstructor}
 */
module.exports = function () {
  return _Printer || (_Printer = require('./create-constructor')());
};
