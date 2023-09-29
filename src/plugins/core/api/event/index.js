/**
 * Core plugin API event module.
 *
 * @module    dd.core.event
 * @author    kidthales <kidthales@agogpixel.com>
 * @copyright 2023 kidthales
 * @license   {@link https://github.com/kidthales/dd-framework/blob/main/LICENSE.txt | MIT License}
 */

/**
 * Exposes methods & properties for working with events.
 */
module.exports = {
  /**
   * {@linkcode "dd.core.event.addUpdateEventListener" | dd.core.event.addUpdateEventListener}
   */
  addUpdateEventListener: require('./add-update-event-listener'),

  /**
   * {@linkcode "dd.core.event.emitter" | dd.core.event.emitter}
   */
  emitter: require('./emitter'),

  /**
   * @see {@link "@dd/core/event/constants" | @dd/core/event/constants}
   */
  updateEventName: require('./constants').updateEventName
};
