/**
 * Set dependencies module.
 *
 * @module dd/common/plugin/deps/set-dependencies
 */

/**
 * @param {string[]} dependencies
 * @returns {void}
 */
module.exports = function (dependencies) {
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
