/**
 * Common locale set code module.
 *
 * @module    @dd/common/locale/set-code
 * @author    kidthales <kidthales@agogpixel.com>
 * @copyright 2023 kidthales
 * @license   {@link https://github.com/kidthales/dd-framework/blob/main/LICENSE.txt | MIT License}
 */

/**
 * Set locale code.
 *
 * @param {string} code
 * @returns {void}
 */
module.exports = function (code) {
  require('./state').code = code;
};
