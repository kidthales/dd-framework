/**
 * @module @dd/core/api/coord/world-x-to-tile
 */

/**
 *
 * @param {number} worldX
 * @returns {number}
 */
module.exports = function (
  /** @type {number} */
  worldX
) {
  var tileX = Math.floor(worldX / Agtk.settings.tileWidth);
  return worldX >= 0 ? tileX : tileX - 1;
};
