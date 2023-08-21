/**
 * @module @dd/core/api/time/get-unix-timestamp
 */

/**
 * Get a unix timestamp (time in seconds since Unix epoch).
 *
 * @returns {number}
 */
module.exports = function () {
  return Math.round(+new Date() / 1000);
};
