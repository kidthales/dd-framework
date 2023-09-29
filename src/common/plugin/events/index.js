/**
 * Common plugin events module.
 *
 * @module    @dd/common/plugin/events
 * @author    kidthales <kidthales@agogpixel.com>
 * @copyright 2023 kidthales
 * @license   {@link https://github.com/kidthales/dd-framework/blob/main/LICENSE.txt | MIT License}
 */

/**
 * Exposes methods for basic plugin initialization event management.
 */
module.exports = {
  /**
   * @see {@link "@dd/common/plugin/events/add-plugin-initialized-event-listener" | @dd/common/plugin/events/add-plugin-initialized-event-listener}
   */
  addPluginInitializedEventListener: require('./add-plugin-initialized-event-listener'),

  /**
   * @see {@link "@dd/common/plugin/events/dispatch-plugin-initialized-event" | @dd/common/plugin/events/dispatch-plugin-initialized-event}
   */
  dispatchPluginInitializedEvent: require('./dispatch-plugin-initialized-event')
};
