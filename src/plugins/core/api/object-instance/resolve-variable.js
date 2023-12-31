/**
 * Core plugin API object instance resolve variable module.
 *
 * @module    dd.core.objectInstance.resolveVariable
 * @author    kidthales <kidthales@agogpixel.com>
 * @copyright 2023 kidthales
 * @license   {@link https://github.com/kidthales/dd-framework/blob/main/LICENSE.txt | MIT License}
 */

/**
 * Resolve to an object instance variable.
 *
 * @param {import("./types").ObjectInstanceLike} objectInstanceLike
 * @param {string|number} variableNameOrId
 * @returns {import("@pgmmv/agtk/object-instances/object-instance/variables/variable").AgtkVariable|undefined}
 */
module.exports = function (objectInstanceLike, variableNameOrId) {
  var objectInstance = require('./resolve')(objectInstanceLike),
    /** @type {number|undefined} */
    variableId;

  if (!objectInstance) {
    return;
  }

  switch (typeof variableNameOrId) {
    case 'number':
      variableId = variableNameOrId;
      break;
    case 'string':
      variableId = objectInstance.variables.getIdByName(variableNameOrId);
      break;
    default:
      break;
  }

  if (variableId !== undefined && variableId !== Agtk.constants.actionCommands.UnsetObject) {
    return objectInstance.variables.get(variableId) || undefined;
  }
};
