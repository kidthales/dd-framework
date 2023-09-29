/**
 * Core plugin API common resolve variable value module.
 *
 * @module    dd.core.common.resolveVariableValue
 * @author    kidthales <kidthales@agogpixel.com>
 * @copyright 2023 kidthales
 * @license   {@link https://github.com/kidthales/dd-framework/blob/main/LICENSE.txt | MIT License}
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
