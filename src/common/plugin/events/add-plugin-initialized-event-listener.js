/**
 * @module @dd/common/plugin/events/add-plugin-initialized-event-listener
 */

/**
 * Add a plugin initialized event listener.
 *
 * @param {Function} callback
 * @returns {import("@pgmmv/cc/event-listener").CCEventListener}
 */
module.exports = function (
  /** @type {Function} */
  callback
) {
  return cc.eventManager.addCustomListener(require('./constants').pluginInitializedEventName, callback);
};
