/**
 * Get byte length module.
 *
 * @module dd/core/string/get-byte-length
 */

/**
 * Get the byte length of a UTF-8 string.
 *
 * @param {string} str String to calculate byte length with.
 * @returns {number} String byte length.
 */
module.exports = function (str) {
  var s = str.length,
    /** @type {number} */
    i,
    /** @type {number} */
    code;

  for (i = str.length - 1; i >= 0; i--) {
    code = str.charCodeAt(i);

    if (code > 0x7f && code <= 0x7ff) {
      s++;
    } else if (code > 0x7ff && code <= 0xffff) {
      s += 2;
    }

    if (code >= 0xdc00 && code <= 0xdfff) {
      // Trail surrogate.
      i--;
    }
  }

  return s;
};
