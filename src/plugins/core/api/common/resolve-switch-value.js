/**
 * Core plugin API common resolve switch value module.
 *
 * @module    dd.core.common.resolveSwitchValue
 * @author    kidthales <kidthales@agogpixel.com>
 * @copyright 2023 kidthales
 * @license   {@link https://github.com/kidthales/dd-framework/blob/main/LICENSE.txt | MIT License}
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
