/**
 * Core plugin API object instance resolve single unit module.
 *
 * @module    dd.core.objectInstance.resolveSingleUnit
 * @author    kidthales <kidthales@agogpixel.com>
 * @copyright 2023 kidthales
 * @license   {@link https://github.com/kidthales/dd-framework/blob/main/LICENSE.txt | MIT License}
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
