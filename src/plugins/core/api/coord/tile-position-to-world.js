/**
 * Core plugin API coordinate tile position to world module.
 *
 * @module    dd.core.coord.tilePositionToWorld
 * @author    kidthales <kidthales@agogpixel.com>
 * @copyright 2023 kidthales
 * @license   {@link https://github.com/kidthales/dd-framework/blob/main/LICENSE.txt | MIT License}
 */

/**
 * Convert position specified in tile coordinates to pixels.
 *
 * @param {number|import("@pgmmv/cc/point").CCPoint} tilePositionOrX
 * @param {number|undefined} tileY
 * @returns {import("@pgmmv/cc/point").CCPoint}
 */
module.exports = function (tilePositionOrX, tileY) {
  var isXNumber = typeof tilePositionOrX === 'number';

  return cc.p(
    require('./tile-x-to-world')(
      isXNumber ? tilePositionOrX : typeof tilePositionOrX.x === 'number' ? tilePositionOrX.x : 0
    ),
    require('./tile-y-to-world')(isXNumber ? tileY || 0 : typeof tilePositionOrX.y === 'number' ? tilePositionOrX.y : 0)
  );
};
