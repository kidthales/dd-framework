/**
 * @module @dd/core/api/common/resolve-switch
 */

/**
 * Resolve to a common switch.
 *
 * @param {string|number} nameOrId
 * @returns {import("@pgmmv/agtk/switches/switch").AgtkSwitch|undefined}
 */
module.exports = function (
  /** @type {string|number} */
  nameOrId
) {
  /** @type {number|undefined} */
  var switchId;

  switch (typeof nameOrId) {
    case 'number':
      switchId = nameOrId;
      break;
    case 'string':
      switchId = Agtk.switches.getIdByName(nameOrId);
      break;
    default:
      break;
  }

  if (switchId !== undefined && switchId !== Agtk.constants.actionCommands.UnsetObject) {
    return Agtk.switches.get(switchId) || undefined;
  }
};
