/**
 * @module @dd/core/api/coord/tile-y-to-world
 */

/**
 *
 * @param {number} tileY
 * @returns {number}
 */
module.exports = function (
  /** @type {number} */
  tileY
) {
  return tileY * Agtk.settings.tileHeight;
};
