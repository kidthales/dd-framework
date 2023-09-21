/**
 * Handler module.
 *
 * @module
 */

/**
 * @param {import('@dd/common/plugin/types').ActionCommandPayload} payload
 * @returns {import('@pgmmv/agtk/constants/action-commands/command-behavior').AgtkCommandBehavior['CommandBehaviorNext']} Command behavior 'next'.
 */
module.exports = function handler(payload) {
  var paramIds = require('./parameters').ids,
    objectInstance = require('../../api/util/resolve-switch-variable-object')(
      payload.param[paramIds.objectInstanceMode],
      payload.instanceId
    );

  if (objectInstance) {
    require('../../api/object-instance/snap-to-tile')(objectInstance, payload.param[paramIds.tileOriginX], null);
  } else {
    require('../../api/log')
      .createActionCommandLogger(payload, 'AC_SNAP_IN_TILE_002_NAME')
      .error(require('@dd/common').resolveLocaleKey('ERROR_OBJECT_INSTANCE_MISSING'));
  }

  return Agtk.constants.actionCommands.commandBehavior.CommandBehaviorNext;
};
