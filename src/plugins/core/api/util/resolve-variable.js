/**
 * Core plugin API utility resolve variable module.
 *
 * @module    dd.core.util.resolveVariable
 * @author    kidthales <kidthales@agogpixel.com>
 * @copyright 2023 kidthales
 * @license   {@link https://github.com/kidthales/dd-framework/blob/main/LICENSE.txt | MIT License}
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
