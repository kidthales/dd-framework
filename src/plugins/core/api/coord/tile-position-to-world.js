/**
 * @module @dd/core/api/coord/tile-position-to-world
 */

/**
 *
 * @param {number|import("@pgmmv/cc/point").CCPoint} tilePositionOrX
 * @param {number|undefined} tileY
 * @returns {import("@pgmmv/cc/point").CCPoint}
 */
module.exports = function (
  /** @type {number|import("@pgmmv/cc/point").CCPoint} */
  tilePositionOrX,
  /** @type {number|undefined} */
  tileY
) {
  var isXNumber = typeof tilePositionOrX === 'number';

  return cc.p(
    require('./tile-x-to-world')(
      isXNumber ? tilePositionOrX : typeof tilePositionOrX.x === 'number' ? tilePositionOrX.x : 0
    ),
    require('./tile-y-to-world')(isXNumber ? tileY || 0 : typeof tilePositionOrX.y === 'number' ? tilePositionOrX.y : 0)
  );
};
