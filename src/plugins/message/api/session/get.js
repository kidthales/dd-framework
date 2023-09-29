/**
 * Message plugin API session get module.
 *
 * @module    dd.message.session.get
 * @author    kidthales <kidthales@agogpixel.com>
 * @copyright 2023 kidthales
 * @license   {@link https://github.com/kidthales/dd-framework/blob/main/LICENSE.txt | MIT License}
 */

/**
 * @param {import("@pgmmv/agtk/object-instances/object-instance").AgtkObjectInstance} objectInstance
 * @returns {import("./types").Session|undefined}
 */
module.exports = function (objectInstance) {
  return require('./state')[require('./create-key')(objectInstance)];
};
