/**
 * Get code module.
 *
 * @module dd/common/locale/get-code
 */

/**
 * @returns {string | undefined}
 */
module.exports = function () {
  return require('./state').code;
};
