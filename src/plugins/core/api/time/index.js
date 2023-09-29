/**
 * Core plugin API time module.
 *
 * @module    dd.core.time
 * @author    kidthales <kidthales@agogpixel.com>
 * @copyright 2023 kidthales
 * @license   {@link https://github.com/kidthales/dd-framework/blob/main/LICENSE.txt | MIT License}
 */

/**
 * Exposes methods for working with time & timers.
 */
module.exports = {
  /**
   * {@linkcode "dd.core.time.getUnixTimestamp" | dd.core.time.getUnixTimestamp}
   */
  getUnixTimestamp: require('./get-unix-timestamp'),

  /**
   * {@linkcode "dd.core.time.pollWithBackOff" | dd.core.time.pollWithBackOff}
   */
  pollWithBackOff: require('./poll-with-back-off'),

  /**
   * {@linkcode "dd.core.time.pollWithInterval" | dd.core.time.pollWithInterval}
   */
  pollWithInterval: require('./poll-with-interval')
};
