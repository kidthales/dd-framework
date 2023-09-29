/**
 * Core plugin API coordinate tile x to world module.
 *
 * @module    dd.core.coord.tileXToWorld
 * @author    kidthales <kidthales@agogpixel.com>
 * @copyright 2023 kidthales
 * @license   {@link https://github.com/kidthales/dd-framework/blob/main/LICENSE.txt | MIT License}
 */

/**
 * Convert specified tile x coordinate to world pixels.
 *
 * @param {number} tileX
 * @returns {number}
 */
module.exports = function (tileX) {
  return tileX * Agtk.settings.tileWidth;
};
