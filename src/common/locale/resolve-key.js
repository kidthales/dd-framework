/**
 * Common locale resolve key module.
 *
 * @module    @dd/common/locale/resolve-key
 * @author    kidthales <kidthales@agogpixel.com>
 * @copyright 2023 kidthales
 * @license   {@link https://github.com/kidthales/dd-framework/blob/main/LICENSE.txt | MIT License}
 */

/**
 * Resolve specified locale key to localized value.
 *
 * @param {string} key
 * @returns {string}
 */
module.exports = function (key) {
  var state = require('./state');
  var entry = state.data[key];

  if (!entry) {
    return key;
  }

  var value = entry[state.code];

  if (typeof value === 'string') {
    return value;
  }

  value = entry[state.code.substring(0, 2)];

  if (typeof value === 'string') {
    return value;
  }

  return key;
};
