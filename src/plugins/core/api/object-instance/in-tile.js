/**
 * @module @dd/core/api/object-instance/in-tile
 */

/**
 *
 * @param {import("./types").ObjectInstanceLike} objectInstanceLike
 * @param {number} tileX
 * @param {number} tileY
 * @returns {boolean}
 */
module.exports = function (
  /** @type {import("./types").ObjectInstanceLike} */
  objectInstanceLike,
  /** @type {number} */
  tileX,
  /** @type {number} */
  tileY
) {
  return require('./in-rect')(
    objectInstanceLike,
    cc.rect(
      require('../coord/tile-x-to-world')(tileX),
      require('../coord/tile-y-to-world')(tileY),
      Agtk.settings.tileWidth,
      Agtk.settings.tileHeight
    )
  );
};
