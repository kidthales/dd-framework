/**
 * Core plugin API object resolve module.
 *
 * @module    dd.core.object.resolve
 * @author    kidthales <kidthales@agogpixel.com>
 * @copyright 2023 kidthales
 * @license   {@link https://github.com/kidthales/dd-framework/blob/main/LICENSE.txt | MIT License}
 */

/**
 * Resolve to an object.
 *
 * @param {import("./types").ObjectLike} objectLike
 * @returns {import("@pgmmv/agtk/objects/object").AgtkObject|undefined}
 */
module.exports = function (objectLike) {
  /** @type {number|undefined} */
  var id;

  if (typeof objectLike === 'string') {
    id = Agtk.objects.getIdByName(name);
  } else if (typeof objectLike === 'number') {
    id = objectLike;
  } else if (objectLike && typeof objectLike.id === 'number') {
    return objectLike;
  }

  if (id !== undefined && id !== Agtk.constants.actionCommands.UnsetObject) {
    return Agtk.objects.get(id) || undefined;
  }
};
