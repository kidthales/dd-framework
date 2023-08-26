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
    rectXVariable: 2,

    /**
     * @constant
     */
    rectXVariableSource: 102,

    /**
     * @constant
     */
    rectYVariable: 3,

    /**
     * @constant
     */
    rectYVariableSource: 103,

    /**
     * @constant
     */
    rectWidthVariable: 4,

    /**
     * @constant
     */
    rectWidthVariableSource: 104,

    /**
     * @constant
     */
    rectHeightVariable: 5,

    /**
     * @constant
     */
    rectHeightVariableSource: 105
  };

module.exports = {
  ids: _ids,
  entries: [
    _paramHelper.hr,
    _paramHelper.embedded(-1, 'PARAM_INPUTS_GROUP'),
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
    _paramHelper.switchVariableObjectId(_ids.rectXVariableSource, 'PARAM_RECT_X_VARIABLE_SOURCE', [
      'SelfObject',
      'ParentObject'
    ]),
    _paramHelper.variableId(_ids.rectXVariable, 'PARAM_RECT_X_VARIABLE', _ids.rectXVariableSource, true),
    _paramHelper.br,
    _paramHelper.switchVariableObjectId(_ids.rectYVariableSource, 'PARAM_RECT_Y_VARIABLE_SOURCE', [
      'SelfObject',
      'ParentObject'
    ]),
    _paramHelper.variableId(_ids.rectYVariable, 'PARAM_RECT_Y_VARIABLE', _ids.rectYVariableSource, true),
    _paramHelper.br,
    _paramHelper.switchVariableObjectId(_ids.rectWidthVariableSource, 'PARAM_RECT_WIDTH_VARIABLE_SOURCE', [
      'SelfObject',
      'ParentObject'
    ]),
    _paramHelper.variableId(_ids.rectWidthVariable, 'PARAM_RECT_WIDTH_VARIABLE', _ids.rectWidthVariableSource, true),
    _paramHelper.br,
    _paramHelper.switchVariableObjectId(_ids.rectHeightVariableSource, 'PARAM_RECT_HEIGHT_VARIABLE_SOURCE', [
      'SelfObject',
      'ParentObject'
    ]),
    _paramHelper.variableId(_ids.rectHeightVariable, 'PARAM_RECT_HEIGHT_VARIABLE', _ids.rectHeightVariableSource, true),
    _paramHelper.hr
  ]
};
