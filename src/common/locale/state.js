/**
 * Common locale state module.
 *
 * @internal
 * @module    @dd/common/locale/state
 * @author    kidthales <kidthales@agogpixel.com>
 * @copyright 2023 kidthales
 * @license   {@link https://github.com/kidthales/dd-framework/blob/main/LICENSE.txt | MIT License}
 */

/**
 * Exposes basic locale management state.
 *
 * @internal
 */
module.exports = {
  /**
   * @type {string | undefined}
   */
  code: undefined,

  /**
   * @type {import('./types').LocalizedStringByLocaleCodeByLocaleKey | undefined}
   */
  data: undefined
};
