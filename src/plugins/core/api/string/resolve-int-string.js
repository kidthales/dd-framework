/**
 * @module @dd/core/api/string/resolve-int-string
 */

/**
 * Resolve integer string to its integer value, with default in case string is invalid.
 *
 * @param {string} intStr
 * @param {number} defValue
 * @returns {number}
 */
module.exports = function (
  /** @type {string} */
  intStr,
  /** @type {number} */
  defValue
) {
  var n = parseInt(intStr, 10);
  return isNaN(n) ? defValue : n;
};
