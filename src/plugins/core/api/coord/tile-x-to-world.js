/**
 * @module @dd/core/api/coord/tile-x-to-world
 */

/**
 *
 * @param {number} tileX
 * @returns {number}
 */
module.exports = function (
  /** @type {number} */
  tileX
) {
  return tileX * Agtk.settings.tileWidth;
};
