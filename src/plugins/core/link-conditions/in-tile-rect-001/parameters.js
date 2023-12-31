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
    tileRectX: 2,

    /**
     * @constant
     */
    tileRectY: 3,

    /**
     * @constant
     */
    tileRectWidth: 4,

    /**
     * @constant
     */
    tileRectHeight: 5
  };

/**
 *
 */
module.exports = {
  ids: _ids,
  entries: [
    _paramHelper.hr,
    _paramHelper.customId(
      _ids.objectInstanceMode,
      'PARAM_OBJECT_INSTANCE_MODE',
      [
        { id: _ids.objectInstanceModeUseSelf, name: 'SELF' },
        { id: _ids.objectInstanceModeUseParent, name: 'PARENT' }
      ],
      _ids.objectInstanceModeUseSelf
    ),
    _paramHelper.hr,
    _paramHelper.number(_ids.tileRectX, 'PARAM_TILE_RECT_X', 0, { decimals: 0, minimumValue: 0 }),
    _paramHelper.number(_ids.tileRectY, 'PARAM_TILE_RECT_Y', 0, { decimals: 0, minimumValue: 0 }),
    _paramHelper.number(_ids.tileRectWidth, 'PARAM_TILE_RECT_WIDTH', 0, { decimals: 0, minimumValue: 0 }),
    _paramHelper.number(_ids.tileRectHeight, 'PARAM_TILE_RECT_HEIGHT', 0, { decimals: 0, minimumValue: 0 }),
    _paramHelper.hr
  ]
};
