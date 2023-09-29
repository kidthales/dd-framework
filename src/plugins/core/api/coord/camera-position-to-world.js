/**
 * Core plugin API coordinate camera position to world module.
 *
 * @module    dd.core.coord.cameraPositionToWorld
 * @author    kidthales <kidthales@agogpixel.com>
 * @copyright 2023 kidthales
 * @license   {@link https://github.com/kidthales/dd-framework/blob/main/LICENSE.txt | MIT License}
 */

/**
 * Convert position from camera-space to world-space.
 *
 * @param {number|import("@pgmmv/cc/point").CCPoint} cameraPositionOrX
 * @param {number|undefined} cameraY
 * @returns {import("@pgmmv/cc/point").CCPoint}
 */
module.exports = function (cameraPositionOrX, cameraY) {
  var isXNumber = typeof cameraPositionOrX === 'number',
    cameraPositionX = isXNumber ? cameraPositionOrX : typeof cameraPositionOrX.x === 'number' ? cameraPositionOrX.x : 0,
    cameraPositionY = isXNumber ? cameraY || 0 : typeof cameraPositionOrX.y === 'number' ? cameraPositionOrX.y : 0,
    cameraRect = require('../camera/get-rect')();

  return cc.p(cameraRect.x + cameraPositionX, cameraRect.y + cameraPositionY);
};
