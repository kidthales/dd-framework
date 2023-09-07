/**
 * Tile x to world module.
 *
 * @module dd/core/coord/tile-x-to-world
 */

/**
 * @param {number} tileX
 * @returns {number}
 */
module.exports = function (tileX) {
  return tileX * Agtk.settings.tileWidth;
};
