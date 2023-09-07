/**
 * In tile module.
 *
 * @module dd/core/object-instance/in-tile
 */

/**
 *
 * @param {import("./types").ObjectInstanceLike} objectInstanceLike
 * @param {number} tileX
 * @param {number} tileY
 * @returns {boolean}
 */
module.exports = function (objectInstanceLike, tileX, tileY) {
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
