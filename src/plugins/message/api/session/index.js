/**
 * Session module.
 *
 * @module dd/message/session
 */

/**
 * @type {Record<string, import("./types").Session|undefined>}
 * @private
 */
var _state = {};

/**
 *
 */
module.exports = {
  /**
   *
   * @param {import("@pgmmv/agtk/object-instances/object-instance").AgtkObjectInstance} objectInstance
   * @returns {Record<string, import("./types").Session|undefined>}
   */
  get: function (objectInstance) {
    return _state[objectInstance.objectId + ',' + objectInstance.id];
  },

  /**
   *
   * @param {import("@pgmmv/agtk/object-instances/object-instance").AgtkObjectInstance} objectInstance
   * @param {Record<string, import("./types").Session|undefined>|undefined} session
   * @returns {void}
   */
  set: function (objectInstance, session) {
    _state[objectInstance.objectId + ',' + objectInstance.id] = session;
  }
};
