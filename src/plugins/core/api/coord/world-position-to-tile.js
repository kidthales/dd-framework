/**
 * Core plugin API coordinate world position to tile module.
 *
 * @module    dd.core.coord.worldPositionToTile
 * @author    kidthales <kidthales@agogpixel.com>
 * @copyright 2023 kidthales
 * @license   {@link https://github.com/kidthales/dd-framework/blob/main/LICENSE.txt | MIT License}
 */

/**
 * Convert world position (specified in pixel coordinates) to tiles.
 *
 * @param {number|import("@pgmmv/cc/point").CCPoint} worldPositionOrX
 * @param {number|undefined} worldY
 * @returns {import("@pgmmv/cc/point").CCPoint}
 */
module.exports = function (worldPositionOrX, worldY) {
  var isXNumber = typeof worldPositionOrX === 'number';

  return cc.p(
    require('./world-x-to-tile')(
      isXNumber ? worldPositionOrX : typeof worldPositionOrX.x === 'number' ? worldPositionOrX.x : 0
    ),
    require('./world-y-to-tile')(
      isXNumber ? worldY || 0 : typeof worldPositionOrX.y === 'number' ? worldPositionOrX.y : 0
    )
  );
};
