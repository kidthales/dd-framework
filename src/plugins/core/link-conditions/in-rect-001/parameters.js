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
    rectX: 2,

    /**
     * @constant
     */
    rectY: 3,

    /**
     * @constant
     */
    rectWidth: 4,

    /**
     * @constant
     */
    rectHeight: 5
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
    _paramHelper.number(_ids.rectX, 'PARAM_RECT_X', 0, { decimals: 0 }),
    _paramHelper.br,
    _paramHelper.number(_ids.rectY, 'PARAM_RECT_Y', 0, { decimals: 0 }),
    _paramHelper.br,
    _paramHelper.number(_ids.rectWidth, 'PARAM_RECT_WIDTH', 0, { decimals: 0, minimumValue: 0 }),
    _paramHelper.br,
    _paramHelper.number(_ids.rectHeight, 'PARAM_RECT_HEIGHT', 0, { decimals: 0, minimumValue: 0 }),
    _paramHelper.hr
  ]
};
