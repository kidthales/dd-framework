/**
 * Core plugin API object resolve action module.
 *
 * @module    dd.core.object.resolveAction
 * @author    kidthales <kidthales@agogpixel.com>
 * @copyright 2023 kidthales
 * @license   {@link https://github.com/kidthales/dd-framework/blob/main/LICENSE.txt | MIT License}
 */

/**
 * Resolve to object action.
 *
 * @param {import("./types").ObjectLike} objectLike
 * @param {string|number} actionNameOrId
 * @returns {import("@pgmmv/agtk/objects/object/actions/action").AgtkAction|undefined}
 */
module.exports = function (objectLike, actionNameOrId) {
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
