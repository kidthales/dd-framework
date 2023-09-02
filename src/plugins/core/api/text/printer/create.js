/**
 * @module dd/core/text/printer/create
 */

/**
 *
 * @returns {import("./types").Printer}
 */
module.exports = function () {
  return new (require('./get-constructor')())();
};
