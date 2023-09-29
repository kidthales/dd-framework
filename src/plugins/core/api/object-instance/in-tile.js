/**
 * Core plugin API object instance in tile module.
 *
 * @module    dd.core.objectInstance.inTile
 * @author    kidthales <kidthales@agogpixel.com>
 * @copyright 2023 kidthales
 * @license   {@link https://github.com/kidthales/dd-framework/blob/main/LICENSE.txt | MIT License}
 */

/**
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
