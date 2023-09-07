/**
 * Class properties module.
 *
 * @module dd/core/ui/panel/class-properties
 */

/**
 * @private
 */
var _logApi = require('../../log'),
  /**
   * @private
   */
  _openCloseApi = require('../open-close'),
  /**
   * @private
   */
  _openCloseClassProperties = _openCloseApi.classProperties,
  /**
   * @constant
   * @private
   */
  _openCloseStateConstants = _openCloseApi.constants.state,
  /**
   * @constant
   * @private
   */
  _openCloseEventNameConstants = _openCloseApi.constants.eventName,
  /**
   * @type {import("./types").Panel<import('./types').BasePanelConfig> & { ctor: (config: import('./types').BasePanelConfig) => boolean}}
   */
  classProperties = {
    _config: undefined,
    _openCloseInterpolationState: undefined,

    update: function (dt) {
      /** @type {import('./types').Panel} */
      var self = this;

      switch (self._openCloseState) {
        case _openCloseStateConstants.closed:
          self._updateClosed(dt);

          break;

        case _openCloseStateConstants.opened:
          self._updateOpened(dt);

          break;

        case _openCloseStateConstants.opening:
          self._updateOpening(dt);

          break;

        case _openCloseStateConstants.closing:
          self._updateClosing(dt);

          break;

        default:
          if (self._openCloseState !== -40037) {
            // Don't spam the runtime log.
            _logApi.error('Panel::update(): Invalid open/close state: ' + self._openCloseState);
            self._openCloseState = -40037;
          }

          break;
      }
    },

    _updateClosed: function () {},

    _updateOpening: function (dt) {
      /** @type {import('./types').Panel} */
      var self = this;
      self._updateOpenCloseInterpolationState(dt, 1);
      self._postUpdateOpenCloseInterpolationState(1);
    },

    _updateOpened: function () {},

    _updateClosing: function () {
      /** @type {import('./types').Panel} */
      var self = this;
      self._updateOpenCloseInterpolationState(dt, -1);
      self._postUpdateOpenCloseInterpolationState(-1);
    },

    _updateOpenCloseInterpolationState: function (dt, direction) {
      /** @type {import('./types').Panel} */
      var self = this,
        delta = 60 * dt * direction * self._config.openCloseDelta;

      self._openCloseInterpolationState.x = cc.clampf(self._openCloseInterpolationState.x + delta, 0, 1);
      self._openCloseInterpolationState.y = cc.clampf(self._openCloseInterpolationState.y + delta, 0, 1);
    },

    _postUpdateOpenCloseInterpolationState: function (direction) {
      /** @type {import('./types').Panel} */
      var self = this;

      switch (direction) {
        case -1:
          self.eventManager.dispatchCustomEvent(
            _openCloseEventNameConstants.closing,
            self._openCloseInterpolationState
          );

          if (!self._openCloseInterpolationState.x || !self._openCloseInterpolationState.y) {
            self._transitionOpenCloseState(_openCloseStateConstants.closed);
          }

          break;

        case 1:
          self.eventManager.dispatchCustomEvent(
            _openCloseEventNameConstants.opening,
            self._openCloseInterpolationState
          );

          if (self._openCloseInterpolationState.x === 1 && self._openCloseInterpolationState.y === 1) {
            self._transitionOpenCloseState(_openCloseStateConstants.opened);
          }

          break;

        default:
          _logApi.error('Panel::_postUpdateOpenCloseInterpolationState(): Invalid direction: ' + direction);

          break;
      }
    }
  },
  /** @type {string|undefined} */
  prop;

for (prop in _openCloseClassProperties) {
  if (Object.prototype.hasOwnProperty.call(_openCloseClassProperties, prop)) {
    classProperties[prop] = _openCloseClassProperties[prop];
  }
}

classProperties.ctor = function (config) {
  /** @type {import('./types').Panel} */
  var self = this,
    result = _openCloseClassProperties.ctor.call(self);

  if (!result) {
    return false;
  }

  self._config = {
    renderType: config.renderType,
    size: config.size || cc.size(128, 128),
    openCloseDelta: config.openCloseDelta || cc.p(1, 1),
    startClosed: config.startClosed || false
  };

  if (self._config.startClosed) {
    self._openCloseState = _openCloseStateConstants.closed;
    self._openCloseInterpolationState = cc.p(0, 0);
  } else {
    self._openCloseState = _openCloseStateConstants.opened;
    self._openCloseInterpolationState = cc.p(1, 1);
  }

  return true;
};

/**
 *
 */
module.exports = classProperties;
