/**
 * Snap to tile module.
 *
 * @module dd/core/object-instance/snap-to-tile
 */

/**
 *
 * @param {import("./types").ObjectInstanceLike} objectInstanceLike
 * @param {number|null|undefined} tileOriginX
 * @param {number|null|undefined} tileOriginY
 * @param {number|undefined} tilePositionX
 * @param {number|undefined} tilePositionY
 * @returns {void}
 */
module.exports = function (objectInstanceLike, tileOriginX, tileOriginY, tilePositionX, tilePositionY) {
  var tileXToWorld = require('../coord/tile-x-to-world'),
    tileYToWorld = require('../coord/tile-y-to-world'),
    worldXToTile = require('../coord/world-x-to-tile'),
    worldYToTile = require('../coord/world-y-to-tile'),
    objectInstancePosition = require('./resolve-position')(objectInstanceLike),
    /** @type {number|undefined} */
    offsetX,
    /** @type {number|undefined} */
    offsetY,
    /** @type {number|undefined} */
    tileLeft,
    /** @type {number|undefined} */
    tileTop;

  if (!objectInstancePosition) {
    return;
  }

  offsetX =
    tileOriginX === null
      ? objectInstancePosition.x - tileXToWorld(worldXToTile(objectInstancePosition.x))
      : Math.floor(cc.clampf(tileOriginX || 0, 0, 1) * Agtk.settings.tileWidth);

  offsetY =
    tileOriginY === null
      ? objectInstancePosition.y - tileYToWorld(worldYToTile(objectInstancePosition.y))
      : Math.floor(
          cc.clampf(tileOriginY === undefined ? tileOriginX || 0 : tileOriginY || 0, 0, 1) * Agtk.settings.tileHeight
        );

  tileLeft = tileXToWorld(tilePositionX === undefined ? worldXToTile(objectInstancePosition.x) : tilePositionX);
  tileTop = tileYToWorld(tilePositionY === undefined ? worldYToTile(objectInstancePosition.y) : tilePositionY);

  require('./resolve-position')(objectInstanceLike, tileLeft + offsetX, tileTop + offsetY);
};
