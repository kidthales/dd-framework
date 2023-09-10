/**
 * Create key module.
 *
 * @module dd/message/session/create-key
 * @internal
 */

/**
 * @param {import("@pgmmv/agtk/object-instances/object-instance").AgtkObjectInstance} objectInstance
 * @returns {string}
 */
module.exports = function (objectInstance) {
  return objectInstance.objectId + ',' + objectInstance.id;
};
