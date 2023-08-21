/**
 * @module @dd/core/api/object/resolve-variable
 */

/**
 * Resolve to object variable.
 *
 * @param {import("./types").ObjectLike} objectLike
 * @param {string|number} variableNameOrId
 * @returns {import("@pgmmv/agtk/objects/object/variables/variable").AgtkVariable|undefined}
 */
module.exports = function (
  /** @type {import("./types").ObjectLike} */
  objectLike,
  /** @type {string|number} */
  variableNameOrId
) {
  var object = require('./resolve')(objectLike),
    /** @type {number|undefined} */
    variableId;

  if (!object) {
    return;
  }

  variableId = typeof variableNameOrId === 'string' ? object.variables.getIdByName(variableNameOrId) : variableNameOrId;

  if (variableId !== undefined && variableId !== Agtk.constants.actionCommands.UnsetObject) {
    return object.variables.get(variableId) || undefined;
  }
};
