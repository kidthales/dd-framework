/**
 * Common plugin dependencies is missing dependencies module.
 *
 * @module    @dd/common/plugin/deps/is-missing-dependencies
 * @author    kidthales <kidthales@agogpixel.com>
 * @copyright 2023 kidthales
 * @license   {@link https://github.com/kidthales/dd-framework/blob/main/LICENSE.txt | MIT License}
 */

/**
 * Test if any plugin dependencies are missing.
 *
 * @returns {boolean}
 */
module.exports = function () {
  var missing = require('./state').missing;

  if (!missing) {
    return false;
  }

  return !!missing.length;
};
