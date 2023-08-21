/**
 * @module @dd/core/api/object/resolve
 */

/**
 * Resolve to an object.
 *
 * @param {import("./types").ObjectLike} objectLike
 * @returns {import("@pgmmv/agtk/objects/object").AgtkObject|undefined}
 */
module.exports = function (
  /** @type {import("./types").ObjectLike} */
  objectLike
) {
  /** @type {number|undefined} */
  var id;

  if (typeof objectLike === 'string') {
    id = Agtk.objects.getIdByName(name);
  } else if (typeof objectLike === 'number') {
    id = objectLike;
  } else if (objectLike && typeof objectLike.id === 'number') {
    return objectLike;
  }

  if (id !== undefined && id !== Agtk.constants.actionCommands.UnsetObject) {
    return Agtk.objects.get(id) || undefined;
  }
};
