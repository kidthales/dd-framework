/**
 * Storage plugin API constants module.
 *
 * @internal
 * @module    @dd/storage/constants
 * @author    kidthales <kidthales@agogpixel.com>
 * @copyright 2023 kidthales
 * @license   {@link https://github.com/kidthales/dd-framework/blob/main/LICENSE.txt | MIT License}
 */

/**
 * @internal
 * @constant
 */
module.exports = {
  /**
   * @type {'save'}
   * @constant
   */
  directoryName: 'save',

  /**
   * @type {'dd-store'}
   * @constant
   */
  fileName: 'dd-store',

  /**
   * @constant
   */
  mode: {
    /**
     * @type {import('./types').StorageMode.Busy}
     * @constant
     */
    busy: 0,

    /**
     * @type {import('./types').StorageMode.Ready}
     * @constant
     */
    ready: 1
  }
};
