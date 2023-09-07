/**
 * Resolve switches module.
 *
 * @module dd/core/object/resolve-switches
 */

/**
 * Resolve to object switches.
 *
 * @param {import("./types").ObjectLike} objectLike
 * @returns {import("@pgmmv/agtk/objects/object/switches/switch").AgtkSwitch[]|undefined}
 */
module.exports = function (objectLike) {
  var object = require('./resolve')(objectLike);

  if (object) {
    return object.switches.getIdList().map(function (id) {
      return object.switches.get(id);
    });
  }
};
