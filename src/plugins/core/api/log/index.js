/**
 * Log module.
 *
 * @module dd/core/log
 */

/**
 * @private
 */
var _resolveLocaleKey = require('@dd/common').resolveLocaleKey,
  /**
   * @private
   */
  _toJson = require('../string/to-json'),
  /**
   * @constant
   * @private
   */
  _kMinJsonIndentSize = 0,
  /**
   * @constant
   * @private
   */
  _kMaxJsonIndentSize = 8,
  /**
   * @type {number|undefined}
   * @private
   */
  _logLevel,
  /**
   * @private
   */
  _jsonIndentSize = 2,
  /**
   * @private
   */
  _jsonStringifyFunctions = false,
  /**
   * @type {Record<number, string>}
   * @private
   */
  _logLevelNameMap = {},
  /**
   * @type {((msg: string) => void) | undefined}
   * @private
   */
  _runtimeLogger,
  /**
   * @param {unknown} data
   * @returns {string}
   * @private
   */
  _toString = function (
    /** @type {unknown} */
    data
  ) {
    return typeof data === 'string' ? data : _toJson(data, _jsonIndentSize, _jsonStringifyFunctions);
  },
  /**
   * @param {number} level
   * @param {unknown[]} series
   * @private
   */
  _log = function (level, series) {
    var len = series.length,
      /** @type {number} */
      i,
      prefix = '',
      /** @type {unknown} */
      data;

    if (level !== -1 && level < _logLevel) {
      return;
    }

    if (_logLevelNameMap[level]) {
      prefix = '[' + _logLevelNameMap[level] + '] ' + Date.now() + ' ';
    }

    for (i = 0; i < len; ++i) {
      data = series[i];
      (_runtimeLogger || Agtk.log)(prefix + _toString(data));
    }
  },
  /**
   * @type {import("./types").LogApi}
   */
  log = function () {
    _log(-1, Array.prototype.slice.call(arguments, 0));
  };

log.level = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
  critical: 4
};

_logLevel = log.level.info;

log.debug = function () {
  _log(log.level.debug, Array.prototype.slice.call(arguments, 0));
};

log.info = function () {
  _log(log.level.info, Array.prototype.slice.call(arguments, 0));
};

log.warn = function () {
  _log(log.level.warn, Array.prototype.slice.call(arguments, 0));
};

log.error = function () {
  _log(log.level.error, Array.prototype.slice.call(arguments, 0));
};

log.critical = function () {
  _log(log.level.critical, Array.prototype.slice.call(arguments, 0));
};

log.getLogLevel = function () {
  return _logLevel;
};

log.setLogLevel = function (level) {
  _logLevel = cc.clampf(level, log.level.debug, log.level.critical);
};

log.getRuntimeLogger = function () {
  return _runtimeLogger;
};

log.setRuntimeLogger = function (logger) {
  _runtimeLogger = logger;
};

log.getJsonIndentSize = function () {
  return _jsonIndentSize;
};

log.setJsonIndentSize = function (size) {
  _jsonIndentSize = cc.clampf(size, _kMinJsonIndentSize, _kMaxJsonIndentSize);
};

log.getJsonStringifyFunctions = function () {
  return _jsonStringifyFunctions;
};

log.setJsonStringifyFunctions = function (stringify) {
  _jsonStringifyFunctions = stringify;
};

log.getLogLevelNameMap = function () {
  return _logLevelNameMap;
};

log.setLogLevelNameMap = function (map) {
  _logLevelNameMap = map;
};

log.createActionCommandLogger = function (payload, localeNameKey) {
  var obj = Agtk.objects.get(payload.objectId),
    prefix =
      '[' +
      obj.name +
      '->' +
      obj.actions.get(payload.actionId).name +
      ']: ' +
      (localeManager ? _resolveLocaleKey(localeNameKey) + ': ' : '');

  return {
    debug: function () {
      _log(
        log.level.debug,
        Array.prototype.slice.call(arguments, 0).map(function (arg) {
          return prefix + _toString(arg);
        })
      );
    },

    info: function () {
      _log(
        log.level.info,
        Array.prototype.slice.call(arguments, 0).map(function (arg) {
          return prefix + _toString(arg);
        })
      );
    },

    warn: function () {
      _log(
        log.level.warn,
        Array.prototype.slice.call(arguments, 0).map(function (arg) {
          return prefix + _toString(arg);
        })
      );
    },

    error: function () {
      _log(
        log.level.error,
        Array.prototype.slice.call(arguments, 0).map(function (arg) {
          return prefix + _toString(arg);
        })
      );
    },

    critical: function () {
      _log(
        log.level.critical,
        Array.prototype.slice.call(arguments, 0).map(function (arg) {
          return prefix + _toString(arg);
        })
      );
    }
  };
};

log.createLinkConditionLogger = function (payload, localeNameKey) {
  var prefix =
    '[' +
    Agtk.objects.get(payload.objectId).name +
    '->Action Link ' +
    payload.actionLinkId +
    ']: ' +
    (localeManager ? _resolveLocaleKey(localeNameKey) + ': ' : '');

  return {
    debug: function () {
      _log(
        log.level.debug,
        Array.prototype.slice.call(arguments, 0).map(function (arg) {
          return prefix + _toString(arg);
        })
      );
    },

    info: function () {
      _log(
        log.level.info,
        Array.prototype.slice.call(arguments, 0).map(function (arg) {
          return prefix + _toString(arg);
        })
      );
    },

    warn: function () {
      _log(
        log.level.warn,
        Array.prototype.slice.call(arguments, 0).map(function (arg) {
          return prefix + _toString(arg);
        })
      );
    },

    error: function () {
      _log(
        log.level.error,
        Array.prototype.slice.call(arguments, 0).map(function (arg) {
          return prefix + _toString(arg);
        })
      );
    },

    critical: function () {
      _log(
        log.level.critical,
        Array.prototype.slice.call(arguments, 0).map(function (arg) {
          return prefix + _toString(arg);
        })
      );
    }
  };
};

/**
 *
 */
module.exports = log;
