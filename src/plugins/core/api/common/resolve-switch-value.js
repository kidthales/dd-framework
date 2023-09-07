/**
 * Resolve switch value module.
 *
 * @module dd/core/common/resolve-switch-value
 */

/**
 * Resolve to a common switch value.
 *
 * @param {string|number} nameOrId
 * @param {boolean|undefined} value
 * @returns {boolean|undefined}
 */
module.exports = function (nameOrId, value) {
  var swtch = require('./resolve-switch')(nameOrId);

  if (!swtch) {
    return;
  }

  if (value !== undefined) {
    swtch.setValue(value);
    return value;
  }

  return swtch.getValue();
};
