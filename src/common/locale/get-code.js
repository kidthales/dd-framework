/**
 * Common locale get code module.
 *
 * @module    @dd/common/locale/get-code
 * @author    kidthales <kidthales@agogpixel.com>
 * @copyright 2023 kidthales
 * @license   {@link https://github.com/kidthales/dd-framework/blob/main/LICENSE.txt | MIT License}
 */

/**
 * Get locale code.
 *
 * @returns {string | undefined}
 */
module.exports = function () {
  return require('./state').code;
};
