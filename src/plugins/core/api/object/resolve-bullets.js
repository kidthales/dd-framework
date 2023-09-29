/**
 * Core plugin API object resolve bullets module.
 *
 * @module    dd.core.object.resolveBullets
 * @author    kidthales <kidthales@agogpixel.com>
 * @copyright 2023 kidthales
 * @license   {@link https://github.com/kidthales/dd-framework/blob/main/LICENSE.txt | MIT License}
 */

/**
 * Resolve to object bullets.
 *
 * @param {import("./types").ObjectLike} objectLike
 * @returns {import("@pgmmv/agtk/objects/object/bullets/bullet").AgtkBullet[]|undefined}
 */
module.exports = function (objectLike) {
  var object = require('./resolve')(objectLike);

  if (object) {
    return object.bullets.getIdList().map(function (id) {
      return object.bullets.get(id);
    });
  }
};
