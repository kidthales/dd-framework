/**
 * Update interactive session module.
 *
 * @module dd/message/print-messages/update-interactive-session
 */

/**
 * @param {import("@pgmmv/agtk/object-instances/object-instance").AgtkObjectInstance} objectInstance
 * @param {import("./types").Interactive} config
 * @returns {import('@pgmmv/agtk/constants/action-commands/command-behavior').AgtkCommandBehavior['CommandBehaviorNext']|import('@pgmmv/agtk/constants/action-commands/command-behavior').AgtkCommandBehavior['CommandBehaviorBlock']}
 */
module.exports = function (objectInstance, config) {
  var session = require('../session/get')(objectInstance);

  if (!session) {
    return Agtk.constants.actionCommands.commandBehavior.CommandBehaviorNext;
  }

  if (config.cancelSwitch && config.cancelSwitch.getValue()) {
    config.cancelSwitch.setValue(false);
    session.printer._cancel();
    session.done = true;
  }

  if (session.done) {
    require('../session/end')(objectInstance);
    return Agtk.constants.actionCommands.commandBehavior.CommandBehaviorNext;
  }

  if (config.canExpedite && session.printer.isPrinting() && config.okSwitch.getValue()) {
    config.okSwitch.setValue(false);
    session.printer._currentPage.printSpeed = Number.MAX_SAFE_INTEGER;
  } else if (session.printer.isEnd() && config.okSwitch.getValue()) {
    config.okSwitch.setValue(false);
    session.printer.clear();
  }

  return require('./update-session')(objectInstance);
};
