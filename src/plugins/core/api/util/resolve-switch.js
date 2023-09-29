/**
 * Core plugin API utility resolve switch module.
 *
 * @module    dd.core.util.resolveSwitch
 * @author    kidthales <kidthales@agogpixel.com>
 * @copyright 2023 kidthales
 * @license   {@link https://github.com/kidthales/dd-framework/blob/main/LICENSE.txt | MIT License}
 */

/**
 * Resolve to a switch.
 *
 * @param {import("./types").SwitchVariableSource} source
 * @param {string|number} nameOrId
 * @returns {import("@pgmmv/agtk/switches/switch").AgtkSwitch|import("@pgmmv/agtk/object-instances/object-instance/switches/switch").AgtkSwitch|undefined}
 */
module.exports = function (source, nameOrId) {
  return source === Agtk.constants.switchVariableObjects.ProjectCommon
    ? require('../common/resolve-switch')(nameOrId)
    : require('../object-instance/resolve-switch')(source, nameOrId);
};
