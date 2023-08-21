/**
 * @module @dd/core/api/object/resolve-variables
 */

/**
 * Resolve to object variables.
 *
 * @param {import("./types").ObjectLike} objectLike
 * @returns {import("@pgmmv/agtk/objects/object/variables/variable").AgtkVariable[]|undefined}
 */
module.exports = function (
  /** @type {import("./types").ObjectLike} */
  objectLike
) {
  var object = require('./resolve')(objectLike);

  if (object) {
    return object.variables.getIdList().map(function (id) {
      return object.variables.get(id);
    });
  }
};
