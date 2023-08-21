/**
 * @module @dd/common/plugin/data
 */

/**
 * @type {import("type-fest").JsonObject|undefined}
 * @private
 */
var _data;

module.exports = {
  /**
   * @returns {import("type-fest").JsonObject|undefined}
   */
  getData: function () {
    return _data;
  },

  /**
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
