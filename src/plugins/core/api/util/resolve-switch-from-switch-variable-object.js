/**
 * Core plugin API utility resolve switch from switch/variable object module.
 *
 * @module    dd.core.util.resolveSwitchFromSwitchVariableObject
 * @author    kidthales <kidthales@agogpixel.com>
 * @copyright 2023 kidthales
 * @license   {@link https://github.com/kidthales/dd-framework/blob/main/LICENSE.txt | MIT License}
 */

/**
 * @param {import("@pgmmv/agtk/constants/switch-variable-objects").SwitchVariableObjectsValue} switchVariableObject
 * @param {string|number} switchNameOrId
 * @param {number} instanceId
 * @returns {import("@pgmmv/agtk/switches/switch").AgtkSwitch|import("@pgmmv/agtk/object-instances/object-instance/switches/switch").AgtkSwitch|undefined}
 */
module.exports = function (switchVariableObject, switchNameOrId, instanceId) {
  var switchSource = dd.core.util.resolveSwitchVariableObject(switchVariableObject, instanceId);

  if (switchSource !== undefined) {
    return dd.core.util.resolveSwitch(switchSource, switchNameOrId);
  }
};
