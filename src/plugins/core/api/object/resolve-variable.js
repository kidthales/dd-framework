/**
 * Resolve variable module.
 *
 * @module dd/core/object/resolve-variable
 */

/**
 * Resolve to object variable.
 *
 * @param {import("./types").ObjectLike} objectLike
 * @param {string|number} variableNameOrId
 * @returns {import("@pgmmv/agtk/objects/object/variables/variable").AgtkVariable|undefined}
 */
module.exports = function (objectLike, variableNameOrId) {
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
