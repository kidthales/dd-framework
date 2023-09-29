/**
 * Message plugin API session create key module.
 *
 * @internal
 * @module @dd/message/session/create-key
 * @author    kidthales <kidthales@agogpixel.com>
 * @copyright 2023 kidthales
 * @license   {@link https://github.com/kidthales/dd-framework/blob/main/LICENSE.txt | MIT License}
 */

/**
 * @internal
 * @param {import("@pgmmv/agtk/object-instances/object-instance").AgtkObjectInstance} objectInstance
 * @returns {string}
 */
module.exports = function (objectInstance) {
  return objectInstance.objectId + ',' + objectInstance.id;
};
