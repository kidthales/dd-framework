/**
 * Message plugin API session has module.
 *
 * @module    dd.message.session.has
 * @author    kidthales <kidthales@agogpixel.com>
 * @copyright 2023 kidthales
 * @license   {@link https://github.com/kidthales/dd-framework/blob/main/LICENSE.txt | MIT License}
 */

/**
 * @param {import("@pgmmv/agtk/object-instances/object-instance").AgtkObjectInstance} objectInstance
 * @returns {boolean}
 */
module.exports = function (objectInstance) {
  return !!require('./get')(objectInstance);
};
