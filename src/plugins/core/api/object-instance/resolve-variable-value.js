/**
 * Resolve variable value module.
 *
 * @module dd/core/object-instance/resolve-variable-value
 */

/**
 * Resolve to an object instance variable value.
 *
 * @param {import("./types").ObjectInstanceLike} objectInstanceLike
 * @param {string|number} variableNameOrId
 * @param {number|undefined} value
 * @returns {number|undefined}
 */
module.exports = function (objectInstanceLike, variableNameOrId, value) {
  var variable = require('./resolve-variable')(objectInstanceLike, variableNameOrId);

  if (!variable) {
    return;
  }

  if (value !== undefined) {
    variable.setValue(value);
    return value;
  }

  return variable.getValue();
};
