/**
 * Core plugin API event add update event listener module.
 *
 * @module    dd.core.event.addUpdateEventListener
 * @author    kidthales <kidthales@agogpixel.com>
 * @copyright 2023 kidthales
 * @license   {@link https://github.com/kidthales/dd-framework/blob/main/LICENSE.txt | MIT License}
 */

/**
 * Add an update event listener.
 *
 * @param {Function} callback
 * @returns {import("@pgmmv/cc/event-listener").CCEventListener}
 */
module.exports = function (callback) {
  return cc.eventManager.addCustomListener(require('./constants').updateEventName, callback);
};
