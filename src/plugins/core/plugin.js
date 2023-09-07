/**
 * Plugin module.
 *
 * @module
 */

/**
 * @private
 */
var _commonApi = require('@dd/common'),
  /**
   * @private
   */
  _eventApi = require('./api/event'),
  /**
   * @private
   */
  _fsApi = require('./api/fs'),
  /**
   * @private
   */
  _inputApi = require('./api/input'),
  /**
   * @private
   */
  _logApi = require('./api/log'),
  /**
   * @private
   */
  _timeApi = require('./api/time'),
  /**
   * @private
   */
  _parameters = require('./parameters'),
  /**
   * @constant
   * @private
   */
  _kLogDirectoryName = 'log',
  /**
   * @constant
   * @private
   */
  _kTargetLogFileName = 'current.txt',
  /**
   * @private
   */
  _writeLogFiles = false,
  /**
   * @private
   */
  _isGameRefreshed = true,
  /**
   * @private
   */
  _fileLogger = (function () {
    /**
     * @type {string[]}
     * @private
     */
    var _buffer = [],
      /**
       * @private
       */
      _bufferSize = 0,
      /**
       * @type {Date|undefined}
       * @private
       */
      _batchStart,
      /**
       * @private
       */
      _lastFlushTime = 0,
      /**
       * @private
       */
      _isFlushing = false,
      /**
       * @param {string} msg
       * @returns {void}
       * @private
       */
      _writeToBuffer = function (
        /** @type {string} */
        msg
      ) {
        var path = Agtk.settings.projectPath + _kLogDirectoryName + '/' + _kTargetLogFileName;

        if (!_batchStart) {
          _batchStart = new Date();
        }

        _buffer.push(msg);
        _bufferSize += msg.length;

        if (_bufferSize >= 2048) {
          _flushToFile(path);
          return;
        }

        _timeApi.pollWithInterval(
          function () {
            if (!_isFlushing && _bufferSize && _timeApi.getUnixTimestamp() - _lastFlushTime >= 3) {
              _flushToFile(path);
              return true;
            }

            if (!_bufferSize) {
              return true;
            }

            return false;
          },
          function () {},
          function () {},
          1000
        );
      },
      /**
       * @param {string} path
       * @returns {void}
       * @private
       */
      _flushToFile = function (
        /** @type {string} */
        path
      ) {
        var oldBufferLen = _buffer.length,
          oldBufferSize = _bufferSize;

        _isFlushing = true;

        function finish() {
          _buffer.splice(0, oldBufferLen);
          _bufferSize -= oldBufferSize;
          _isFlushing = false;
          _lastFlushTime = _timeApi.getUnixTimestamp();
        }

        _fsApi.appendFile(path, _buffer.join('\n').trim(), function (success) {
          if (!success) {
            finish();
            return;
          }

          // Log file rotation.
          _fsApi.readFileSize(path, function (success, data) {
            var padStart = _coreApi.string.padStart,
              /** @type {string} */
              rotateFileName,
              /** @type {string} */
              rotatePath;

            if (success && typeof data === 'number' && data >= 6144) {
              rotateFileName =
                'log-' +
                _batchStart.getFullYear() +
                '-' +
                padStart((_batchStart.getMonth() + 1).toString(), 2, '0') +
                '-' +
                padStart(_batchStart.getDate().toString(), 2, '0') +
                '-' +
                padStart(_batchStart.getHours().toString(), 2, '0') +
                '-' +
                padStart(_batchStart.getMinutes().toString(), 2, '0') +
                '-' +
                padStart(_batchStart.getSeconds().toString(), 2, '0') +
                '-' +
                padStart(_batchStart.getMilliseconds().toString(), 3, '0') +
                '.txt';

              _batchStart = new Date();

              rotatePath = Agtk.settings.projectPath + _kLogDirectoryName + '/' + rotateFileName;

              _fsApi.readFile(path, function (success, data) {
                if (success && data !== undefined) {
                  _fsApi.writeFile(rotatePath, data, function () {
                    _fsApi.writeFile(path, '', finish);
                  });
                } else {
                  _fsApi.writeFile(path, '', finish);
                }
              });
            } else {
              finish();
            }
          });
        });
      },
      /**
       * @constant
       */
      fileLogger = {
        write: function (
          /** @type {string} */
          msg
        ) {
          var path = Agtk.settings.projectPath + _kLogDirectoryName;

          if (!_fsApi.isAbsolutePath(path)) {
            return;
          }

          if (!_fsApi.isDirectory(path)) {
            _fsApi.createDirectory(path, function (success) {
              if (success) {
                _writeToBuffer(msg);
              }
            });
            return;
          }

          _writeToBuffer(msg);
        }
      };

    return fileLogger;
  })(),
  /**
   * @param {string} msg
   * @returns {void}
   * @private
   */
  _combinedLog = function (
    /** @type {string} */
    msg
  ) {
    var chunks = msg.match(/.{1,120}/g),
      len = chunks.length,
      /** @type {number} */
      i;

    for (i = 0; i < len; ++i) {
      Agtk.log(chunks[i]);
    }

    if (_writeLogFiles && !!Agtk && typeof Agtk.version === 'string' && /^player .+$/.test(Agtk.version)) {
      // Only write when in test player?
      _fileLogger.write(msg);
    }
  },
  /**
   *
   */
  plugin = _commonApi.createPlugin(
    'core',
    {
      dependencies: [],
      parameters: _parameters,
      actionCommands: require('./action-commands'),
      linkConditions: require('./link-conditions'),
      api: require('./api'),
      locale: require('./locale')
    },
    {
      data: {},
      onInitialize: function () {
        _logApi.setRuntimeLogger(_combinedLog);
        _inputApi.initialize();
      },
      onSetParamValue: function (paramValue) {
        var ids = _parameters.ids,
          /** @type {number} */
          paramValueLogLevel = paramValue[ids.logLevel],
          /** @type {number} */
          paramValueJsonStringifyFunctions = paramValue[ids.jsonStringifyFunctions],
          /** @type {Record<number, string>} */
          logLevelNameMap = {},
          controllerKey = Agtk.constants.controllers,
          /** @type {number} */
          edgeOperationKeys = [],
          /** @type {number} */
          edgePcKeys = [];

        logLevelNameMap[_logApi.level.debug] = _commonApi.resolveLocaleKey('DEBUG');
        logLevelNameMap[_logApi.level.info] = _commonApi.resolveLocaleKey('INFO');
        logLevelNameMap[_logApi.level.warn] = _commonApi.resolveLocaleKey('WARN');
        logLevelNameMap[_logApi.level.error] = _commonApi.resolveLocaleKey('ERROR');
        logLevelNameMap[_logApi.level.critical] = _commonApi.resolveLocaleKey('CRITICAL');
        _logApi.setLogLevelNameMap(logLevelNameMap);

        switch (paramValueLogLevel) {
          case ids.logLevelDebug:
            _logApi.setLogLevel(_logApi.level.debug);
            break;
          case ids.logLevelWarn:
            _logApi.setLogLevel(_logApi.level.warn);
            break;
          case ids.logLevelError:
            _logApi.setLogLevel(_logApi.level.error);
            break;
          case ids.logLevelCritical:
            _logApi.setLogLevel(_logApi.level.critical);
            break;
          case ids.logLevelInfo:
          default:
            _logApi.setLogLevel(_logApi.level.info);
            break;
        }

        _logApi.setJsonIndentSize(paramValue[ids.jsonIndentSize]);
        _logApi.setJsonStringifyFunctions(
          paramValueJsonStringifyFunctions === ids.jsonStringifyFunctionsAlways ||
            (paramValueJsonStringifyFunctions === ids.jsonStringifyFunctionsDebugOnly &&
              paramValueLogLevel === ids.logLevelDebug)
        );

        _writeLogFiles = paramValue[ids.writeLogFiles] === ids.writeLogFilesOn;

        [
          [ids.operationKeyA, controllerKey.OperationKeyA],
          [ids.operationKeyB, controllerKey.OperationKeyB],
          [ids.operationKeyCancel, controllerKey.OperationKeyCancel],
          [ids.operationKeyDown, controllerKey.OperationKeyDown],
          [ids.operationKeyHome, controllerKey.OperationKeyHome],
          [ids.operationKeyL1, controllerKey.OperationKeyL1],
          [ids.operationKeyL2, controllerKey.OperationKeyL2],
          [ids.operationKeyLeft, controllerKey.OperationKeyLeft],
          [ids.operationKeyLeftClick, controllerKey.OperationKeyLeftClick],
          [ids.operationKeyLeftStickDown, controllerKey.OperationKeyLeftStickDown],
          [ids.operationKeyLeftStickLeft, controllerKey.OperationKeyLeftStickLeft],
          [ids.operationKeyLeftStickRight, controllerKey.OperationKeyLeftStickRight],
          [ids.operationKeyLeftStickUp, controllerKey.OperationKeyLeftStickUp],
          [ids.operationKeyOk, controllerKey.OperationKeyOk],
          [ids.operationKeyR1, controllerKey.OperationKeyR1],
          [ids.operationKeyR2, controllerKey.OperationKeyR2],
          [ids.operationKeyRight, controllerKey.OperationKeyRight],
          [ids.operationKeyRightClick, controllerKey.OperationKeyRightClick],
          [ids.operationKeyRightStickDown, controllerKey.OperationKeyRightStickDown],
          [ids.operationKeyRightStickLeft, controllerKey.OperationKeyRightStickLeft],
          [ids.operationKeyRightStickRight, controllerKey.OperationKeyRightStickRight],
          [ids.operationKeyRightStickUp, controllerKey.OperationKeyRightStickUp],
          [ids.operationKeySelect, controllerKey.OperationKeySelect],
          [ids.operationKeyStart, controllerKey.OperationKeyStart],
          [ids.operationKeyUp, controllerKey.OperationKeyUp],
          [ids.operationKeyX, controllerKey.OperationKeyX],
          [ids.operationKeyY, controllerKey.OperationKeyY]
        ].forEach(function (op) {
          if (paramValue[op[0]] === ids.operationKeyOn) {
            edgeOperationKeys.push(op[1]);
          }
        });
        _inputApi.setEdgeOperationKeys(edgeOperationKeys);

        [
          [ids.reservedKeyCodePc_A, controllerKey.ReservedKeyCodePc_A],
          [ids.reservedKeyCodePc_D, controllerKey.ReservedKeyCodePc_D],
          [ids.reservedKeyCodePc_Down, controllerKey.ReservedKeyCodePc_Down],
          [ids.reservedKeyCodePc_Left, controllerKey.ReservedKeyCodePc_Left],
          [ids.reservedKeyCodePc_LeftClick, controllerKey.ReservedKeyCodePc_LeftClick],
          [ids.reservedKeyCodePc_MiddleClick, controllerKey.ReservedKeyCodePc_MiddleClick],
          [ids.reservedKeyCodePc_MousePointer, controllerKey.ReservedKeyCodePc_MousePointer],
          [ids.reservedKeyCodePc_Right, controllerKey.ReservedKeyCodePc_Right],
          [ids.reservedKeyCodePc_RightClick, controllerKey.ReservedKeyCodePc_RightClick],
          [ids.reservedKeyCodePc_S, controllerKey.ReservedKeyCodePc_S],
          [ids.reservedKeyCodePc_Up, controllerKey.ReservedKeyCodePc_Up],
          [ids.reservedKeyCodePc_W, controllerKey.ReservedKeyCodePc_W],
          [ids.reservedKeyCodePc_WheelDown, controllerKey.ReservedKeyCodePc_WhellDown],
          [ids.reservedKeyCodePc_WheelUp, controllerKey.ReservedKeyCodePc_WheelUp]
        ].forEach(function (rk) {
          if (paramValue[rk[0]] === ids.reservedKeyCodePcOn) {
            edgePcKeys.push(rk[1]);
          }
        });
        _inputApi.setEdgePcKeys(edgePcKeys);
      }
    }
  );

plugin.update = function (delta) {
  var scene = Agtk.sceneInstances.getCurrent();

  if (!scene) {
    _isGameRefreshed = false;
    return;
  }

  if (_isGameRefreshed) {
    _logApi.critical(_commonApi.resolveLocaleKey('GAME_REFRESH_DETECTED'));
    _isGameRefreshed = false;
    cc.eventManager.removeCustomListeners(_eventApi.updateEventName);
  }

  _inputApi.update();

  cc.eventManager.dispatchCustomEvent(_eventApi.updateEventName, delta);
};

/**
 *
 */
module.exports = plugin;
