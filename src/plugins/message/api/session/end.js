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

  if (session.printingListener) {
    session.printer.eventManager.removeListener(session.printingListener);
    delete session.printingListener;
  }

  if (session.printFinishListener) {
    session.printer.eventManager.removeListener(session.printFinishListener);
    delete session.printFinishListener;
  }

  if (session.clearStartListener) {
    session.printer.eventManager.removeListener(session.clearStartListener);
    delete session.clearStartListener;
  }

  session.printer.eventManager.removeListener(session.clearFinishListener);
  delete session.clearFinishListener;

  session.printer.removeFromParent();
  delete session.printer;

  if (session.indicator) {
    session.indicator.removeFromParent();
    delete session.indicator;
  }

  delete require('./state')[require('./create-key')(objectInstance)];
};
