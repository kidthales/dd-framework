/**
 * Core plugin API string resolve integer string module.
 *
 * @module    dd.core.string.resolveIntString
 * @author    kidthales <kidthales@agogpixel.com>
 * @copyright 2023 kidthales
 * @license   {@link https://github.com/kidthales/dd-framework/blob/main/LICENSE.txt | MIT License}
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
