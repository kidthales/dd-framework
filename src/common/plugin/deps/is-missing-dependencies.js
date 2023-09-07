/**
 * Is missing dependencies module.
 *
 * @module dd/common/plugin/deps/is-missing-dependencies
 */

/**
 * @returns {boolean}
 */
module.exports = function () {
  var missing = require('./state').missing;

  if (!missing) {
    return false;
  }

  return !!missing.length;
};
