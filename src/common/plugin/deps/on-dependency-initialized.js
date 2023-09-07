/**
 * On dependency initialized module.
 *
 * @module dd/common/plugin/deps/on-dependency-initialized
 */

/**
 * @param {string} identifier
 * @returns {void}
 */
module.exports = function (identifier) {
  var missing = require('./state').missing,
    /** @type {number|undefined} */
    index;

  if (!missing || !missing.length) {
    return;
  }

  index = missing.indexOf(identifier);

  if (index > -1) {
    missing.splice(index, 1);
  }
};
