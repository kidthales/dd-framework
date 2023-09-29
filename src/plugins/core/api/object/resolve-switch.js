/**
 * Core plugin API object resolve switch module.
 *
 * @module    dd.core.object.resolveSwitch
 * @author    kidthales <kidthales@agogpixel.com>
 * @copyright 2023 kidthales
 * @license   {@link https://github.com/kidthales/dd-framework/blob/main/LICENSE.txt | MIT License}
 */

/**
 * Resolve to object switch.
 *
 * @param {import("./types").ObjectLike} objectLike
 * @param {string|number} switchNameOrId
 * @returns {import("@pgmmv/agtk/objects/object/switches/switch").AgtkSwitch|undefined}
 */
module.exports = function (objectLike, switchNameOrId) {
  var object = require('./resolve')(objectLike),
    /** @type {number|undefined} */
    switchId;

  if (!object) {
    return;
  }

  switchId = typeof switchNameOrId === 'string' ? object.switches.getIdByName(switchNameOrId) : switchNameOrId;

  if (switchId !== undefined && switchId !== Agtk.constants.actionCommands.UnsetObject) {
    return object.switches.get(switchId) || undefined;
  }
};
