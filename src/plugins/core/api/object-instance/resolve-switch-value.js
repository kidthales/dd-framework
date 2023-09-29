/**
 * Core plugin API object instance resolve switch value module.
 *
 * @module    dd.core.objectInstance.resolveSwitchValue
 * @author    kidthales <kidthales@agogpixel.com>
 * @copyright 2023 kidthales
 * @license   {@link https://github.com/kidthales/dd-framework/blob/main/LICENSE.txt | MIT License}
 */

/**
 * Resolve to an object instance switch value.
 *
 * @param {import("./types").ObjectInstanceLike} objectInstanceLike
 * @param {string|number} switchNameOrId
 * @param {boolean|undefined} value
 * @returns {boolean|undefined}
 */
module.exports = function (objectInstanceLike, switchNameOrId, value) {
  var swtch = require('./resolve-switch')(objectInstanceLike, switchNameOrId);

  if (!swtch) {
    return;
  }

  if (value !== undefined) {
    swtch.setValue(value);
    return value;
  }

  return swtch.getValue();
};
