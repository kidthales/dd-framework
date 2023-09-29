/**
 * Core plugin API user interface font cache module.
 *
 * @internal
 * @module    @dd/core/ui/font/cache
 * @author    kidthales <kidthales@agogpixel.com>
 * @copyright 2023 kidthales
 * @license   {@link https://github.com/kidthales/dd-framework/blob/main/LICENSE.txt | MIT License}
 */

/**
 * @type {Record<number, import("./types").FontData|undefined>}
 * @private
 */
var _cache = {};

/**
 * Exposes methods for managing font data cache.
 *
 * @internal
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
