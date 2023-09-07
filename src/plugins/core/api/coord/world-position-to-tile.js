/**
 * World position to tile module.
 *
 * @module dd/core/coord/world-position-to-tile
 */

/**
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
