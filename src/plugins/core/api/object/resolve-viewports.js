/**
 * @module @dd/core/api/object/resolve-viewports
 */

/**
 * Resolve to object viewports.
 *
 * @param {import("./types").ObjectLike} objectLike
 * @returns {import("@pgmmv/agtk/objects/object/viewports/viewport").AgtkViewport[]|undefined}
 */
module.exports = function (
  /** @type {import("./types").ObjectLike} */
  objectLike
) {
  var object = require('./resolve')(objectLike);

  if (object) {
    return object.viewports.getIdList().map(function (id) {
      return object.viewports.get(id);
    });
  }
};
