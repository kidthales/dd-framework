/**
 * Core plugin API common resolve switch module.
 *
 * @module    dd.core.common.resolveSwitch
 * @author    kidthales <kidthales@agogpixel.com>
 * @copyright 2023 kidthales
 * @license   {@link https://github.com/kidthales/dd-framework/blob/main/LICENSE.txt | MIT License}
 */

/**
 * Resolve to a common switch.
 *
 * @param {string|number} nameOrId
 * @returns {import("@pgmmv/agtk/switches/switch").AgtkSwitch|undefined}
 */
module.exports = function (nameOrId) {
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
