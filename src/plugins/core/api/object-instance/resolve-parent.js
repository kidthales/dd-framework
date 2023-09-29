/**
 * Core plugin API object instance resolve parent module.
 *
 * @module    dd.core.objectInstance.resolveParent
 * @author    kidthales <kidthales@agogpixel.com>
 * @copyright 2023 kidthales
 * @license   {@link https://github.com/kidthales/dd-framework/blob/main/LICENSE.txt | MIT License}
 */

/**
 * Resolve to parent object instance.
 *
 * @param {import("./types").ObjectInstanceLike} objectInstanceLike
 * @returns {import("@pgmmv/agtk/object-instances/object-instance").AgtkObjectInstance|undefined}
 */
module.exports = function (objectInstanceLike) {
  var parentId = require('./resolve-variable-value')(
    objectInstanceLike,
    Agtk.constants.objects.variables.ParentObjectInstanceIDId
  );

  if (parentId !== undefined && parentId !== Agtk.constants.actionCommands.UnsetObject) {
    return Agtk.objectInstances.get(parentId) || undefined;
  }
};
