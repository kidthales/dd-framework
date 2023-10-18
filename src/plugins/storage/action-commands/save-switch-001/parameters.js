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
    switch: 1,

    /**
     * @constant
     */
    switchSource: 101
  };

/**
 *
 */
module.exports = {
  ids: _ids,
  entries: [
    _param.hr,
    _param.switchVariableObjectId(_ids.switchSource, 'PARAM_SWITCH_SOURCE', []),
    _param.br,
    _param.switchId(_ids.switch, 'PARAM_SWITCH', _ids.switchSource, false),
    _param.hr
  ]
};
