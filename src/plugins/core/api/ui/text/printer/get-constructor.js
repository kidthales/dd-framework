/**
 * Get constructor module.
 *
 * @module dd/core/ui/text/printer/get-constructor
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
