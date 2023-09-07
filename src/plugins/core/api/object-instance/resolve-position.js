/**
 * Resolve position module.
 *
 * @module dd/core/object-instance/resolve-position
 */

/**
 * Resolve to object instance position.
 *
 * @param {import("./types").ObjectInstanceLike} objectInstanceLike
 * @param {number|undefined} x
 * @param {number|undefined} y
 * @returns {import("@pgmmv/cc/point").CCPoint|undefined}
 */
module.exports = function (objectInstanceLike, x, y) {
  var resolveVariableValue = require('./resolve-variable-value');

  x = resolveVariableValue(objectInstanceLike, Agtk.constants.objects.variables.XId, x);
  y = resolveVariableValue(objectInstanceLike, Agtk.constants.objects.variables.YId, y);

  if (x !== undefined && y !== undefined) {
    return cc.p(x, y);
  }
};
