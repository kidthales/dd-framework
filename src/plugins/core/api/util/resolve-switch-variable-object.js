/**
 * Resolve switch/variable object module.
 *
 * @module dd/core/util/resolve-switch-variable-object
 */

/**
 * Resolve the switch/variable object to either the Project Common identifier (`0`) or an appropriate object instance.
 *
 * @param {import("@pgmmv/agtk/constants/switch-variable-objects").SwitchVariableObjectsValue} switchVariableObject Suitable values are:
 *   -  0: Project Common
 *   - -2: Self Object
 *   - -7: Parent Object
 * @param {number} instanceId ID of object instance from which to determine self or parent object instance.
 * @returns {import("@pgmmv/agtk/constants/switch-variable-objects").AgtkSwitchVariableObjects['ProjectCommon']|import("@pgmmv/agtk/object-instances/object-instance").AgtkObjectInstance|undefined}
 */
module.exports = function (switchVariableObject, instanceId) {
  switch (switchVariableObject) {
    case Agtk.constants.switchVariableObjects.ProjectCommon:
      return switchVariableObject;
    case Agtk.constants.switchVariableObjects.SelfObject:
      return Agtk.objectInstances.get(instanceId) || undefined;
    case Agtk.constants.switchVariableObjects.ParentObject:
      return require('../object-instance/resolve-parent')(instanceId);
    default:
      break;
  }
};
