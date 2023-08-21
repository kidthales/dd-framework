/**
 * @module @dd/core/api/object/resolve-bullets
 */

/**
 * Resolve to object bullets.
 *
 * @param {import("./types").ObjectLike} objectLike
 * @returns {import("@pgmmv/agtk/objects/object/bullets/bullet").AgtkBullet[]|undefined}
 */
module.exports = function (
  /** @type {import("./types").ObjectLike} */
  objectLike
) {
  var object = require('./resolve')(objectLike);

  if (object) {
    return object.bullets.getIdList().map(function (id) {
      return object.bullets.get(id);
    });
  }
};
