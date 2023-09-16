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

  session.printer.eventEmitter.on(
    dd.core.text.printer.constants.eventName.printing,
    function (
      /** @type {import("@pgmmv/cc/sprite").CCSprite|import("@pgmmv/cc/label-ttf").CCLabelTTF[]} */
      letters
    ) {
      // TODO: initial letter easing...

      if (config.printingSfxId !== Agtk.constants.actionCommands.UnsetObject) {
        if (session.printingSfxTimeAccumulator >= 0.25) {
          session.printingSfxTimeAccumulator = 0;
          objectInstance && objectInstance.execCommandSoundPlay({ seId: config.printingSfxId });
        }
      }
    }
  );

  session.printer.eventEmitter.on(dd.core.text.printer.constants.eventName.printFinish, function () {
    if (session.indicator && session.printer.getCurrentPageIndex() !== session.printer.getNumPages() - 1) {
      session.indicator.y = Math.floor(
        session.printer.getChildByTag(session.printer._currentPage.text.length - 1).convertToWorldSpace().y -
          scaleY * (session.indicator.getContentSize().height / 2)
      );

      session.indicator.setColor(
        session.printer._currentPage.color ? session.printer._currentPage.color : cc.color(255, 255, 255)
      );

      session.indicator.opacity =
        session.printer._currentPage.opacity !== undefined ? session.printer._currentPage.opacity : 255;
    }
  });

  session.printer.eventEmitter.on(dd.core.text.printer.constants.eventName.clearStart, function () {
    if (session.indicator) {
      session.indicator.opacity = 0;
    }
  });

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
