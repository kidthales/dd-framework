/**
 * Common plugin events dispatch plugin initialized event module.
 *
 * @module    @dd/common/plugin/events/dispatch-plugin-initialized-event
 * @author    kidthales <kidthales@agogpixel.com>
 * @copyright 2023 kidthales
 * @license   {@link https://github.com/kidthales/dd-framework/blob/main/LICENSE.txt | MIT License}
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
