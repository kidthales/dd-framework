/**
 * @param {import('@dd/common/plugin/types').ActionCommandPayload} payload
 * @returns {import('@pgmmv/agtk/constants/action-commands/command-behavior').AgtkCommandBehavior['CommandBehaviorNext']|import('@pgmmv/agtk/constants/action-commands/command-behavior').AgtkCommandBehavior['CommandBehaviorBlock']} Command behavior 'next' or 'block'.
 */
module.exports = function handler(
  /** @type {import('@dd/common/plugin/types').ActionCommandPayload} */
  payload
) {
  var sessionApi = require('../../api/session'),
    paramIds = require('./parameters').ids,
    /** @type {import('@pgmmv/agtk/object-instances/object-instance').AgtkObjectInstance|undefined} */
    objectInstance = dd.core.util.resolveSwitchVariableObject(
      payload.param[paramIds.objectInstanceMode],
      payload.instanceId
    ),
    /** @type {import('@pgmmv/agtk/switches/switch').AgtkSwitch|import('@pgmmv/agtk/object-instances/object-instance/switches/switch').AgtkSwitch|undefined} */
    okSwitch,
    /** @type {import('@dd/message/api/session/types').Session} */
    session,
    /** @type {import('@pgmmv/agtk/switches/switch').AgtkSwitch|import('@pgmmv/agtk/object-instances/object-instance/switches/switch').AgtkSwitch|undefined} */
    cancelSwitch,
    /** @type {number} */
    dt,
    /** @type {(number|{id: number; align?: Partial<import('@dd/core/api/text/printer/types').TextAlignmentConfig>; printSpeed?: number; clearSpeed?: number; color?: [number, number, number]; opacity?: number; })[]|undefined} */
    messages,
    /** @type {import('@dd/core/api/font/types').FontData|undefined} */
    fontData,
    /** @type {number[]|undefined} */
    letterHeights,
    /** @type {import('@dd/core/api/text/printer/types').PageConfig[]|undefined} */
    pages,
    /** @type {import('@dd/core/api/text/printer/types').JobConfig|undefined} */
    jobConfig,
    /** @type {number|undefined} */
    scaleX,
    /** @type {number|undefined} */
    scaleY,
    /** @type {import('@pgmmv/cc/size').CCSize|undefined} */
    indicatorSize,
    /** @type {import('@pgmmv/agtk/images/image').AgtkImage|undefined} */
    indicatorImage,
    /** @type {import('@pgmmv/cc/texture-2d').CCTexture2D|undefined} */
    indicatorTexture,
    /** @type {import('@pgmmv/cc/size').CCSize|undefined} */
    winSize,
    /** @type {import('@pgmmv/cc/size').CCSize|undefined} */
    pageSize,
    /** @type {import('@pgmmv/cc/node').CCNode} */
    hudLayer;

  if (!objectInstance) {
    // TODO: log error...
    return Agtk.constants.actionCommands.commandBehavior.CommandBehaviorNext;
  }

  okSwitch = dd.core.util.resolveVariableFromSwitchVariableObject(
    payload.param[paramIds.okSwitchSource],
    payload.param[paramIds.okSwitch],
    objectInstance.id
  );

  if (!okSwitch) {
    // TODO: log error...
    return Agtk.constants.actionCommands.commandBehavior.CommandBehaviorNext;
  }

  session = sessionApi.get(objectInstance);

  if (session) {
    cancelSwitch = dd.core.util.resolveVariableFromSwitchVariableObject(
      payload.param[paramIds.cancelSwitchSource],
      payload.param[paramIds.cancelSwitch],
      objectInstance.id
    );

    if (cancelSwitch && cancelSwitch.getValue()) {
      cancelSwitch.setValue(false);
      session.printer._cancel();
      session.done = true;
    }

    if (session.done) {
      if (session.printingListener) {
        session.printer.eventManager.removeListener(session.printingListener);
        delete session.printingListener;
      }

      session.printer.eventManager.removeListener(session.printFinishListener);
      delete session.printFinishListener;

      session.printer.eventManager.removeListener(session.clearFinishListener);
      delete session.clearFinishListener;

      session.printer.removeFromParent();
      delete session.printer;

      session.indicator.removeFromParent();
      delete session.indicator;

      sessionApi.set(objectInstance, undefined);

      return Agtk.constants.actionCommands.commandBehavior.CommandBehaviorNext;
    }

    if (
      payload.param[paramIds.expedite] === paramIds.expediteTrue &&
      session.printer.isPrinting() &&
      okSwitch.getValue()
    ) {
      okSwitch.setValue(false);
      session.printer._currentPage.printSpeed = Number.MAX_SAFE_INTEGER;
    }

    if (session.printer.isEnd() && okSwitch.getValue()) {
      okSwitch.setValue(false);
      session.printer.clear();
    }

    dt = cc.director.getSecondsPerFrame();
    session.printingSfxTimeAccumulator += dt;
    session.printer.update(dt);

    return Agtk.constants.actionCommands.commandBehavior.CommandBehaviorBlock;
  }

  // Process params and start blocking.

  messages = JSON.parse(payload.param[paramIds.messages]);

  if (!Array.isArray(messages) || !messages.length) {
    // TODO: log warning...
    return Agtk.constants.actionCommands.commandBehavior.CommandBehaviorNext;
  }

  fontData = dd.core.font.getFontData(payload.param[paramIds.overrideFont]);

  pages = messages
    .map(function (value) {
      var text = dd.core.text.getTextData(typeof value === 'number' ? value : value.id),
        /** @type {Partial<import('@dd/core/api/text/printer/types').TextAlignmentConfig>|undefined} */
        align,
        /** @type {number|undefined} */
        printSpeed,
        /** @type {number|undefined} */
        clearSpeed,
        /** @type {[number, number, number]|undefined} */
        color,
        /** @type {number|undefined} */
        opacity;

      if (!text) {
        return;
      }

      text.font = text.font || fontData;

      if (!text.font) {
        return;
      }

      // Average letter height for indicator sizing.
      letterHeights.push(text.font.letterHeight);

      if (typeof value !== 'number') {
        align = value.align || undefined;
        printSpeed = value.printSpeed || undefined;
        clearSpeed = value.clearSpeed || undefined;
        opacity = value.opacity !== undefined ? value.opacity : undefined;

        if (
          Array.isArray(value.color) &&
          value.color.length >= 3 &&
          (value.color[0] !== 255 || value.color[1] !== 255 || value.color[2] !== 255)
        ) {
          color = cc.color(value.color[0], value.color[0], value.color[0]);
        }
      }

      return {
        text: text,
        align: align,
        printSpeed: printSpeed,
        clearSpeed: clearSpeed,
        color: color,
        opacity: opacity
      };
    })
    .filter(Boolean);

  if (!pages.length) {
    // TODO: log warning...
    return Agtk.constants.actionCommands.commandBehavior.CommandBehaviorNext;
  }

  jobConfig = {
    pages: pages,
    layout: {
      margin: {
        left: payload.param[paramIds.marginLeft],
        right: payload.param[paramIds.marginRight],
        top: payload.param[paramIds.marginTop],
        bottom: payload.param[paramIds.marginBottom]
      },
      align: {
        horizontal: payload.param[paramIds.horizontalTextAlign],
        vertical: payload.param[paramIds.verticalTextAlign]
      }
    },
    printSpeed: payload.param[paramIds.printSpeed] || undefined,
    clearSpeed: payload.param[paramIds.clearSpeed] || undefined,
    color:
      payload.param[paramIds.colorChannelRed] !== 255 ||
      payload.param[paramIds.colorChannelGreen] !== 255 ||
      payload.param[paramIds.colorChannelBlue] !== 255
        ? cc.color(
            payload.param[paramIds.colorChannelRed],
            payload.param[paramIds.colorChannelGreen],
            payload.param[paramIds.colorChannelBlue]
          )
        : undefined,
    opacity: payload.param[paramIds.opacity] !== 1 ? payload.param[paramIds.opacity] : undefined
  };

  session = {
    printer: dd.core.text.printer.create(),
    printingSfxTimeAccumulator: 0
  };

  if (payload.param[paramIds.indicatorImage] !== Agtk.constants.actionCommands.UnsetObject) {
    indicatorImage = Agtk.images.get(payload.param[paramIds.indicatorImage]);

    if (indicatorImage) {
      indicatorTexture = cc.textureCache.addImage(indicatorImage.filename);
      indicatorTexture.setAliasTexParameters();

      session.indicator = new cc.Sprite(
        indicatorTexture,
        cc.rect(
          payload.param[paramIds.indicatorImageFrameX],
          payload.param[paramIds.indicatorImageFrameY],
          payload.param[paramIds.indicatorImageFrameWidth],
          payload.param[paramIds.indicatorImageFrameHeight]
        )
      );

      indicatorSize = session.indicator.getContentSize();

      session.indicator.setScale(scaleX, scaleY);

      session.indicator.opacity = 0;
    }
  }

  if (!session.indicator) {
    indicatorSize = cc.size(
      Math.round(
        letterHeights.reduce(function (previousValue, currentValue) {
          return previousValue + currentValue;
        }, 0) / letterHeights.length
      )
    );

    indicatorSize.height = indicatorSize.width;

    session.indicator = new cc.DrawNode();
    session.indicator.drawPoly_(
      [
        cc.p(0, -indicatorSize.height / 4),
        cc.p(-indicatorSize.width / 2, indicatorSize.height / 4),
        cc.p(indicatorSize.width / 2, indicatorSize.height / 4),
        cc.p(0, -indicatorSize.height / 4)
      ],
      cc.color(255, 255, 255),
      0
    );
  }

  if (payload.param[paramIds.printingSfx] !== Agtk.constants.actionCommands.UnsetObject) {
    session.printingListener = session.printer.eventManager.addCustomListener(
      dd.core.text.printer.constants.eventName.printing,
      function (
        /** @type {import('@pgmmv/cc/event-custom').CCEventCustom} */
        ev
      ) {
        // TODO: initial letter easing...
        /** @type {(import('@pgmmv/cc/sprite').CCSprite|import('@pgmmv/cc/label-ttf').CCLabelTTF)[]} */
        var letters = ev.getUserData();

        if (session.printingSfxTimeAccumulator >= 0.25) {
          session.printingSfxTimeAccumulator = 0;
          objectInstance && objectInstance.execCommandSoundPlay({ seId: payload.param[paramIds.printingSfx] });
        }
      }
    );
  }

  session.printFinishListener = session.printer.eventManager.addCustomListener(
    dd.core.text.printer.constants.eventName.printFinish,
    function () {
      if (session.printer.getCurrentPageIndex() === session.printer.getNumPages() - 1) {
        // Last page, don't display indicator.
        return;
      }

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
  );

  session.clearFinishListener = session.printer.eventManager.addCustomListener(
    dd.core.text.printer.constants.eventName.clearFinish,
    function () {
      var ix = session.printer.getCurrentPageIndex() + 1;

      if (ix === session.printer.getNumPages()) {
        session.done = true;
        return;
      }

      session.indicator.opacity = 0;

      session.printer.print(ix);
    }
  );

  session.printer.setJob(jobConfig);

  scaleX = payload.param[paramIds.scaleX] / 100;
  scaleY = payload.param[paramIds.scaleY] / 100;

  session.printer.setScale(scaleX, scaleY);

  winSize = cc.director.getWinSize();
  pageSize = session.printer.getContentSize();

  switch (payload.param[paramIds.horizontalPosition]) {
    case paramIds.horizontalPositionRight:
      session.printer.x = winSize.width / 2 - (scaleX * pageSize.width) / 2;
      break;
    case paramIds.horizontalPositionCenter:
      session.printer.x = 0;
      break;
    case paramIds.horizontalPositionLeft:
    default:
      session.printer.x = -winSize.width / 2 + (scaleX * pageSize.width) / 2;
      break;
  }

  switch (payload.param[paramIds.verticalPosition]) {
    case paramIds.verticalPositionBottom:
      session.printer.y = -winSize.height / 2 + (scaleY * (pageSize.height + 1.5 * indicatorSize.height)) / 2;
      break;
    case paramIds.verticalPositionCenter:
      session.printer.y = (scaleY * 1.5 * indicatorSize.height) / 2;
      break;
    case paramIds.verticalPositionTop:
    default:
      session.printer.y = winSize.height / 2 - (scaleY * (pageSize.height + 1.5 * indicatorSize.height)) / 2;
      break;
  }

  session.indicator.setPosition(session.printer.getPosition());

  hudLayer = Agtk.sceneInstances.getCurrent().getMenuLayerById(Agtk.constants.systemLayers.HudLayerId);
  hudLayer.addChild(session.printer);
  hudLayer.addChild(session.indicator);

  session.printer.print(0);

  sessionApi.set(objectInstance, session);

  return Agtk.constants.actionCommands.commandBehavior.CommandBehaviorBlock;
};
