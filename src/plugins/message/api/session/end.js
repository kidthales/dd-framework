/**
 * End module.
 *
 * @module dd/message/session/end
 */

/**
 * @param {import("@pgmmv/agtk/object-instances/object-instance").AgtkObjectInstance} objectInstance
 * @returns {void}
 */
module.exports = function (objectInstance) {
  var session = require('./get')(objectInstance);

  if (!session) {
    return;
  }

  if (session.panel) {
    session.panel.eventEmitter.removeAllListeners();
    session.panel.removeFromParent();
    delete session.panel;
  }

  session.printer.eventEmitter.removeAllListeners();
  session.printer.removeFromParent();
  delete session.printer;

  if (session.indicator) {
    session.indicator.removeFromParent();
    delete session.indicator;
  }

  delete require('./state')[require('./create-key')(objectInstance)];
};
