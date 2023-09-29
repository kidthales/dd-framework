/**
 * Core plugin API utility resolve switch value module.
 *
 * @module    dd.core.util.resolveSwitchValue
 * @author    kidthales <kidthales@agogpixel.com>
 * @copyright 2023 kidthales
 * @license   {@link https://github.com/kidthales/dd-framework/blob/main/LICENSE.txt | MIT License}
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
