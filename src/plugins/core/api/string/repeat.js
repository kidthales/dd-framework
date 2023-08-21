/**
 * @module @dd/core/api/string/repeat
 */

/**
 * Repeat string a specified number of times.
 *
 * @param {string} str
 * @param {number} count
 * @returns {string}
 */
module.exports = function (
  /** @type {string} */
  str,
  /** @type {number} */
  count
) {
  var s = '',
    /** @type {number} */
    i;

  for (i = 0; i < count; ++i) {
    s += str;
  }

  return s;
};
