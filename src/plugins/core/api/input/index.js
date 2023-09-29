/**
 * Core plugin API input module.
 *
 * @module    dd.core.input
 * @author    kidthales <kidthales@agogpixel.com>
 * @copyright 2023 kidthales
 * @license   {@link https://github.com/kidthales/dd-framework/blob/main/LICENSE.txt | MIT License}
 */

/**
 * @type {(import("./types").ControllerState|undefined)[]}
 * @private
 */
var _opControllerStates,
  /**
   * @type {import("./types").ControllerState}
   * @private
   */
  _pcControllerState = {
    pressed: 0,
    frameCounts: {}
  },
  /**
   * @type {number[]}
   * @private
   */
  _edgeOperationKeys = [],
  /**
   * @type {number[]}
   * @private
   */
  _edgePcKeys = [],
  /**
   * @param {number} controllerId
   * @param {number} key
   * @param {number|undefined} forgiveness
   * @returns {boolean}
   * @private
   */
  _isOperationKeyJustPressed = function (
    /** @type {number} */
    controllerId,
    /** @type {number} */
    key,
    /** @type {number|undefined} */
    forgiveness
  ) {
    var controllerState = _opControllerStates[controllerId],
      /** @type {number} */
      frameCount;

    if (!controllerState) {
      return false;
    }

    forgiveness = typeof forgiveness === 'number' && forgiveness >= 0 ? forgiveness : 0;
    frameCount = controllerState.frameCounts[key];

    return (
      !!(controllerState.pressed & (1 << key)) &&
      frameCount !== undefined &&
      forgiveness >= cc.director.getTotalFrames() - frameCount
    );
  },
  /**
   * @param {number} controllerId
   * @param {number} key
   * @param {number|undefined} forgiveness
   * @returns {boolean}
   * @private
   */
  _isOperationKeyJustReleased = function (
    /** @type {number} */
    controllerId,
    /** @type {number} */
    key,
    /** @type {number|undefined} */
    forgiveness
  ) {
    var controllerState = _opControllerStates[controllerId],
      /** @type {number} */
      frameCount;

    if (!controllerState) {
      return false;
    }

    forgiveness = typeof forgiveness === 'number' && forgiveness >= 0 ? forgiveness : 0;

    return (
      !(controllerState.pressed & (1 << key)) &&
      frameCount !== undefined &&
      forgiveness >= cc.director.getTotalFrames() - frameCount
    );
  },
  /**
   * @param {import("./types").ControllerState} controllerState
   * @param {number} key
   * @param {boolean} pressed
   * @returns {void}
   * @private
   */
  _updateControllerState = function (
    /** @type {import("./types").ControllerState} */
    controllerState,
    /** @type {number} */
    key,
    /** @type {boolean} */
    pressed
  ) {
    var bitFlag = !!(controllerState.pressed & (1 << key));
    if ((!bitFlag && pressed) || (bitFlag && !pressed)) {
      controllerState.pressed = (controllerState.pressed & ~(1 << key)) | (pressed ? 1 << key : 0);
      controllerState.frameCounts[key] = cc.director.getTotalFrames();
    }
  };

/**
 * Exposes methods for working with input.
 */
var inputApi = (module.exports = {
  /**
   * @returns {void}
   */
  initialize: function () {
    _opControllerStates = new Array(Agtk.controllers.MaxControllerId);
  },

  /**
   * @returns {number[]}
   */
  getEdgeOperationKeys: function () {
    return _edgeOperationKeys;
  },

  /**
   * @param {number[]} keys
   * @returns {void}
   */
  setEdgeOperationKeys: function (keys) {
    _edgeOperationKeys = keys;
  },

  /**
   * @returns {number[]}
   */
  getEdgePcKeys: function () {
    return _edgePcKeys;
  },

  /**
   * @param {number[]} keys
   * @returns {void}
   */
  setEdgePcKeys: function (keys) {
    _edgePcKeys = keys;
  },

  /**
   * @returns {void}
   */
  update: function () {
    /** @type {number} */
    var controllerId,
      maxControllerId = Agtk.controllers.MaxControllerId,
      /** @type {import("./types").ControllerState} */
      controllerState,
      /** @type {number} */
      i,
      edgeOperationKeysLen = _edgeOperationKeys.length,
      /** @type {number} */
      edgePcKeysLen = _edgePcKeys.length,
      /** @type {number} */
      key;

    if (Agtk.controllers.isConnected(0)) {
      for (i = 0; i < edgePcKeysLen; ++i) {
        key = _edgePcKeys[i];
        _updateControllerState(_pcControllerState, key, inputApi.isPcKeyPressed(key));
      }
    }

    for (controllerId = 0; controllerId <= maxControllerId; ++controllerId) {
      controllerState = _opControllerStates[controllerId];

      if (Agtk.controllers.isConnected(controllerId)) {
        if (!controllerState) {
          controllerState = _opControllerStates[controllerId] = {
            pressed: 0,
            frameCounts: {}
          };
        }

        for (i = 0; i < edgeOperationKeysLen; ++i) {
          key = _edgeOperationKeys[i];
          _updateControllerState(controllerState, key, inputApi.isOperationKeyPressed(key, controllerId));
        }
      } else if (_opControllerStates[controllerId]) {
        _opControllerStates[controllerId] = undefined;
      }
    }
  },

  /**
   * @param {number} operationKey
   * @param {number|undefined} controllerId
   * @returns {boolean}
   */
  isOperationKeyPressed: function (operationKey, controllerId) {
    var controllers = Agtk.controllers,
      getOperationKeyPressed = controllers.getOperationKeyPressed,
      /** @type {number} */
      maxControllerId,
      /** @type {number} */
      i;

    if (controllerId) {
      return getOperationKeyPressed(controllerId, operationKey);
    }

    maxControllerId = controllers.MaxControllerId;
    for (i = 0; i <= maxControllerId; ++i) {
      if (getOperationKeyPressed(i, operationKey)) {
        return true;
      }
    }

    return false;
  },

  /**
   * @param {number} operationKey
   * @param {number|undefined} forgiveness
   * @param {number|undefined} controllerId
   * @returns {boolean}
   */
  isOperationKeyJustPressed: function (operationKey, forgiveness, controllerId) {
    /** @type {number} */
    var maxControllerId,
      /** @type {number} */
      i;

    if (controllerId) {
      return _isOperationKeyJustPressed(controllerId, operationKey, forgiveness);
    }

    maxControllerId = Agtk.controllers.MaxControllerId;
    for (i = 0; i <= maxControllerId; ++i) {
      if (_isOperationKeyJustPressed(i, operationKey, forgiveness)) {
        return true;
      }
    }

    return false;
  },

  /**
   * @param {number} operationKey
   * @param {number|undefined} forgiveness
   * @param {number|undefined} controllerId
   * @returns {boolean}
   */
  isOperationKeyJustReleased: function (operationKey, forgiveness, controllerId) {
    if (controllerId) {
      return _isOperationKeyJustReleased(controllerId, operationKey, forgiveness);
    }

    maxControllerId = Agtk.controllers.MaxControllerId;
    for (i = 0; i <= maxControllerId; ++i) {
      if (_isOperationKeyJustReleased(i, operationKey, forgiveness)) {
        return true;
      }
    }

    return false;
  },

  /**
   * @param {number} keyCode
   * @returns {boolean}
   */
  isPcKeyPressed: function (keyCode) {
    return !!Agtk.controllers.getKeyValue(0, keyCode);
  },

  /**
   * @param {number} keyCode
   * @param {number|undefined} forgiveness
   * @returns {boolean}
   */
  isPcKeyJustPressed: function (key, forgiveness) {
    var frameCount = _pcControllerState.frameCounts[key];
    forgiveness = typeof forgiveness === 'number' && forgiveness >= 0 ? forgiveness : 0;

    return (
      !!(_pcControllerState.pressed & (1 << key)) &&
      frameCount !== undefined &&
      forgiveness >= cc.director.getTotalFrames() - frameCount
    );
  },

  /**
   * @param {number} keyCode
   * @param {number|undefined} forgiveness
   * @returns
   */
  isPcKeyJustReleased: function (key, forgiveness) {
    var frameCount = _pcControllerState.frameCounts[key];
    forgiveness = typeof forgiveness === 'number' && forgiveness >= 0 ? forgiveness : 0;

    return (
      !(_pcControllerState.pressed & (1 << key)) &&
      frameCount !== undefined &&
      forgiveness >= cc.director.getTotalFrames() - frameCount
    );
  }
});
