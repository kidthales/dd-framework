/**
 * Resolve single unit module.
 *
 * @module dd/core/object-instance/resolve-single-unit
 */

/**
 * Resolve to single unit object instance.
 *
 * @param {import("./types").ObjectInstanceLike} objectInstanceLike
 * @returns {import("@pgmmv/agtk/object-instances/object-instance").AgtkObjectInstance|undefined}
 */
module.exports = function (objectInstanceLike) {
  var singleUnitId = require('./resolve-variable-value')(
    objectInstanceLike,
    Agtk.constants.objects.variables.SingleInstanceIDId
  );

  if (singleUnitId !== undefined && singleUnitId !== Agtk.constants.actionCommands.UnsetObject) {
    return Agtk.objectInstances.get(singleUnitId) || undefined;
  }
};
