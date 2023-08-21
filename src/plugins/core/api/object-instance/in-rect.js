/**
 * @module @dd/core/api/object-instance/in-rect
 */

/**
 *
 * @param {import("./types").ObjectInstanceLike} objectInstanceLike
 * @param {import("@pgmmv/cc/rect").CCRect} rect
 * @returns {boolean}
 */
module.exports = function (
  /** @type {import("./types").ObjectInstanceLike} */
  objectInstanceLike,
  /** @type {import("@pgmmv/cc/rect").CCRect} */
  rect
) {
  var position = require('./resolve-position')(objectInstanceLike);

  if (!position) {
    return false;
  }

  return cc.rectContainsPoint(rect, position);
};
