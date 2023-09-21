/**
 * Event module.
 *
 * @module dd/core/event
 */

/**
 *
 */
module.exports = {
  addUpdateEventListener: require('./add-update-event-listener'),
  emitter: require('./emitter'),
  updateEventName: require('./constants').updateEventName
};
