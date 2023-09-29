/**
 * Core plugin API object resolve actions module.
 *
 * @module    dd.core.object.resolveActions
 * @author    kidthales <kidthales@agogpixel.com>
 * @copyright 2023 kidthales
 * @license   {@link https://github.com/kidthales/dd-framework/blob/main/LICENSE.txt | MIT License}
 */

/**
 * Resolve to object actions.
 *
 * @param {import("./types").ObjectLike} objectLike
 * @returns {import("@pgmmv/agtk/objects/object/actions/action").AgtkAction[]|undefined}
 */
module.exports = function (objectLike) {
  var object = require('./resolve')(objectLike);

  if (object) {
    return object.actions.getIdList().map(function (id) {
      return object.actions.get(id);
    });
  }
};
