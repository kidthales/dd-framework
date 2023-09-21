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
    tileXVariable: 2,

    /**
     * @constant
     */
    tileXVariableSource: 102,

    /**
     * @constant
     */
    tileYVariable: 3,

    /**
     * @constant
     */
    tileYVariableSource: 103
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
    _paramHelper.br,
    _paramHelper.switchVariableObjectId(_ids.tileXVariableSource, 'PARAM_TILE_X_VARIABLE_SOURCE', [
      'SelfObject',
      'ParentObject'
    ]),
    _paramHelper.variableId(_ids.tileXVariable, 'PARAM_TILE_X_VARIABLE', _ids.tileXVariableSource, true),
    _paramHelper.br,
    _paramHelper.switchVariableObjectId(_ids.tileYVariableSource, 'PARAM_TILE_Y_VARIABLE_SOURCE', [
      'SelfObject',
      'ParentObject'
    ]),
    _paramHelper.variableId(_ids.tileYVariable, 'PARAM_TILE_Y_VARIABLE', _ids.tileYVariableSource, true),
    _paramHelper.hr
  ]
};
