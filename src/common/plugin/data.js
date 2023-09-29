/**
 * Common plugin data module.
 *
 * @module    @dd/common/plugin/data
 * @author    kidthales <kidthales@agogpixel.com>
 * @copyright 2023 kidthales
 * @license   {@link https://github.com/kidthales/dd-framework/blob/main/LICENSE.txt | MIT License}
 */

/**
 * @type {import("type-fest").JsonObject|undefined}
 * @private
 */
var _data;

/**
 * Exposes methods for basic plugin internal data management.
 */
module.exports = {
  /**
   * Get data.
   *
   * @returns {import("type-fest").JsonObject|undefined}
   */
  getData: function () {
    return _data;
  },

  /**
   * Set data.
   *
   * @param {import("type-fest").JsonObject} d
   * @returns {void}
   */
  setData: function (
    /** @type {import("type-fest").JsonObject} */
    data
  ) {
    _data = data;
  }
};
