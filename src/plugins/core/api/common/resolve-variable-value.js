/**
 * Resolve variable value module.
 *
 * @module dd/core/common/resolve-variable-value
 */

/**
 * Resolve to a common variable value.
 *
 * @param {string|number} nameOrId
 * @param {number|undefined} value
 * @returns {number|undefined}
 */
module.exports = function (nameOrId, value) {
  var variable = require('./resolve-variable')(nameOrId);

  if (!variable) {
    return;
  }

  if (value !== undefined) {
    variable.setValue(value);
    return value;
  }

  return variable.getValue();
};
