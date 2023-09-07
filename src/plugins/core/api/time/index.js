/**
 * Time module.
 *
 * @module dd/core/time
 */

/**
 *
 */
module.exports = {
  getUnixTimestamp: require('./get-unix-timestamp'),
  pollWithBackOff: require('./poll-with-back-off'),
  pollWithInterval: require('./poll-with-interval')
};
