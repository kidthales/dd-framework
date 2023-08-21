/**
 * @module @dd/core/api/coord/world-y-to-tile
 */

/**
 *
 * @param {number} worldY
 * @returns {number}
 */
module.exports = function (
  /** @type {number} */
  worldY
) {
  var tileY = Math.floor(worldY / Agtk.settings.tileHeight);
  return worldY >= 0 ? tileY : tileY - 1;
};
