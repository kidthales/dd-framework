/**
 * Core plugin API string repeat module.
 *
 * @module    dd.core.string.repeat
 * @author    kidthales <kidthales@agogpixel.com>
 * @copyright 2023 kidthales
 * @license   {@link https://github.com/kidthales/dd-framework/blob/main/LICENSE.txt | MIT License}
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
