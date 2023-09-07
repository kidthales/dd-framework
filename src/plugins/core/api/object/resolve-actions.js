/**
 * Resolve actions module.
 *
 * @module dd/core/object/resolve-actions
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
