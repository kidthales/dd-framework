/**
 * Set code module.
 *
 * @module dd/common/locale/set-code
 */

/**
 * @param {string} code
 * @returns {void}
 */
module.exports = function (code) {
  require('./state').code = code;
};
