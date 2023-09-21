/**
 * @module dd/common/plugin/events/dispatch-plugin-initialized-event
 */

/**
 * Dispatch plugin initialized event.
 *
 * @param {string} identifier
 * @returns {void}
 */
module.exports = function (
  /** @type {string} */
  identifier
) {
  cc.eventManager.dispatchCustomEvent(require('./constants').pluginInitializedEventName, identifier);
};
