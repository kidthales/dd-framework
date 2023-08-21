/**
 * @module @dd/common/plugin/deps/set-dependencies
 */

/**
 * Set plugin dependencies.
 *
 * @param {string[]} dependencies
 * @returns {void}
 */
module.exports = function (
  /** @type {string[]} */
  dependencies
) {
  var ns = require('../constants').frameworkNamespace,
    state = require('./state'),
    len = dependencies.length,
    /** @type {number|undefined} */
    i;

  state.dependencies = dependencies;
  state.missing = [];

  for (i = 0; i < len; ++i) {
    // eslint-disable-next-line no-prototype-builtins
    if (!(window[ns] && window[ns].hasOwnProperty(dependencies[i]))) {
      state.missing.push(dependencies[i]);
    }
  }
};
