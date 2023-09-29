/**
 * Core plugin API object resolve viewports module.
 *
 * @module    dd.core.object.resolveViewports
 * @author    kidthales <kidthales@agogpixel.com>
 * @copyright 2023 kidthales
 * @license   {@link https://github.com/kidthales/dd-framework/blob/main/LICENSE.txt | MIT License}
 */

/**
 * Resolve to object viewports.
 *
 * @param {import("./types").ObjectLike} objectLike
 * @returns {import("@pgmmv/agtk/objects/object/viewports/viewport").AgtkViewport[]|undefined}
 */
module.exports = function (objectLike) {
  var object = require('./resolve')(objectLike);

  if (object) {
    return object.viewports.getIdList().map(function (id) {
      return object.viewports.get(id);
    });
  }
};
