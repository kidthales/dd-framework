/**
 * Camera position to world module.
 *
 * @module dd/core/coord/camera-position-to-world
 */

/**
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
