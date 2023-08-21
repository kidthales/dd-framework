/**
 * @module @dd/core/api/object/resolve-action
 */

/**
 * Resolve to object action.
 *
 * @param {import("./types").ObjectLike} objectLike
 * @param {string|number} actionNameOrId
 * @returns {import("@pgmmv/agtk/objects/object/actions/action").AgtkAction|undefined}
 */
module.exports = function (
  /** @type {import("./types").ObjectLike} */
  objectLike,
  /** @type {string|number} */
  actionNameOrId
) {
  var object = require('./resolve')(objectLike),
    /** @type {number|undefined} */
    actionId;

  if (!object) {
    return;
  }

  actionId = typeof actionNameOrId === 'string' ? object.actions.getIdByName(actionName) : actionNameOrId;

  if (actionId !== undefined && actionId !== Agtk.constants.actionCommands.UnsetObject) {
    return object.actions.get(actionId) || undefined;
  }
};
