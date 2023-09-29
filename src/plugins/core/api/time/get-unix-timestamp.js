/**
 * Core plugin API time get unix timestamp module.
 *
 * @module    dd.core.time.getUnixTimestamp
 * @author    kidthales <kidthales@agogpixel.com>
 * @copyright 2023 kidthales
 * @license   {@link https://github.com/kidthales/dd-framework/blob/main/LICENSE.txt | MIT License}
 */

/**
 * Get a unix timestamp (time in seconds since Unix epoch).
 *
 * @returns {number}
 */
module.exports = function () {
  return Math.round(+new Date() / 1000);
};
