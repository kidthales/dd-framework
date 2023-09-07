/**
 * Parameters module.
 *
 * @module
 */

/**
 * @private
 */
var _paramHelper = require('@dd/common').paramHelper,
  /**
   * @constant
   * @private
   */
  _ids = {
    /**
     * @constant
     */
    data: 1
  };

/**
 *
 */
module.exports = {
  ids: _ids,
  entries: [_paramHelper.hr, _paramHelper.json(_ids.data, 'PLUGIN_PARAM_DATA', {}), _paramHelper.hr]
};
