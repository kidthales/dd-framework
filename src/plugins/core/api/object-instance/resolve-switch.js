/**
 * Resolve switch module.
 *
 * @module dd/core/object-instance/resolve-switch
 */

/**
 * Resolve to an object instance switch.
 *
 * @param {import("./types").ObjectInstanceLike} objectInstanceLike
 * @param {string|number} switchNameOrId
 * @returns {import("@pgmmv/agtk/object-instances/object-instance/switches/switch").AgtkSwitch|undefined}
 */
module.exports = function (objectInstanceLike, switchNameOrId) {
  var objectInstance = require('./resolve')(objectInstanceLike),
    /** @type {number|undefined} */
    switchId;

  if (!objectInstance) {
    return;
  }

  switch (typeof switchNameOrId) {
    case 'number':
      switchId = switchNameOrId;
      break;
    case 'string':
      switchId = objectInstance.switches.getIdByName(switchNameOrId);
      break;
    default:
      break;
  }

  if (switchId !== undefined && switchId !== Agtk.constants.actionCommands.UnsetObject) {
    return objectInstance.switches.get(switchId) || undefined;
  }
};
