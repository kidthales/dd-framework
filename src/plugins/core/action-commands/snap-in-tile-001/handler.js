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
    require('../../api/object-instance/snap-to-tile')(
      objectInstance,
      payload.param[paramIds.tileOriginX],
      payload.param[paramIds.tileOriginY]
    );
  }

  return Agtk.constants.actionCommands.commandBehavior.CommandBehaviorNext;
};
