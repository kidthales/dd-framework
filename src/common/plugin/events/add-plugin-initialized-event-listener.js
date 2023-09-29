/**
 * Common plugin events add plugin initialized event listener module.
 *
 * @module    @dd/common/plugin/events/add-plugin-initialized-event-listener
 * @author    kidthales <kidthales@agogpixel.com>
 * @copyright 2023 kidthales
 * @license   {@link https://github.com/kidthales/dd-framework/blob/main/LICENSE.txt | MIT License}
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
