/**
 * Core plugin API user interface text printer create module.
 *
 * @module    dd.core.ui.text.printer.create
 * @author    kidthales <kidthales@agogpixel.com>
 * @copyright 2023 kidthales
 * @license   {@link https://github.com/kidthales/dd-framework/blob/main/LICENSE.txt | MIT License}
 */

/**
 * @returns {import("./types").Printer}
 */
module.exports = function () {
  return new (require('./get-constructor')())();
};
