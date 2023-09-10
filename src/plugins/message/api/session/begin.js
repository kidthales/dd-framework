/**
 * Begin module.
 *
 * @module dd/message/session/begin
 */

/**
 * @param {import("@pgmmv/agtk/object-instances/object-instance").AgtkObjectInstance} objectInstance
 * @returns {import("./types").Session}
 */
module.exports = function (objectInstance) {
  var session = require('./get')(objectInstance);

  if (session) {
    require('./end')(objectInstance);
  }

  session = {
    printer: dd.core.text.printer.create(),
    printingSfxTimeAccumulator: 0
  };

  session.clearFinishListener = session.printer.eventManager.addCustomListener(
    dd.core.text.printer.constants.eventName.clearFinish,
    function () {
      var ix = session.printer.getCurrentPageIndex() + 1;

      if (ix === session.printer.getNumPages()) {
        session.done = true;
        return;
      }

      session.printer.print(ix);
    }
  );

  return (require('./state')[require('./create-key')(objectInstance)] = session);
};
