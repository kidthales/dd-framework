/**
 * Core plugin API coordinate world x to tile module.
 *
 * @module    dd.core.coord.worldXToTile
 * @author    kidthales <kidthales@agogpixel.com>
 * @copyright 2023 kidthales
 * @license   {@link https://github.com/kidthales/dd-framework/blob/main/LICENSE.txt | MIT License}
 */

/**
 * Convert specified world x coordinate (in pixels) to tiles.
 *
 * @param {number} worldX
 * @returns {number}
 */
module.exports = function (worldX) {
  var tileX = Math.floor(worldX / Agtk.settings.tileWidth);
  return worldX >= 0 ? tileX : tileX - 1;
};
