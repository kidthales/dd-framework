/**
 * Common locale get data module.
 *
 * @module    @dd/common/locale/get-data
 * @author    kidthales <kidthales@agogpixel.com>
 * @copyright 2023 kidthales
 * @license   {@link https://github.com/kidthales/dd-framework/blob/main/LICENSE.txt | MIT License}
 */

/**
 * Get locale data.
 *
 * @returns {import('./types').LocalizedStringByLocaleCodeByLocaleKey | undefined}
 */
module.exports = function () {
  return require('./state').data;
};
