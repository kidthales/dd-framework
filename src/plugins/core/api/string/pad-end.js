/**
 * Pad end module.
 *
 * @module dd/core/string/pad-end
 */

/**
 * Pad end of string.
 *
 * @param {string} str
 * @param {number} targetLength
 * @param {string|undefined} padString
 * @returns {string}
 */
module.exports = function (str, targetLength, padString) {
  var currentLength = str.length,
    /** @type {number} */
    padLength,
    /** @type {number} */
    diff,
    /** @type {number} */
    multiples,
    /** @type {number} */
    remainder,
    /** @type {number} */
    i,
    postfix = '';

  if (targetLength <= currentLength) {
    return str;
  }

  padString = padString === undefined ? ' ' : padString;
  padLength = padString.length;

  diff = targetLength - currentLength;
  multiples = Math.floor(diff / padLength);
  remainder = diff % padLength;

  for (i = 0; i < multiples; ++i) {
    postfix += padString;
  }

  return str + postfix + padString.slice(0, remainder);
};
