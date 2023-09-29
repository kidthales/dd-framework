/**
 * Core plugin API object resolve variables module.
 *
 * @module    dd.core.object.resolveVariables
 * @author    kidthales <kidthales@agogpixel.com>
 * @copyright 2023 kidthales
 * @license   {@link https://github.com/kidthales/dd-framework/blob/main/LICENSE.txt | MIT License}
 */

/**
 * Resolve to object variables.
 *
 * @param {import("./types").ObjectLike} objectLike
 * @returns {import("@pgmmv/agtk/objects/object/variables/variable").AgtkVariable[]|undefined}
 */
module.exports = function (objectLike) {
  var object = require('./resolve')(objectLike);

  if (object) {
    return object.variables.getIdList().map(function (id) {
      return object.variables.get(id);
    });
  }
};
