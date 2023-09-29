/**
 * Message plugin API session begin module.
 *
 * @module    dd.message.session.begin
 * @author    kidthales <kidthales@agogpixel.com>
 * @copyright 2023 kidthales
 * @license   {@link https://github.com/kidthales/dd-framework/blob/main/LICENSE.txt | MIT License}
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
    printer: dd.core.ui.text.printer.create(),
    printingSfxTimeAccumulator: 0
  };

  session.printer.eventEmitter.on(dd.core.ui.text.printer.constants.eventName.clearFinish, function () {
    var ix = session.printer.getCurrentPageIndex() + 1;

    if (ix === session.printer.getNumPages()) {
      if (session.panel) {
        session.panel.eventEmitter.once(dd.core.ui.openClose.constants.eventName.closeFinish, function () {
          session.done = true;
        });

        session.panel.close();
      } else {
        session.done = true;
      }

      return;
    }

    session.printer.print(ix);
  });

  return (require('./state')[require('./create-key')(objectInstance)] = session);
};
