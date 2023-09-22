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
    inputXVariable: 2,

    /**
     * @constant
     */
    inputXVariableSource: 102,

    /**
     * @constant
     */
    inputYVariable: 3,

    /**
     * @constant
     */
    inputYVariableSource: 103,

    /**
     * @constant
     */
    outputXVariable: 4,

    /**
     * @constant
     */
    outputXVariableSource: 104,

    /**
     * @constant
     */
    outputYVariable: 5,

    /**
     * @constant
     */
    outputYVariableSource: 105
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
    _param.switchVariableObjectId(_ids.inputXVariableSource, 'PARAM_INPUT_X_VARIABLE_SOURCE', [
      'ParentObject',
      'SelfObject'
    ]),
    _param.br,
    _param.variableId(_ids.inputXVariable, 'PARAM_INPUT_X_VARIABLE', _ids.inputXVariableSource, true),
    _param.br,
    _param.switchVariableObjectId(_ids.inputYVariableSource, 'PARAM_INPUT_Y_VARIABLE_SOURCE', [
      'ParentObject',
      'SelfObject'
    ]),
    _param.br,
    _param.variableId(_ids.inputYVariable, 'PARAM_INPUT_Y_VARIABLE', _ids.inputYVariableSource, true),
    _param.hr,
    _param.switchVariableObjectId(_ids.outputXVariableSource, 'PARAM_OUTPUT_X_VARIABLE_SOURCE', [
      'ParentObject',
      'SelfObject'
    ]),
    _param.br,
    _param.variableId(_ids.outputXVariable, 'PARAM_OUTPUT_X_VARIABLE', _ids.outputXVariableSource, true),
    _param.br,
    _param.switchVariableObjectId(_ids.outputYVariableSource, 'PARAM_OUTPUT_Y_VARIABLE_SOURCE', [
      'ParentObject',
      'SelfObject'
    ]),
    _param.br,
    _param.variableId(_ids.outputYVariable, 'PARAM_OUTPUT_Y_VARIABLE', _ids.outputYVariableSource, true),
    _param.hr
  ]
};
