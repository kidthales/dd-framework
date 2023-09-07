/**
 * Resolve variable module.
 *
 * @module dd/core/common/resolve-variable
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
