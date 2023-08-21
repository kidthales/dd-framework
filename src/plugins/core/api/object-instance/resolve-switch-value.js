/**
 * @module @dd/core/api/object-instance/resolve-switch-value
 */

/**
 * Resolve to an object instance switch value.
 *
 * @param {import("./types").ObjectInstanceLike} objectInstanceLike
 * @param {string|number} switchNameOrId
 * @param {boolean|undefined} value
 * @returns {boolean|undefined}
 */
module.exports = function (
  /** @type {import("./types").ObjectInstanceLike} */
  objectInstanceLike,
  /** @type {string|number} */
  switchNameOrId,
  /** @type {boolean|undefined} */
  value
) {
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
