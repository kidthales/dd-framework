/**
 * Core plugin API filesystem constants module.
 *
 * @internal
 * @module @dd/core/fs/constants
 */

/**
 * @internal
 * @constant
 */
module.exports = {
  /**
   * @type {500}
   * @constant
   */
  enqueueOperationTimeout: 500,

  /**
   * @type {1000}
   * @constant
   */
  operationInitialInterval: 1000,

  /**
   * @type {5}
   * @constant
   */
  operationNumRetries: 5,

  /**
   * @constant
   */
  errorCode: {
    /**
     * @type {'CREATE_DIRECTORY_ERROR_TIMEOUT'}
     * @constant
     */
    createDirectoryTimeout: 'CREATE_DIRECTORY_ERROR_TIMEOUT',

    /**
     * @type {'CREATE_DIRECTORY_ERROR_IMMEDIATE'}
     * @constant
     */
    createDirectoryImmediate: 'CREATE_DIRECTORY_ERROR_IMMEDIATE',

    /**
     * @type {'REMOVE_DIRECTORY_ERROR_TIMEOUT'}
     * @constant
     */
    removeDirectoryTimeout: 'REMOVE_DIRECTORY_ERROR_TIMEOUT',

    /**
     * @type {'REMOVE_DIRECTORY_ERROR_IMMEDIATE'}
     * @constant
     */
    removeDirectoryImmediate: 'REMOVE_DIRECTORY_ERROR_IMMEDIATE',

    /**
     * @type {'READ_FILE_ERROR_IMMEDIATE'}
     * @constant
     */
    readFileImmediate: 'READ_FILE_ERROR_IMMEDIATE',

    /**
     * @type {'READ_FILE_SIZE_ERROR_IMMEDIATE'}
     * @constant
     */
    readFileSizeImmediate: 'READ_FILE_SIZE_ERROR_IMMEDIATE',

    /**
     * @type {'WRITE_FILE_ERROR_TIMEOUT'}
     * @constant
     */
    writeFileTimeout: 'WRITE_FILE_ERROR_TIMEOUT',

    /**
     * @type {'WRITE_FILE_ERROR_IMMEDIATE'}
     * @constant
     */
    writeFileImmediate: 'WRITE_FILE_ERROR_IMMEDIATE',

    /**
     * @type {'APPEND_FILE_ERROR_TIMEOUT'}
     * @constant
     */
    appendFileTimeout: 'APPEND_FILE_ERROR_TIMEOUT',

    /**
     * @type {'APPEND_FILE_ERROR_IMMEDIATE'}
     * @constant
     */
    appendFileImmediate: 'APPEND_FILE_ERROR_IMMEDIATE',

    /**
     * @type {'RENAME_FILE_ERROR_TIMEOUT'}
     * @constant
     */
    renameFileTimeout: 'RENAME_FILE_ERROR_TIMEOUT',

    /**
     * @type {'RENAME_FILE_ERROR_IMMEDIATE'}
     * @constant
     */
    renameFileImmediate: 'RENAME_FILE_ERROR_IMMEDIATE',

    /**
     * @type {'REMOVE_FILE_ERROR_TIMEOUT'}
     * @constant
     */
    removeFileTimeout: 'REMOVE_FILE_ERROR_TIMEOUT',

    /**
     * @type {'REMOVE_FILE_ERROR_IMMEDIATE'}
     * @constant
     */
    removeFileImmediate: 'REMOVE_FILE_ERROR_IMMEDIATE'
  }
};
