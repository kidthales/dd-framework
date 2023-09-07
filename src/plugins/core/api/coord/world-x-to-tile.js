/**
 * World x to tile module.
 *
 * @module dd/core/coord/world-x-to-tile
 */

/**
 * @param {number} worldX
 * @returns {number}
 */
module.exports = function (worldX) {
  var tileX = Math.floor(worldX / Agtk.settings.tileWidth);
  return worldX >= 0 ? tileX : tileX - 1;
};
