/**
 * Tile y to world module.
 *
 * @module dd/core/coord/tile-y-to-world
 */

/**
 * @param {number} tileY
 * @returns {number}
 */
module.exports = function (tileY) {
  return tileY * Agtk.settings.tileHeight;
};
