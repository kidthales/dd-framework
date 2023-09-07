/**
 * Cache module.
 *
 * @module dd/core/font/cache
 * @internal
 */

/**
 * @type {Record<number, import("./types").FontData|undefined>}
 * @private
 */
var _cache = {};

/**
 *
 */
module.exports = {
  /**
   * @param {number} id
   * @returns {import("./types").FontData|undefined}
   */
  get: function (id) {
    return _cache[id];
  },

  /**
   * @param {number} id
   * @param {import("./types").FontData|undefined} data
   * @returns {void}
   */
  set: function (id, data) {
    _cache[id] = data;
  }
};
