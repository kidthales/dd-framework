/**
 * @param {import('@dd/common/plugin/types').ActionCommandPayload} payload
 * @returns {import('@pgmmv/agtk/constants/action-commands/command-behavior').AgtkCommandBehavior['CommandBehaviorNext']} Command behavior 'next'.
 */
module.exports = function handler(
  /** @type {import('@dd/common/plugin/types').ActionCommandPayload} */
  payload
) {
  var paramIds = require('./parameters').ids;

  switch (payload.param[paramIds.logLevel]) {
    case paramIds.logLevelDebug:
      require('../../api/log').debug(payload.param[paramIds.message]);
      break;
    case paramIds.logLevelWarn:
      require('../../api/log').warn(payload.param[paramIds.message]);
      break;
    case paramIds.logLevelError:
      require('../../api/log').error(payload.param[paramIds.message]);
      break;
    case paramIds.logLevelCritical:
      require('../../api/log').critical(payload.param[paramIds.message]);
      break;
    case paramIds.logLevelInfo:
    default:
      require('../../api/log').info(payload.param[paramIds.message]);
      break;
  }

  return Agtk.constants.actionCommands.commandBehavior.CommandBehaviorNext;
};
