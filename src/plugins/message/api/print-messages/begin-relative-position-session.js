/**
 * Begin relative position session module.
 *
 * @module dd/message/print-messages/begin-relative-position-session
 */

/**
 * Assumes parent layer will have origin (0,0) [bottom left].
 *
 * @param {import("@pgmmv/agtk/object-instances/object-instance").AgtkObjectInstance} objectInstance
 * @param {import("./types").PrintMessagesConfig & import("./types").RelativePosition} config
 * @returns {import("@dd/message/session/types").Session}
 */
module.exports = function (objectInstance, config) {
  var constantsApi = require('./constants'),
    session = require('./begin-session')(objectInstance, config),
    scaleX = config.scale !== undefined && config.scale.x !== undefined ? config.scale.x : 1,
    scaleY = config.scale !== undefined && config.scale.y !== undefined ? config.scale.y : 1,
    winSize = cc.director.getWinSize(),
    pageSize = session.printer.getContentSize(),
    indicatorSize = session.indicator ? session.indicator.getContentSize() : cc.size(0, 0);

  switch (config.horizontal) {
    case constantsApi.horizontalPosition.right:
      session.printer.x = winSize.width - (scaleX * pageSize.width) / 2;
      break;
    case constantsApi.horizontalPosition.center:
      session.printer.x = winSize.width / 2;
      break;
    case constantsApi.horizontalPosition.left:
    default:
      session.printer.x = (scaleX * pageSize.width) / 2;
      break;
  }

  session.printer.x += config.offset && config.offset.x !== undefined ? config.offset.x : 0;

  switch (config.vertical) {
    case constantsApi.verticalPosition.bottom:
      session.printer.y = scaleY * (pageSize.height / 2 + indicatorSize.height);
      break;
    case constantsApi.verticalPosition.center:
      session.printer.y = (winSize.height + scaleY * indicatorSize.height) / 2;
      break;
    case constantsApi.verticalPosition.top:
    default:
      session.printer.y = winSize.height - (scaleY * pageSize.height) / 2;
      break;
  }

  // Convert PGM y-axis direction.
  session.printer.y -= config.offset && config.offset.y !== undefined ? config.offset.y : 0;

  if (session.panel) {
    session.panel.setPosition(
      session.printer.x,
      session.printer.y - scaleY * (session.indicator ? session.indicator.getContentSize().height / 2 : 0)
    );
  }

  if (session.indicator) {
    session.indicator.setPosition(session.printer.x, session.printer.y);
  }

  return session;
};
