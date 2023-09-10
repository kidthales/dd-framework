/**
 * Handler module.
 *
 * @module
 */

/**
 * @param {import('@dd/common/plugin/types').ActionCommandPayload} payload
 * @returns {import('@pgmmv/agtk/constants/action-commands/command-behavior').AgtkCommandBehavior['CommandBehaviorNext']|import('@pgmmv/agtk/constants/action-commands/command-behavior').AgtkCommandBehavior['CommandBehaviorBlock']} Command behavior 'next' or 'block'.
 */
module.exports = function handler(payload) {
  var paramIds = require('./parameters').ids,
    /** @type {import('@pgmmv/agtk/object-instances/object-instance').AgtkObjectInstance|undefined} */
    objectInstance = dd.core.util.resolveSwitchVariableObject(
      payload.param[paramIds.objectInstanceMode],
      payload.instanceId
    ),
    /** @type {import('@pgmmv/agtk/switches/switch').AgtkSwitch|import('@pgmmv/agtk/object-instances/object-instance/switches/switch').AgtkSwitch|undefined} */
    okSwitch,
    /** @type {import('@dd/message/session/types').Session} */
    session,
    /** @type {import('@dd/message/print-messages/types').MessageUnion[]|undefined} */
    messages,
    /** @type {import('@pgmmv/cc/node').CCNode} */
    hudLayer;

  if (!objectInstance) {
    dd.core.log.error(require('@dd/common').resolveLocaleKey('ERROR_AC_PRINT_MESSAGES_001_OBJECT_INSTANCE_MISSING'));
    return Agtk.constants.actionCommands.commandBehavior.CommandBehaviorNext;
  }

  okSwitch = dd.core.util.resolveVariableFromSwitchVariableObject(
    payload.param[paramIds.okSwitchSource],
    payload.param[paramIds.okSwitch],
    objectInstance.id
  );

  if (!okSwitch) {
    dd.core.log.error(require('@dd/common').resolveLocaleKey('ERROR_AC_PRINT_MESSAGES_001_OK_SWITCH_MISSING'));
    return Agtk.constants.actionCommands.commandBehavior.CommandBehaviorNext;
  }

  if (require('../../api/session/has')(objectInstance)) {
    // Session exists.
    return require('../../api/print-messages/update-interactive-session')(objectInstance, {
      okSwitch: okSwitch,
      cancelSwitch: dd.core.util.resolveVariableFromSwitchVariableObject(
        payload.param[paramIds.cancelSwitchSource],
        payload.param[paramIds.cancelSwitch],
        objectInstance.id
      ),
      canExpedite: payload.param[paramIds.expedite] === paramIds.expediteTrue
    });
  }

  messages = JSON.parse(payload.param[paramIds.messages]);

  if (!Array.isArray(messages) || !messages.length) {
    dd.core.log.error(require('@dd/common').resolveLocaleKey('ERROR_AC_PRINT_MESSAGES_001_MESSAGES_INVALID'));
    return Agtk.constants.actionCommands.commandBehavior.CommandBehaviorNext;
  }

  // New session.
  session = require('../../api/print-messages/begin-relative-position-session')(objectInstance, {
    messages: messages,
    overrideFont: dd.core.font.getFontData(payload.param[paramIds.overrideFont]),
    printingSfxId: payload.param[paramIds.printingSfx],
    indicator: {
      imageId: payload.param[paramIds.indicatorImage],
      frame: cc.rect(
        payload.param[paramIds.indicatorImageFrameX],
        payload.param[paramIds.indicatorImageFrameY],
        payload.param[paramIds.indicatorImageFrameWidth],
        payload.param[paramIds.indicatorImageFrameHeight]
      )
    },
    scale: cc.p(payload.param[paramIds.scaleX] / 100, payload.param[paramIds.scaleY] / 100),
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
    opacity: payload.param[paramIds.opacity] !== 1 ? payload.param[paramIds.opacity] : undefined,
    horizontal: payload.param[paramIds.horizontalPosition],
    vertical: payload.param[paramIds.verticalPosition],
    offset: cc.p(payload.param[paramIds.offsetX], payload.param[paramIds.offsetY])
  });

  hudLayer = Agtk.sceneInstances.getCurrent().getMenuLayerById(Agtk.constants.systemLayers.HudLayerId);

  hudLayer.addChild(session.printer);

  if (session.indicator) {
    hudLayer.addChild(session.indicator);
  }

  if (session.printer._job.pages.length) {
    // Print the first page.
    session.printer.print(0);
  } else {
    // No valid pages available to display; end session on next update.
    dd.core.log.error(require('@dd/common').resolveLocaleKey('ERROR_AC_PRINT_MESSAGES_001_PAGES_INVALID'));
    session.done = true;
  }

  return Agtk.constants.actionCommands.commandBehavior.CommandBehaviorBlock;
};
