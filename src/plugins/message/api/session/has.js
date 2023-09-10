/**
 * Has module.
 *
 * @module dd/message/session/has
 */

/**
 * @param {import("@pgmmv/agtk/object-instances/object-instance").AgtkObjectInstance} objectInstance
 * @returns {boolean}
 */
module.exports = function (objectInstance) {
  return !!require('./get')(objectInstance);
};
