/**
 * In rectangle module.
 *
 * @module dd/core/object-instance/in-rect
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
