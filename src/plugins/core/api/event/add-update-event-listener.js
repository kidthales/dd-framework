/**
 * @module @dd/core/api/event/add-update-event-listener
 */

/**
 * Add an update event listener.
 *
 * @param {Function} callback
 * @returns {import("@pgmmv/cc/event-listener").CCEventListener}
 */
module.exports = function (
  /** @type {Function} */
  callback
) {
  return cc.eventManager.addCustomListener(require('./constants').updateEventName, callback);
};
