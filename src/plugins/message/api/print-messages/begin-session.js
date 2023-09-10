/**
 * Begin session module.
 *
 * @module dd/message/print-messages/begin-session
 * @internal
 */

/**
 * @param {import("@pgmmv/agtk/object-instances/object-instance").AgtkObjectInstance} objectInstance
 * @param {import("./types").PrintMessagesConfig} config
 * @returns {import("@dd/message/session/types").Session}
 */
module.exports = function (objectInstance, config) {
  var session = require('../session/begin')(objectInstance),
    scaleX = config.scale !== undefined && config.scale.x !== undefined ? config.scale.x : 1,
    scaleY = config.scale !== undefined && config.scale.y !== undefined ? config.scale.y : 1;

  session.printer.setScale(scaleX, scaleY);

  session.printer.setJob({
    pages: require('./transform-messages')(config.messages).filter(function (page) {
      return !!(page.text.font = config.overrideFont || page.text.font);
    }),
    layout: config.layout,
    printSpeed: config.printSpeed,
    clearSpeed: config.clearSpeed,
    color: config.color,
    opacity: config.opacity
  });

  session.printingListener = session.printer.eventManager.addCustomListener(
    dd.core.text.printer.constants.eventName.printing,
    function (
      /** @type {import('@pgmmv/cc/event-custom').CCEventCustom} */
      ev
    ) {
      // TODO: initial letter easing...
      /** @type {(import('@pgmmv/cc/sprite').CCSprite|import('@pgmmv/cc/label-ttf').CCLabelTTF)[]} */
      var letters = ev.getUserData();

      if (config.printingSfxId !== Agtk.constants.actionCommands.UnsetObject) {
        if (session.printingSfxTimeAccumulator >= 0.25) {
          session.printingSfxTimeAccumulator = 0;
          objectInstance && objectInstance.execCommandSoundPlay({ seId: config.printingSfxId });
        }
      }
    }
  );

  if (config.indicator) {
    session.indicator = require('./create-indicator')({
      imageId: config.indicator.imageId,
      frame: cc.rect(
        config.indicator.frame.x,
        config.indicator.frame.y,
        config.indicator.frame.width,
        config.indicator.frame.height
      )
    });

    session.indicator.setScale(scaleX, scaleY);

    session.indicator.opacity = 0;
  }

  return session;
};
