/**
 * Storage plugin API state module.
 *
 * @internal
 * @module    @dd/storage/state
 * @author    kidthales <kidthales@agogpixel.com>
 * @copyright 2023 kidthales
 * @license   {@link https://github.com/kidthales/dd-framework/blob/main/LICENSE.txt | MIT License}
 */

/**
 * @internal
 */
module.exports = {
  /**
   * @type {number|undefined}
   */
  mode: undefined,

  /**
   * @type {Record<string, number|boolean>|undefined}
   */
  data: undefined,

  /**
   * @type {boolean}
   */
  saveRequested: false,

  /**
   * @type {boolean}
   */
  error: false
};
