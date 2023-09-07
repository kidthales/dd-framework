/**
 * In tile rectangle module.
 *
 * @module dd/core/object-instance/in-tile-rect
 */

/**
 * @param {import("./types").ObjectInstanceLike} objectInstanceLike
 * @param {import("@pgmmv/cc/rect").CCRect} tileRect
 * @returns {boolean}
 */
module.exports = function (objectInstanceLike, tileRect) {
  return require('./in-rect')(
    objectInstanceLike,
    cc.rect(
      require('../coord/tile-x-to-world')(tileRect.x),
      require('../coord/tile-y-to-world')(tileRect.y),
      tileRect.width * Agtk.settings.tileWidth,
      tileRect.height * Agtk.settings.tileHeight
    )
  );
};
