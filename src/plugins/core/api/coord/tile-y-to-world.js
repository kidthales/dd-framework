/**
 * Core plugin API coordinate tile y to world module.
 *
 * @module    dd.core.coord.tileYToWorld
 * @author    kidthales <kidthales@agogpixel.com>
 * @copyright 2023 kidthales
 * @license   {@link https://github.com/kidthales/dd-framework/blob/main/LICENSE.txt | MIT License}
 */

/**
 * Convert specified tile y coordinate to world pixels.
 *
 * @param {number} tileY
 * @returns {number}
 */
module.exports = function (tileY) {
  return tileY * Agtk.settings.tileHeight;
};
