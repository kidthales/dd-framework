/**
 * Core plugin API common resolve variable module.
 *
 * @module    dd.core.common.resolveVariable
 * @author    kidthales <kidthales@agogpixel.com>
 * @copyright 2023 kidthales
 * @license   {@link https://github.com/kidthales/dd-framework/blob/main/LICENSE.txt | MIT License}
 */

/**
 * Resolve to a common variable.
 *
 * @param {string|number} nameOrId
 * @returns {import("@pgmmv/agtk/variables/variable").AgtkVariable|undefined}
 */
module.exports = function (nameOrId) {
  /** @type {number|undefined} */
  var variableId;

  switch (typeof nameOrId) {
    case 'number':
      variableId = nameOrId;
      break;
    case 'string':
      variableId = Agtk.variables.getIdByName(nameOrId);
      break;
    default:
      break;
  }

  if (variableId !== undefined && variableId !== Agtk.constants.actionCommands.UnsetObject) {
    return Agtk.variables.get(variableId) || undefined;
  }
};
