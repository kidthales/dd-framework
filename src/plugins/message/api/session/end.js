/**
 * Message plugin API session end module.
 *
 * @module    dd.message.session.end
 * @author    kidthales <kidthales@agogpixel.com>
 * @copyright 2023 kidthales
 * @license   {@link https://github.com/kidthales/dd-framework/blob/main/LICENSE.txt | MIT License}
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
