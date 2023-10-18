/**
 * Handler module.
 *
 * @module
 */

/**
 * @param {import('@dd/common/plugin/types').ActionCommandPayload} payload
 * @returns {import('@pgmmv/agtk/constants/action-commands/command-behavior').AgtkCommandBehavior['CommandBehaviorNext']|import('@pgmmv/agtk/constants/action-commands/command-behavior').AgtkCommandBehavior['CommandBehaviorBlock']} Command behavior 'next' or 'block'.
 */
module.exports = function handler(payload) {
  var paramIds = require('./parameters').ids,
    /** @type {import('@pgmmv/agtk/object-instances/object-instance').AgtkObjectInstance|undefined} */
    objectInstance = dd.core.util.resolveSwitchVariableObject(
      payload.param[paramIds.objectInstanceMode],
      payload.instanceId
    ),
    /** @type {import("@pgmmv/agtk/constants/switch-variable-objects").AgtkSwitchVariableObjects['ProjectCommon']|import("@pgmmv/agtk/object-instances/object-instance").AgtkObjectInstance|undefined} */
    switchSource;

  if (!objectInstance) {
    dd.core.log
      .createActionCommandLogger(payload, 'AC_SAVE_SWITCH_001_NAME')
      .error(require('@dd/common').resolveLocaleKey('ERROR_OBJECT_INSTANCE_MISSING'));
    return Agtk.constants.actionCommands.commandBehavior.CommandBehaviorNext;
  }

  switchSource = dd.core.util.resolveSwitchVariableObject(payload.param[paramIds.switchSource], objectInstance.id);

  if (!switchSource) {
    dd.core.log
      .createActionCommandLogger(payload, 'AC_SAVE_SWITCH_001_NAME')
      .error(require('@dd/common').resolveLocaleKey('ERROR_SWITCH_SOURCE_MISSING'));
    return Agtk.constants.actionCommands.commandBehavior.CommandBehaviorNext;
  }

  // TODO

  return Agtk.constants.actionCommands.commandBehavior.CommandBehaviorNext;
};
