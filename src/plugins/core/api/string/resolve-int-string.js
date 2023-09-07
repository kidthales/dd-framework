/**
 * Resolve integer string module.
 *
 * @module dd/core/string/resolve-int-string
 */

/**
 * Resolve integer string to its integer value, with default in case string is invalid.
 *
 * @param {string} intStr
 * @param {number} defValue
 * @returns {number}
 */
module.exports = function (intStr, defValue) {
  var n = parseInt(intStr, 10);
  return isNaN(n) ? defValue : n;
};
