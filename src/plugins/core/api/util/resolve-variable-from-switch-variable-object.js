/**
 * @module dd/core/util/resolve-variable-from-switch-variable-object
 */

/**
 *
 * @param {import("@pgmmv/agtk/constants/switch-variable-objects").SwitchVariableObjectsValue} switchVariableObject
 * @param {string|number} variableNameOrId
 * @param {number} instanceId
 * @returns {import("@pgmmv/agtk/variables/variable").AgtkVariable|import("@pgmmv/agtk/object-instances/object-instance/variables/variable").AgtkVariable|undefined}
 */
module.exports = function (
  /** @type {import("@pgmmv/agtk/constants/switch-variable-objects").SwitchVariableObjectsValue} */
  switchVariableObject,
  /** @type {string|number} */
  variableNameOrId,
  /** @type {number} */
  instanceId
) {
  var variableSource = dd.core.util.resolveSwitchVariableObject(switchVariableObject, instanceId);

  if (variableSource !== undefined) {
    return dd.core.util.resolveVariable(variableSource, variableNameOrId);
  }
};
