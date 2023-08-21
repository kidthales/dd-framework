/**
 * @module @dd/core/api/object/resolve-switch
 */

/**
 * Resolve to object switch.
 *
 * @param {import("./types").ObjectLike} objectLike
 * @param {string|number} switchNameOrId
 * @returns {import("@pgmmv/agtk/objects/object/switches/switch").AgtkSwitch|undefined}
 */
module.exports = function (
  /** @type {import("./types").ObjectLike} */
  objectLike,
  /** @type {string|number} */
  switchNameOrId
) {
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
