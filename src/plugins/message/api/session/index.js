/**
 * @module dd/message/session
 */

/**
 * @type {Record<string, import("./types").Session|undefined>}
 * @private
 */
var _state = {};

module.exports = {
  /**
   *
   * @param {import("@pgmmv/agtk/object-instances/object-instance").AgtkObjectInstance} objectInstance
   * @returns {Record<string, import("./types").Session|undefined>}
   */
  get: function (
    /** @type {import("@pgmmv/agtk/object-instances/object-instance").AgtkObjectInstance} */
    objectInstance
  ) {
    return _state[objectInstance.objectId + ',' + objectInstance.id];
  },

  /**
   *
   * @param {import("@pgmmv/agtk/object-instances/object-instance").AgtkObjectInstance} objectInstance
   * @param {Record<string, import("./types").Session|undefined>} session
   * @returns {void}
   */
  set: function (
    /** @type {import("@pgmmv/agtk/object-instances/object-instance").AgtkObjectInstance} */
    objectInstance,
    /** @type {import("./types").Session|undefined} */
    session
  ) {
    _state[objectInstance.objectId + ',' + objectInstance.id] = session;
  }
};
