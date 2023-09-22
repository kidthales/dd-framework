/**
 * Parameters module.
 *
 * @module
 */

/**
 * @private
 */
var _param = require('@dd/common').paramHelper,
  /**
   * @private
   * @constant
   */
  _ids = {
    /**
     * @constant
     */
    logLevel: 1,

    /**
     * @constant
     */
    logLevelDebug: 1,

    /**
     * @constant
     */
    logLevelInfo: 2,

    /**
     * @constant
     */
    logLevelWarn: 3,

    /**
     * @constant
     */
    logLevelError: 4,

    /**
     * @constant
     */
    logLevelCritical: 5,

    /**
     * @constant
     */
    message: 2
  };

/**
 *
 */
module.exports = {
  ids: _ids,
  entries: [
    _param.hr,
    _param.customId(
      _ids.logLevel,
      'PARAM_LOG_LEVEL',
      [
        { id: _ids.logLevelDebug, name: 'DEBUG' },
        { id: _ids.logLevelInfo, name: 'INFO' },
        { id: _ids.logLevelWarn, name: 'WARN' },
        { id: _ids.logLevelError, name: 'ERROR' },
        { id: _ids.logLevelCritical, name: 'CRITICAL' }
      ],
      _ids.logLevelInfo
    ),
    _param.stringMultiLine(_ids.message, 'PARAM_MESSAGE', ''),
    _param.hr
  ]
};
