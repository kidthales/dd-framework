/**
 * Common locale set data module.
 *
 * @module    @dd/common/locale/set-data
 * @author    kidthales <kidthales@agogpixel.com>
 * @copyright 2023 kidthales
 * @license   {@link https://github.com/kidthales/dd-framework/blob/main/LICENSE.txt | MIT License}
 */

/**
 * Set locale data.
 *
 * @param {import('./types').LocalizedStringByLocaleCodeByLocaleKey} data
 * @returns {void}
 */
module.exports = function (data) {
  require('./state').data = data;
};
