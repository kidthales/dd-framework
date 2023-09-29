/**
 * Message plugin API print messages constants module.
 *
 * @module    dd.message.printMessages.constants
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
  horizontalPosition: {
    /**
     * @type {import('./types').HorizontalPosition.Left}
     * @constant
     */
    left: 0,

    /**
     * @type {import('./types').HorizontalPosition.Center}
     * @constant
     */
    center: 1,

    /**
     * @type {import('./types').HorizontalPosition.Right}
     * @constant
     */
    right: 2
  },

  /**
   * @constant
   */
  verticalPosition: {
    /**
     * @type {import('./types').VerticalPosition.Top}
     * @constant
     */
    top: 0,

    /**
     * @type {import('./types').VerticalPosition.Center}
     * @constant
     */
    center: 1,

    /**
     * @type {import('./types').VerticalPosition.Bottom}
     * @constant
     */
    bottom: 2
  }
};
