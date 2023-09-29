/**
 * Common locale module.
 *
 * @module    @dd/common/locale
 * @author    kidthales <kidthales@agogpixel.com>
 * @copyright 2023 kidthales
 * @license   {@link https://github.com/kidthales/dd-framework/blob/main/LICENSE.txt | MIT License}
 */

/**
 * Exposes methods necessary for basic locale management.
 */
module.exports = {
  /**
   * @see {@link "@dd/common/locale/get-code" | @dd/common/locale/get-code}
   */
  getCode: require('./get-code'),

  /**
   * @see {@link "@dd/common/locale/set-code" | @dd/common/locale/set-code}
   */
  setCode: require('./set-code'),

  /**
   * @see {@link "@dd/common/locale/get-data" | @dd/common/locale/get-data}
   */
  getData: require('./get-data'),

  /**
   * @see {@link "@dd/common/locale/set-data" | @dd/common/locale/set-data}
   */
  setData: require('./set-data'),

  /**
   * @see {@link "@dd/common/locale/resolve-key" | @dd/common/locale/resolve-key}
   */
  resolveKey: require('./resolve-key')
};
