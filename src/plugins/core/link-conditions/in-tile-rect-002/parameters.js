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
    tileRectXVariable: 2,

    /**
     * @constant
     */
    tileRectXVariableSource: 102,

    /**
     * @constant
     */
    tileRectYVariable: 3,

    /**
     * @constant
     */
    tileRectYVariableSource: 103,

    /**
     * @constant
     */
    tileRectWidthVariable: 4,

    /**
     * @constant
     */
    tileRectWidthVariableSource: 104,

    /**
     * @constant
     */
    tileRectHeightVariable: 5,

    /**
     * @constant
     */
    tileRectHeightVariableSource: 105
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
    _paramHelper.switchVariableObjectId(_ids.tileRectXVariableSource, 'PARAM_TILE_RECT_X_VARIABLE_SOURCE', [
      'SelfObject',
      'ParentObject'
    ]),
    _paramHelper.br,
    _paramHelper.variableId(_ids.tileRectXVariable, 'PARAM_TILE_RECT_X_VARIABLE', _ids.tileRectXVariableSource, true),
    _paramHelper.br,
    _paramHelper.switchVariableObjectId(_ids.tileRectYVariableSource, 'PARAM_TILE_RECT_Y_VARIABLE_SOURCE', [
      'SelfObject',
      'ParentObject'
    ]),
    _paramHelper.br,
    _paramHelper.variableId(_ids.tileRectYVariable, 'PARAM_TILE_RECT_Y_VARIABLE', _ids.tileRectYVariableSource, true),
    _paramHelper.br,
    _paramHelper.switchVariableObjectId(_ids.tileRectWidthVariableSource, 'PARAM_TILE_RECT_WIDTH_VARIABLE_SOURCE', [
      'SelfObject',
      'ParentObject'
    ]),
    _paramHelper.br,
    _paramHelper.variableId(
      _ids.tileRectWidthVariable,
      'PARAM_TILE_RECT_WIDTH_VARIABLE',
      _ids.tileRectWidthVariableSource,
      true
    ),
    _paramHelper.br,
    _paramHelper.switchVariableObjectId(_ids.tileRectHeightVariableSource, 'PARAM_TILE_RECT_HEIGHT_VARIABLE_SOURCE', [
      'SelfObject',
      'ParentObject'
    ]),
    _paramHelper.br,
    _paramHelper.variableId(
      _ids.tileRectHeightVariable,
      'PARAM_TILE_RECT_HEIGHT_VARIABLE',
      _ids.tileRectHeightVariableSource,
      true
    ),
    _paramHelper.hr
  ]
};
