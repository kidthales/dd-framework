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
    scaleY = config.scale !== undefined && config.scale.y !== undefined ? config.scale.y : 1,
    /** @type {number} */
    borderThicknessLeftRight = 0,
    /** @type {number} */
    borderThicknessTopBottom = 0,
    /** @type {import("@pgmmv/cc/size").CCSize|undefined} */
    panelSize;

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

  if (config.background) {
    switch (config.background.renderType) {
      case 'image':
        borderThicknessLeftRight = config.background.capInsetRect.x;
        borderThicknessTopBottom = config.background.capInsetRect.y;
        break;
      case 'graphics':
        borderThicknessLeftRight = borderThicknessTopBottom = config.background.borderThickness;
        break;
      default:
        break;
    }

    panelSize = cc.size(
      scaleX * session.printer.width + 2 * borderThicknessLeftRight,
      scaleY * (session.printer.height + (session.indicator ? session.indicator.getContentSize().height : 0)) +
        2 * borderThicknessTopBottom
    );

    switch (config.background.renderType) {
      case 'graphics':
        session.panel = dd.core.ui.panel.create({
          renderType: 'graphics',
          size: panelSize,
          openCloseDelta: config.background.openCloseDelta,
          startClosed: true,
          backgroundColor: config.background.backgroundColor,
          borderColor: config.background.borderColor,
          borderThickness: config.background.borderThickness
        });
        break;
      case 'image':
        session.panel = dd.core.ui.panel.create({
          renderType: 'image',
          size: panelSize,
          openCloseDelta: config.background.openCloseDelta,
          startClosed: true,
          texture: dd.core.util.resolveTexture(config.background.imageId),
          textureFrame: config.background.imageFrame,
          capInsetRect: config.background.capInsetRect
        });
        break;
      default:
        break;
    }

    if (session.panel) {
      session.panel.opacity = config.background.opacity;
    }
  }

  session.printer.eventEmitter.on(
    dd.core.ui.text.printer.constants.eventName.printing,
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

  session.printer.eventEmitter.on(dd.core.ui.text.printer.constants.eventName.printFinish, function () {
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

  session.printer.eventEmitter.on(dd.core.ui.text.printer.constants.eventName.clearStart, function () {
    if (session.indicator) {
      session.indicator.opacity = 0;
    }
  });

  if (session.panel) {
    session.panel.eventEmitter.once(dd.core.ui.openClose.constants.eventName.openFinish, function () {
      session.printer.print(0);
    });

    session.printer.eventEmitter.on(dd.core.ui.text.printer.constants.eventName.clearFinish, function () {
      if (session.printer.getCurrentPageIndex() === session.printer.getNumPages()) {
        session.panel.close();
      }
    });
  }

  return session;
};
