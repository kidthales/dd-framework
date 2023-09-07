/**
 * Resolve switch value module.
 *
 * @module dd/core/util/resolve-switch-value
 */

/**
 * Resolve to a switch value.
 *
 * @param {import("./types").SwitchVariableSource} source
 * @param {string|number} nameOrId
 * @param {boolean|undefined} value
 * @returns {boolean|undefined}
 */
module.exports = function (source, nameOrId, value) {
  var swtch = require('./resolve-switch')(source, nameOrId);

  if (!swtch) {
    return;
  }

  if (value !== undefined) {
    swtch.setValue(value);
    return value;
  }

  return swtch.getValue();
};
