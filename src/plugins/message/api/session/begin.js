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

  session.printFinishListener = session.printer.eventManager.addCustomListener(
    dd.core.text.printer.constants.eventName.printFinish,
    function () {
      if (session.indicator && session.printer.getCurrentPageIndex() !== session.printer.getNumPages() - 1) {
        session.indicator.y = Math.floor(
          scaleY *
            (session.printer.y -
              session.printer.getChildByTag(session.printer._currentPage.text.length - 1).y -
              session.indicator.getContentSize().height / 4)
        );

        session.indicator.setColor(
          session.printer._currentPage.color ? session.printer._currentPage.color : cc.color(255, 255, 255)
        );

        session.indicator.opacity =
          session.printer._currentPage.opacity !== undefined ? session.printer._currentPage.opacity : 1;
      }
    }
  );

  session.clearStartListener = session.printer.eventManager.addCustomListener(
    dd.core.text.printer.constants.eventName.clearStart,
    function () {
      if (session.indicator) {
        session.indicator.opacity = 0;
      }
    }
  );

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
