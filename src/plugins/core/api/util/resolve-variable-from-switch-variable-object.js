/**
 * Core plugin API utility resolve variable from switch/variable object module.
 *
 * @module    dd.core.util.resolveVariableFromSwitchVariableObject
 * @author    kidthales <kidthales@agogpixel.com>
 * @copyright 2023 kidthales
 * @license   {@link https://github.com/kidthales/dd-framework/blob/main/LICENSE.txt | MIT License}
 */

/**
 * @param {import("@pgmmv/agtk/constants/switch-variable-objects").SwitchVariableObjectsValue} switchVariableObject
 * @param {string|number} variableNameOrId
 * @param {number} instanceId
 * @returns {import("@pgmmv/agtk/variables/variable").AgtkVariable|import("@pgmmv/agtk/object-instances/object-instance/variables/variable").AgtkVariable|undefined}
 */
module.exports = function (switchVariableObject, variableNameOrId, instanceId) {
  var variableSource = dd.core.util.resolveSwitchVariableObject(switchVariableObject, instanceId);

  if (variableSource !== undefined) {
    return dd.core.util.resolveVariable(variableSource, variableNameOrId);
  }
};
