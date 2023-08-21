/**
 * @module @dd/core/api/object/resolve-bullet
 */

/**
 * Resolve to object bullet.
 *
 * @param {import("./types").ObjectLike} objectLike
 * @param {string|number} bulletNameOrId
 * @returns {import("@pgmmv/agtk/objects/object/bullets/bullet").AgtkBullet|undefined}
 */
module.exports = function (
  /** @type {import("./types").ObjectLike} */
  objectLike,
  /** @type {string|number} */
  bulletNameOrId
) {
  var object = require('./resolve')(objectLike),
    /** @type {number|undefined} */
    bulletId;

  if (!object) {
    return;
  }

  bulletId = typeof bulletNameOrId === 'string' ? object.bullets.getIdByName(bulletNameOrId) : bulletNameOrId;

  if (bulletId !== undefined && bulletId !== Agtk.constants.actionCommands.UnsetObject) {
    return object.bullets.get(bulletId) || undefined;
  }
};
