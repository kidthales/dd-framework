/**
 * World position to camera module.
 *
 * @module dd/core/coord/world-position-to-camera
 */

/**
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
