/**
 * Core plugin API utility resolve variable value module.
 *
 * @module    dd.core.util.resolveVariableValue
 * @author    kidthales <kidthales@agogpixel.com>
 * @copyright 2023 kidthales
 * @license   {@link https://github.com/kidthales/dd-framework/blob/main/LICENSE.txt | MIT License}
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
