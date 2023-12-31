/**
 * Message plugin API print messages update session module.
 *
 * @internal
 * @module    @dd/message/print-messages/update-session
 * @author    kidthales <kidthales@agogpixel.com>
 * @copyright 2023 kidthales
 * @license   {@link https://github.com/kidthales/dd-framework/blob/main/LICENSE.txt | MIT License}
 */

/**
 * @internal
 * @param {import("@pgmmv/agtk/object-instances/object-instance").AgtkObjectInstance} objectInstance
 * @returns {import('@pgmmv/agtk/constants/action-commands/command-behavior').AgtkCommandBehavior['CommandBehaviorNext']|import('@pgmmv/agtk/constants/action-commands/command-behavior').AgtkCommandBehavior['CommandBehaviorBlock']}
 */
module.exports = function (objectInstance) {
  var session = require('../session/get')(objectInstance),
    /** @type {number|undefined} */
    dt;

  if (!session) {
    return Agtk.constants.actionCommands.commandBehavior.CommandBehaviorNext;
  }

  dt = cc.director.getDeltaTime();

  if (session.panel) {
    session.panel.update(dt);
  }

  if (session.printer.isPrinting()) {
    session.printingSfxTimeAccumulator += dt;
  }

  session.printer.update(dt);

  return Agtk.constants.actionCommands.commandBehavior.CommandBehaviorBlock;
};
