/**
 * Get module.
 *
 * @module dd/message/session/get
 */

/**
 * @param {import("@pgmmv/agtk/object-instances/object-instance").AgtkObjectInstance} objectInstance
 * @returns {import("./types").Session|undefined}
 */
module.exports = function (objectInstance) {
  return require('./state')[require('./create-key')(objectInstance)];
};
