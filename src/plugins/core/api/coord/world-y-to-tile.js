/**
 * Core plugin API coordinate world y to tile module.
 *
 * @module    dd.core.coord.worldYToTile
 * @author    kidthales <kidthales@agogpixel.com>
 * @copyright 2023 kidthales
 * @license   {@link https://github.com/kidthales/dd-framework/blob/main/LICENSE.txt | MIT License}
 */

/**
 * Convert specified world y coordinate (in pixels) to tiles.
 *
 * @param {number} worldY
 * @returns {number}
 */
module.exports = function (worldY) {
  var tileY = Math.floor(worldY / Agtk.settings.tileHeight);
  return worldY >= 0 ? tileY : tileY - 1;
};
