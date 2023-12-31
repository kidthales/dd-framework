/**
 * Core plugin API user interface text printer constants module.
 *
 * @module    dd.core.ui.text.printer.constants
 * @author    kidthales <kidthales@agogpixel.com>
 * @copyright 2023 kidthales
 * @license   {@link https://github.com/kidthales/dd-framework/blob/main/LICENSE.txt | MIT License}
 */

/**
 * @constant
 */
module.exports = {
  /**
   * @constant
   */
  horizontalTextAlignment: {
    /**
     * @type {0}
     * @constant
     */
    left: 0,

    /**
     * @type {1}
     * @constant
     */
    center: 1,

    /**
     * @type {2}
     * @constant
     */
    right: 2
  },

  /**
   * @constant
   */
  verticalTextAlignment: {
    /**
     * @type {0}
     * @constant
     */
    top: 0,

    /**
     * @type {1}
     * @constant
     */
    center: 1,

    /**
     * @type {2}
     * @constant
     */
    bottom: 2
  },

  /**
   * @constant
   */
  eventName: {
    /**
     * @type {'print-start'}
     * @constant
     */
    printStart: 'print-start',

    /**
     * @type {'printing'}
     * @constant
     */
    printing: 'printing',

    /**
     * @type {'print-finish'}
     * @constant
     */
    printFinish: 'print-finish',

    /**
     * @type {'clear-start'}
     * @constant
     */
    clearStart: 'clear-start',

    /**
     * @type {'clearing'}
     * @constant
     */
    clearing: 'clearing',

    /**
     * @type {'clear-finish'}
     * @constant
     */
    clearFinish: 'clear-finish',

    /**
     * @type {'clear-cancel'}
     * @constant
     */
    cancel: 'cancel'
  }
};
