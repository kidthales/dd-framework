/**
 * @module @dd/core/api/object-instance/resolve-single-unit
 */

/**
 * Resolve to single unit object instance.
 *
 * @param {import("./types").ObjectInstanceLike} objectInstanceLike
 * @returns {import("@pgmmv/agtk/object-instances/object-instance").AgtkObjectInstance|undefined}
 */
module.exports = function (
  /** @type {import("./types").ObjectInstanceLike} */
  objectInstanceLike
) {
  var singleUnitId = require('./resolve-variable-value')(
    objectInstanceLike,
    Agtk.constants.objects.variables.SingleInstanceIDId
  );

  if (singleUnitId !== undefined && singleUnitId !== Agtk.constants.actionCommands.UnsetObject) {
    return Agtk.objectInstances.get(singleUnitId) || undefined;
  }
};
