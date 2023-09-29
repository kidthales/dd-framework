/**
 * Core plugin API coordinate world position to camera module.
 *
 * @module    dd.core.coord.worldPositionToCamera
 * @author    kidthales <kidthales@agogpixel.com>
 * @copyright 2023 kidthales
 * @license   {@link https://github.com/kidthales/dd-framework/blob/main/LICENSE.txt | MIT License}
 */

/**
 * Convert position from world-space to camera-space.
 *
 * @param {number|import("@pgmmv/cc/point").CCPoint} worldPositionOrX
 * @param {number|undefined} worldY
 * @returns {import("@pgmmv/cc/point").CCPoint}
 */
module.exports = function (worldPositionOrX, worldY) {
  var isXNumber = typeof worldPositionOrX === 'number',
    worldPositionX = isXNumber ? worldPositionOrX : typeof worldPositionOrX.x === 'number' ? worldPositionOrX.x : 0,
    worldPositionY = isXNumber ? worldY || 0 : typeof worldPositionOrX.y === 'number' ? worldPositionOrX.y : 0,
    cameraRect = require('../camera/get-rect')();

  return cc.p(worldPositionX - cameraRect.x, worldPositionY - cameraRect.y);
};
