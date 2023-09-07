/**
 * Resolve variable value module.
 *
 * @module dd/core/util/resolve-variable-value
 */

/**
 * Resolve to a variable value.
 *
 * @param {import("./types").SwitchVariableSource} source
 * @param {string|number} nameOrId
 * @param {number|undefined} value
 * @returns {number|undefined}
 */
module.exports = function (source, nameOrId, value) {
  var variable = require('./resolve-variable')(source, nameOrId);

  if (!variable) {
    return;
  }

  if (value !== undefined) {
    variable.setValue(value);
    return value;
  }

  return variable.getValue();
};
