/**
 * Filesystem module.
 *
 * @module dd/core/fs
 */

/**
 * @private
 */
var _lockApi = require('../lock'),
  /**
   * @private
   */
  _getByteLength = require('../string/get-byte-length'),
  /**
   * @private
   */
  _pollWithBackOff = require('../time/poll-with-back-off'),
  /**
   * @private
   */
  _pollWithInterval = require('../time/poll-with-interval'),
  /**
   * @private
   */
  _fsConstants = require('./constants'),
  /**
   * @private
   */
  _isPolling = false,
  /**
   * @type {Record<string, [Function, ...string[], import('./types').FileOperationCallback][]>}
   * @private
   */
  _operationQueues = {},
  /**
   * @param {[Function, ...string[], import('./types').FileOperationCallback]} args
   * @returns {void}
   * @private
   */
  _enqueueOperation = function (
    /** @type {[Function, ...string[], import('./types').FileOperationCallback]} */
    args
  ) {
    var operation = args[0],
      path = operation === _renameFile ? args[1] + '/' + args[2] : args[1];

    if (!_lockApi.hasLocks(path)) {
      _lockApi.createLocks(path);
    }

    if (!_operationQueues[path]) {
      _operationQueues[path] = [];
    }

    _operationQueues[path].push(args);

    if (!_isPolling) {
      _isPolling = true;
      _pollWithInterval(
        _pollOperationQueues,
        function () {
          return;
        },
        function () {
          return;
        },
        _fsConstants.enqueueOperationTimeout
      );
    }
  },
  /**
   * @param {string} path
   * @returns {[Function, ...string[], FileOperationCallback] | undefined}
   * @private
   */
  _peekOperation = function (
    /** @type {string} */
    path
  ) {
    if (!_operationQueues[path] || !_operationQueues[path].length) {
      return;
    }

    return _operationQueues[path][0];
  },
  /**
   * @param {string} path
   * @returns {[Function, ...string[], FileOperationCallback] | undefined}
   * @private
   */
  _dequeueOperation = function (
    /** @type {string} */
    path
  ) {
    /** @type {[Function, ...string[], FileOperationCallback]} */
    var args;

    if (!_operationQueues[path] || !_operationQueues[path].length) {
      return;
    }

    args = _operationQueues[path].shift();

    if (!_operationQueues[path].length) {
      _lockApi.destroyLocks(path);
      delete _operationQueues[path];
    }

    return args;
  },
  /**
   * @returns {false}
   * @private
   */
  _pollOperationQueues = function () {
    var paths = Object.keys(_operationQueues),
      pathsLen = paths.length,
      /** @type {number} */
      i,
      /** @type {string} */
      path,
      /** @type {[Function, ...string[], FileOperationCallback]} */
      args,
      /** @type {(() => void)|undefined} */
      releaseLock,
      /** @type {Function} */
      operation;

    if (!pathsLen) {
      _isPolling = false;
      return true;
    }

    for (i = 0; i < pathsLen; ++i) {
      path = paths[i];

      if (!_operationQueues[path] || !_operationQueues[path].length) {
        continue;
      }

      args = _peekOperation(path);
      operation = args[0];

      if (
        operation === _createDirectory ||
        operation === _removeDirectory ||
        operation === _writeFile ||
        operation === _appendFile ||
        operation === _renameFile ||
        operation === _removeFile
      ) {
        releaseLock = _lockApi.acquireExclusiveLock(path);
      } else if (operation === _readFile || operation === _readFileSize) {
        releaseLock = _lockApi.acquireSharedLock(path);
      }

      if (!releaseLock) {
        continue;
      }

      _dequeueOperation(path);

      operation.apply(this, args.splice(1).concat([releaseLock]));
    }

    return false;
  },
  /**
   * @param {string} path
   * @param {import("./types").FileOperationCallback} callback
   * @param {() => void} releaseLock
   * @returns {void}
   * @private
   */
  _createDirectory = function (
    /** @type {string} */
    path,
    /** @type {import("./types").FileOperationCallback} */
    callback,
    /** @type {() => void} */
    releaseLock
  ) {
    /** @type {boolean} */
    var result;

    function conditional() {
      return fsApi.isDirectory(path);
    }

    function onProceed() {
      releaseLock();
      callback(true);
    }

    function onTimeout(
      /** @type {number} */
      elapsed
    ) {
      releaseLock();
      callback(false, {
        code: _fsConstants.errorCode.createDirectoryTimeout,
        path: path,
        elapsed: elapsed
      });
    }

    result = jsb.fileUtils.createDirectory(path);

    if (!result) {
      releaseLock();
      callback(false, {
        code: _fsConstants.errorCode.createDirectoryImmediate,
        path: path
      });
      return;
    }

    _pollWithBackOff(
      conditional,
      onProceed,
      onTimeout,
      _fsConstants.operationInitialInterval,
      _fsConstants.operationNumRetries
    );
  },
  /**
   * @param {string} path
   * @param {import("./types").FileOperationCallback} callback
   * @param {() => void} releaseLock
   * @returns {void}
   * @private
   */
  _removeDirectory = function (
    /** @type {string} */
    path,
    /** @type {import("./types").FileOperationCallback} */
    callback,
    /** @type {() => void} */
    releaseLock
  ) {
    /** @type {boolean} */
    var result;

    function conditional() {
      return fsApi.isDirectory(path);
    }

    function onProceed() {
      releaseLock();
      callback(true);
    }

    function onTimeout(
      /** @type {number} */
      elapsed
    ) {
      releaseLock();
      callback(false, {
        code: _fsConstants.errorCode.removeDirectoryTimeout,
        path: path,
        elapsed: elapsed
      });
    }

    result = jsb.fileUtils.removeDirectory(path);

    if (!result) {
      releaseLock();
      callback(false, {
        code: _fsConstants.errorCode.removeDirectoryImmediate,
        path: path
      });
      return;
    }

    _pollWithBackOff(
      conditional,
      onProceed,
      onTimeout,
      _fsConstants.operationInitialInterval,
      _fsConstants.operationNumRetries
    );
  },
  /**
   * @param {string} path
   * @param {import("./types").FileOperationCallback} callback
   * @param {() => void} releaseLock
   * @returns {void}
   * @private
   */
  _readFile = function (
    /** @type {string} */
    path,
    /** @type {import("./types").FileOperationCallback} */
    callback,
    /** @type {() => void} */
    releaseLock
  ) {
    var result = jsb.fileUtils.getStringFromFile(path);

    releaseLock();

    if (typeof result !== 'string') {
      callback(false, {
        code: _fsConstants.errorCode.readFileImmediate,
        path: path
      });
      return;
    }

    callback(true, result);
  },
  /**
   * @param {string} path
   * @param {import("./types").FileOperationCallback} callback
   * @param {() => void} releaseLock
   * @returns {void}
   * @private
   */
  _readFileSize = function (
    /** @type {string} */
    path,
    /** @type {import("./types").FileOperationCallback} */
    callback,
    /** @type {() => void} */
    releaseLock
  ) {
    var result = jsb.fileUtils.getFileSize(path);

    releaseLock();

    if (typeof result !== 'number') {
      callback(false, {
        code: _fsConstants.errorCode.readFileSizeImmediate,
        path: path
      });
      return;
    }

    callback(true, result);
  },
  /**
   * @param {string} path
   * @param {string} data
   * @param {import("./types").FileOperationCallback} callback
   * @param {() => void} releaseLock
   * @returns {void}
   * @private
   */
  _writeFile = function (
    /** @type {string} */
    path,
    /** @type {string} */
    data,
    /** @type {import("./types").FileOperationCallback} */
    callback,
    /** @type {() => void} */
    releaseLock
  ) {
    var fileSize = jsb.fileUtils.getFileSize(path),
      dataSize = _getByteLength(data),
      /** @type {() => boolean} */
      conditional,
      /** @type {boolean} */
      result;

    if (fileSize !== dataSize) {
      // Poll file size change.
      conditional = function conditional() {
        return dataSize === jsb.fileUtils.getFileSize(path);
      };
    } else {
      // Poll file content change.
      conditional = function conditional() {
        return data === jsb.fileUtils.getStringFromFile(path);
      };
    }

    function onProceed() {
      releaseLock();
      callback(true);
    }

    function onTimeout(
      /** @type {number} */
      elapsed
    ) {
      releaseLock();
      callback(false, {
        code: _fsConstants.errorCode.writeFileTimeout,
        path: path,
        elapsed: elapsed
      });
    }

    result = jsb.fileUtils.writeStringToFile(data, path);

    if (!result) {
      releaseLock();
      callback(false, {
        code: _fsConstants.errorCode.writeFileImmediate,
        path: path
      });
      return;
    }

    _pollWithBackOff(
      conditional,
      onProceed,
      onTimeout,
      _fsConstants.operationInitialInterval,
      _fsConstants.operationNumRetries
    );
  },
  /**
   * @param {string} path
   * @param {string} data
   * @param {import("./types").FileOperationCallback} callback
   * @param {() => void} releaseLock
   * @returns {void}
   * @private
   */
  _appendFile = function (
    /** @type {string} */
    path,
    /** @type {string} */
    data,
    /** @type {import("./types").FileOperationCallback} */
    callback,
    /** @type {() => void} */
    releaseLock
  ) {
    var oldFileContent = jsb.fileUtils.getStringFromFile(path),
      newFileContent = (oldFileContent ? oldFileContent + '\n' : '') + data,
      newFileSize = _getByteLength(newFileContent),
      /** @type {boolean} */
      result;

    function conditional() {
      return newFileSize === jsb.fileUtils.getFileSize(path);
    }

    function onProceed() {
      releaseLock();
      callback(true);
    }

    function onTimeout(
      /** @type {number} */
      elapsed
    ) {
      releaseLock();
      callback(false, {
        code: _fsConstants.errorCode.appendFileTimeout,
        path: path,
        elapsed: elapsed
      });
    }

    result = jsb.fileUtils.writeStringToFile(newFileContent, path);

    if (!result) {
      releaseLock();
      callback(false, {
        code: _fsConstants.errorCode.appendFileImmediate,
        path: path
      });
      return;
    }

    _pollWithBackOff(
      conditional,
      onProceed,
      onTimeout,
      _fsConstants.operationInitialInterval,
      _fsConstants.operationNumRetries
    );
  },
  /**
   * @param {string} dirPath
   * @param {string} oldName
   * @param {string} newName
   * @param {import("./types").FileOperationCallback} callback
   * @param {() => void} releaseLock
   * @returns {void}
   * @private
   */
  _renameFile = function (
    /** @type {string} */
    dirPath,
    /** @type {string} */
    oldName,
    /** @type {string} */
    newName,
    /** @type {import("./types").FileOperationCallback} */
    callback,
    /** @type {() => void} */
    releaseLock
  ) {
    var path = dirPath + '/' + oldName,
      newPath = dirPath + '/' + newName,
      /** @type {boolean} */
      result;

    function conditional() {
      return fsApi.isFile(newPath);
    }

    function onProceed() {
      releaseLock();
      callback(true);
    }

    function onTimeout(
      /** @type {number} */
      elapsed
    ) {
      releaseLock();
      callback(false, {
        code: _fsConstants.errorCode.renameFileTimeout,
        path: path,
        newPath: newPath,
        elapsed: elapsed
      });
    }

    result = jsb.fileUtils.renameFile(dirPath, oldName, newName);

    if (!result) {
      releaseLock();
      callback(false, {
        code: _fsConstants.errorCode.renameFileImmediate,
        path: path,
        newPath: newPath
      });
      return;
    }

    _pollWithBackOff(
      conditional,
      onProceed,
      onTimeout,
      _fsConstants.operationInitialInterval,
      _fsConstants.operationNumRetries
    );
  },
  /**
   * @param {string} path
   * @param {import("./types").FileOperationCallback} callback
   * @param {() => void} releaseLock
   * @returns {void}
   * @private
   */
  _removeFile = function (
    /** @type {string} */
    path,
    /** @type {import("./types").FileOperationCallback} */
    callback,
    /** @type {() => void} */
    releaseLock
  ) {
    /** @type {boolean} */
    var result;

    function conditional() {
      return !fsApi.isFile(path);
    }

    function onProceed() {
      releaseLock();
      callback(true);
    }

    function onTimeout(
      /** @type {number} */
      elapsed
    ) {
      releaseLock();
      callback(false, {
        code: _fsConstants.errorCode.removeFileTimeout,
        path: path,
        elapsed: elapsed
      });
    }

    result = jsb.fileUtils.removeFile(path);

    if (!result) {
      releaseLock();
      callback(false, {
        code: _fsConstants.errorCode.removeFileImmediate,
        path: path
      });
      return;
    }

    _pollWithBackOff(
      conditional,
      onProceed,
      onTimeout,
      _fsConstants.operationInitialInterval,
      _fsConstants.operationNumRetries
    );
  };

/**
 *
 */
var fsApi = (module.exports = {
  /**
   * @constant
   */
  errorCode: _fsConstants.errorCode,

  /**
   * @param {string} path
   * @returns {boolean}
   */
  isAbsolutePath: function (path) {
    return jsb.fileUtils.isAbsolutePath(path);
  },

  /**
   * @param {string} path
   * @returns {boolean}
   */
  isDirectory: function (path) {
    return jsb.fileUtils.isDirectoryExist(path);
  },

  /**
   * @param {string} path
   * @returns {boolean}
   */
  isFile: function (path) {
    return jsb.fileUtils.isFileExist(path);
  },

  /**
   * @param {string} path
   * @param {import("./types").FileOperationCallback} callback
   * @returns {void}
   */
  createDirectory: function (path, callback) {
    _enqueueOperation([_createDirectory, path, callback]);
  },

  /**
   * @param {string} path
   * @param {import("./types").FileOperationCallback} callback
   * @returns {void}
   */
  removeDirectory: function (path, callback) {
    _enqueueOperation([_removeDirectory, path, callback]);
  },

  /**
   * @param {string} path
   * @param {import("./types").FileOperationCallback} callback
   * @returns {void}
   */
  readFile: function (path, callback) {
    _enqueueOperation([_readFile, path, callback]);
  },

  /**
   * @param {string} path
   * @param {import("./types").FileOperationCallback} callback
   * @returns {void}
   */
  readFileSize: function (path, callback) {
    _enqueueOperation([_readFileSize, path, callback]);
  },

  /**
   * @param {string} path
   * @param {string} data
   * @param {import("./types").FileOperationCallback} callback
   * @returns {void}
   */
  writeFile: function (path, data, callback) {
    _enqueueOperation([_writeFile, path, data, callback]);
  },

  /**
   * @param {string} path
   * @param {string} data
   * @param {import("./types").FileOperationCallback} callback
   * @returns {void}
   */
  appendFile: function (path, data, callback) {
    _enqueueOperation([_appendFile, path, data, callback]);
  },

  /**
   * @param {string} dirPath
   * @param {string} oldName
   * @param {string} newName
   * @param {import("./types").FileOperationCallback} callback
   * @returns {void}
   */
  renameFile: function (dirPath, oldName, newName, callback) {
    _enqueueOperation([_renameFile, dirPath, oldName, newName, callback]);
  },

  /**
   * @param {string} path
   * @param {import("./types").FileOperationCallback} callback
   * @returns {void}
   */
  removeFile: function (path, callback) {
    _enqueueOperation([_removeFile, path, callback]);
  }
});
