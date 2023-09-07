/**
 * Repeat module.
 *
 * @module dd/core/string/repeat
 */

/**
 * Repeat string a specified number of times.
 *
 * @param {string} str
 * @param {number} count
 * @returns {string}
 */
module.exports = function (str, count) {
  var s = '',
    /** @type {number} */
    i;

  for (i = 0; i < count; ++i) {
    s += str;
  }

  return s;
};
