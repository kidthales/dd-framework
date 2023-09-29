/**
 * Core plugin API object instance resolve scale module.
 *
 * @module    dd.core.objectInstance.resolveScale
 * @author    kidthales <kidthales@agogpixel.com>
 * @copyright 2023 kidthales
 * @license   {@link https://github.com/kidthales/dd-framework/blob/main/LICENSE.txt | MIT License}
 */

/**
 * Resolve to object instance scale.
 *
 * @param {import("./types").ObjectInstanceLike} objectInstanceLike
 * @param {number|undefined} x
 * @param {number|undefined} y
 * @returns {import("@pgmmv/cc/point").CCPoint|undefined}
 */
module.exports = function (objectInstanceLike, x, y) {
  var resolveVariableValue = require('./resolve-variable-value');

  x = resolveVariableValue(objectInstanceLike, Agtk.constants.objects.variables.ScalingXId, x);
  y = resolveVariableValue(objectInstanceLike, Agtk.constants.objects.variables.ScalingYId, y);

  if (x !== undefined && y !== undefined) {
    return cc.p(x, y);
  }
};
