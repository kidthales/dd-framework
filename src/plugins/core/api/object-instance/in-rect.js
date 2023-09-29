/**
 * Core plugin API object instance in rectangle module.
 *
 * @module    dd.core.objectInstance.inRect
 * @author    kidthales <kidthales@agogpixel.com>
 * @copyright 2023 kidthales
 * @license   {@link https://github.com/kidthales/dd-framework/blob/main/LICENSE.txt | MIT License}
 */

/**
 * @param {import("./types").ObjectInstanceLike} objectInstanceLike
 * @param {import("@pgmmv/cc/rect").CCRect} rect
 * @returns {boolean}
 */
module.exports = function (objectInstanceLike, rect) {
  var position = require('./resolve-position')(objectInstanceLike);

  if (!position) {
    return false;
  }

  return cc.rectContainsPoint(rect, position);
};
