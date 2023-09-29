/**
 * Core plugin API object instance resolve variable value module.
 *
 * @module    dd.core.objectInstance.resolveVariableValue
 * @author    kidthales <kidthales@agogpixel.com>
 * @copyright 2023 kidthales
 * @license   {@link https://github.com/kidthales/dd-framework/blob/main/LICENSE.txt | MIT License}
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
