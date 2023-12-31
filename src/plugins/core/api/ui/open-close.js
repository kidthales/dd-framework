/**
 * Core plugin API user interface open/close module.
 *
 * @module    dd.core.ui.openClose
 * @author    kidthales <kidthales@agogpixel.com>
 * @copyright 2023 kidthales
 * @license   {@link https://github.com/kidthales/dd-framework/blob/main/LICENSE.txt | MIT License}
 */

/**
 * @private
 */
var _logApi = require('../log'),
  /**
   * @constant
   * @private
   */
  _stateConstants = {
    /**
     * @type {import("./types").OpenCloseState.Closed}
     * @constant
     */
    closed: 0,
    /**
     * @type {import("./types").OpenCloseState.Opening}
     * @constant
     */
    opening: 1,
    /**
     * @type {import("./types").OpenCloseState.Opened}
     * @constant
     */
    opened: 2,
    /**
     * @type {import("./types").OpenCloseState.Closing}
     * @constant
     */
    closing: 3
  },
  /**
   * @constant
   * @private
   */
  _eventNameConstants = {
    /**
     * @type {'open-start'}
     * @constant
     */
    openStart: 'open-start',
    /**
     * @type {'opening'}
     * @constant
     */
    opening: 'opening',
    /**
     * @type {'open-finish'}
     * @constant
     */
    openFinish: 'open-finish',
    /**
     * @type {'close-start'}
     * @constant
     */
    closeStart: 'close-start',
    /**
     * @type {'closing'}
     * @constant
     */
    closing: 'closing',
    /**
     * @type {'close-finish'}
     * @constant
     */
    closeFinish: 'close-finish'
  };

/**
 * Exposes methods & properties for managing a UI 'widget' that can open or close.
 */
module.exports = {
  /**
   * @constant
   */
  constants: {
    /**
     * @constant
     */
    state: _stateConstants,

    /**
     * @constant
     */
    eventName: _eventNameConstants
  },

  /**
   * @type {import("./types").OpenClose & { ctor: Function }}
   */
  classProperties: {
    eventEmitter: undefined,

    _openCloseState: undefined,
    _openCloseInterpolationState: undefined,

    ctor: function () {
      /** @type {import("./types").OpenClose} */
      var self = this;
      self.eventEmitter = require('../event/emitter/create')();
      return true;
    },

    open: function () {
      /** @type {import("./types").OpenClose} */
      var self = this;
      self._transitionOpenCloseState(_stateConstants.opening);
    },

    close: function () {
      /** @type {import("./types").OpenClose} */
      var self = this;
      self._transitionOpenCloseState(_stateConstants.closing);
    },

    isOpened: function () {
      /** @type {import('./types').OpenClose} */
      var self = this;
      return self._openCloseState === _stateConstants.opened;
    },

    isOpening: function () {
      /** @type {import('./types').OpenClose} */
      var self = this;
      return self._openCloseState === _stateConstants.opening;
    },

    isClosed: function () {
      /** @type {import('./types').OpenClose} */
      var self = this;
      return self._openCloseState === _stateConstants.closed;
    },

    isClosing: function () {
      /** @type {import('./types').OpenClose} */
      var self = this;
      return self._openCloseState === _stateConstants.closing;
    },

    _transitionOpenCloseState: function (state) {
      /** @type {import('./types').OpenClose} */
      var self = this;

      switch (self._openCloseState) {
        case _stateConstants.closed:
          switch (state) {
            case _stateConstants.opening:
              self._openCloseState = state;
              self.eventEmitter.emit(_eventNameConstants.openStart);

              break;

            default:
              self._logOpenCloseTransitionWarning(_stateConstants.closed, state);

              break;
          }

          break;

        case _stateConstants.opening:
          switch (state) {
            case _stateConstants.opened:
              self._openCloseState = state;
              self.eventEmitter.emit(_eventNameConstants.openFinish);

              break;

            case _stateConstants.closing:
              self._openCloseState = state;
              self.eventEmitter.emit(_eventNameConstants.closeStart);

              break;

            default:
              self._logOpenCloseTransitionWarning(_stateConstants.opening, state);

              break;
          }

          break;

        case _stateConstants.opened:
          switch (state) {
            case _stateConstants.closing:
              self._openCloseState = state;
              self.eventEmitter.emit(_eventNameConstants.closeStart);

              break;

            default:
              self._logOpenCloseTransitionWarning(_stateConstants.opened, state);

              break;
          }

          break;

        case _stateConstants.closing:
          switch (state) {
            case _stateConstants.closed:
              self._openCloseState = state;
              self.eventEmitter.emit(_eventNameConstants.closeFinish);

              break;

            case _stateConstants.opening:
              self._openCloseState = state;
              self.eventEmitter.emit(_eventNameConstants.openStart);

              break;

            default:
              self._logOpenCloseTransitionWarning(_stateConstants.closing, state);

              break;
          }

          break;

        default:
          _logApi.warn(
            "OpenClose::_transitionOpenCloseState(): Invalid open/close state: '" + self._openCloseState + "'."
          );

          break;
      }
    },

    _logOpenCloseTransitionWarning: function (from, to) {
      _logApi.warn(
        "OpenClose::_transitionOpenCloseState(): Invalid open/close state transition: '" + from + '->' + to + "'."
      );
    }
  }
};
