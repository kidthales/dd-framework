/**
 * World y to tile module.
 *
 * @module dd/core/coord/world-y-to-tile
 */

/**
 * @param {number} worldY
 * @returns {number}
 */
module.exports = function (worldY) {
  var tileY = Math.floor(worldY / Agtk.settings.tileHeight);
  return worldY >= 0 ? tileY : tileY - 1;
};
