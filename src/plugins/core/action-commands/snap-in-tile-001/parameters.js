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
   * @constant
   * @private
   */
  _ids = {
    /**
     * @constant
     */
    objectInstanceMode: 1,

    /**
     * @see Agtk.constants.switchVariableObjects.SelfObject
     * @constant
     */
    objectInstanceModeUseSelf: -2,

    /**
     * @see Agtk.constants.switchVariableObjects.ParentObject
     * @constant
     */
    objectInstanceModeUseParent: -7,

    /**
     * @constant
     */
    tileOriginX: 2,

    /**
     * @constant
     */
    tileOriginY: 3
  };

/**
 *
 */
module.exports = {
  ids: _ids,
  entries: [
    _param.hr,
    _param.customId(
      _ids.objectInstanceMode,
      'PARAM_OBJECT_INSTANCE_MODE',
      [
        { id: _ids.objectInstanceModeUseSelf, name: 'SELF' },
        { id: _ids.objectInstanceModeUseParent, name: 'PARENT' }
      ],
      _ids.objectInstanceModeUseSelf
    ),
    _param.hr,
    _param.number(_ids.tileOriginX, 'PARAM_TILE_ORIGIN_X', 0.5, {
      decimals: 2,
      minimumValue: 0,
      maximumValue: 1
    }),
    _param.number(_ids.tileOriginY, 'PARAM_TILE_ORIGIN_Y', 0.5, {
      decimals: 2,
      minimumValue: 0,
      maximumValue: 1
    }),
    _param.hr
  ]
};
