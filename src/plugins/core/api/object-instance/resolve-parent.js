/**
 * @module @dd/core/api/object-instance/resolve-parent
 */

/**
 * Resolve to parent object instance.
 *
 * @param {import("./types").ObjectInstanceLike} objectInstanceLike
 * @returns {import("@pgmmv/agtk/object-instances/object-instance").AgtkObjectInstance|undefined}
 */
module.exports = function (
  /** @type {import("./types").ObjectInstanceLike} */
  objectInstanceLike
) {
  var parentId = require('./resolve-variable-value')(
    objectInstanceLike,
    Agtk.constants.objects.variables.ParentObjectInstanceIDId
  );

  if (parentId !== undefined && parentId !== Agtk.constants.actionCommands.UnsetObject) {
    return Agtk.objectInstances.get(parentId) || undefined;
  }
};
