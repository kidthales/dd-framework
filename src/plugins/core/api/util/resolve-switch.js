/**
 * @module @dd/core/api/util/resolve-switch
 */

/**
 * Resolve to a switch.
 *
 * @param {import("./types").SwitchVariableSource} source
 * @param {string|number} nameOrId
 * @returns {import("@pgmmv/agtk/switches/switch").AgtkSwitch|import("@pgmmv/agtk/object-instances/object-instance/switches/switch").AgtkSwitch|undefined}
 */
module.exports = function (
  /** @type {import("./types").SwitchVariableSource} */
  source,
  /** @type {string|number} */
  nameOrId
) {
  return source === Agtk.constants.switchVariableObjects.ProjectCommon
    ? require('../common/resolve-switch')(nameOrId)
    : require('../object-instance/resolve-switch')(source, nameOrId);
};
