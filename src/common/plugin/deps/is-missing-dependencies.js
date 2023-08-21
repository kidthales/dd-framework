/**
 * @module @dd/common/plugin/deps/is-missing-dependencies
 */

/**
 * Test if current state has missing dependencies.
 *
 * @returns {boolean}
 */
module.exports = function () {
  var missing = require('./state').missing;

  if (!missing) {
    return false;
  }

  return !!missing.length;
};
