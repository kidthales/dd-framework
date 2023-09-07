/**
 * Resolve variable module.
 *
 * @module dd/core/util/resolve-variable
 */

/**
 * Resolve to a variable.
 *
 * @param {import("./types").SwitchVariableSource} source
 * @param {string|number} nameOrId
 * @returns {import("@pgmmv/agtk/variables/variable").AgtkVariable|import("@pgmmv/agtk/object-instances/object-instance/variables/variable").AgtkVariable|undefined}
 */
module.exports = function (source, nameOrId) {
  return source === Agtk.constants.switchVariableObjects.ProjectCommon
    ? require('../common/resolve-variable')(nameOrId)
    : require('../object-instance/resolve-variable')(source, nameOrId);
};
