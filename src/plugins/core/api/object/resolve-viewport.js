/**
 * Core plugin API object resolve viewport module.
 *
 * @module    dd.core.object.resolveViewport
 * @author    kidthales <kidthales@agogpixel.com>
 * @copyright 2023 kidthales
 * @license   {@link https://github.com/kidthales/dd-framework/blob/main/LICENSE.txt | MIT License}
 */

/**
 * Resolve to object viewport.
 *
 * @param {import("./types").ObjectLike} objectLike
 * @param {string|number} viewportNameOrId
 * @returns {import("@pgmmv/agtk/objects/object/viewports/viewport").AgtkViewport|undefined}
 */
module.exports = function (objectLike, viewportNameOrId) {
  var object = require('./resolve')(objectLike),
    /** @type {number|undefined} */
    viewportId;

  if (!object) {
    return;
  }

  viewportId = typeof viewportNameOrId === 'string' ? object.viewports.getIdByName(viewportNameOrId) : viewportNameOrId;

  if (viewportId !== undefined && viewportId !== Agtk.constants.actionCommands.UnsetObject) {
    return object.viewports.get(viewportId) || undefined;
  }
};
