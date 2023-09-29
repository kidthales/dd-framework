/**
 * Core plugin API object resolve switches module.
 *
 * @module    dd.core.object.resolveSwitches
 * @author    kidthales <kidthales@agogpixel.com>
 * @copyright 2023 kidthales
 * @license   {@link https://github.com/kidthales/dd-framework/blob/main/LICENSE.txt | MIT License}
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
