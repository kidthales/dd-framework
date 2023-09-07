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
    printSpeed: 2,

    /**
     * @constant
     */
    clearSpeed: 3,

    /**
     * @constant
     */
    messages: 4,

    /**
     * @constant
     */
    overrideFont: 5,

    /**
     * @constant
     */
    horizontalTextAlign: 6,

    /**
     * @see dd.core.text.printer.constants.horizontalTextAlignment.left
     * @constant
     */
    horizontalTextAlignLeft: 0,

    /**
     * @see dd.core.text.printer.constants.horizontalTextAlignment.center
     * @constant
     */
    horizontalTextAlignCenter: 1,

    /**
     * @see dd.core.text.printer.constants.horizontalTextAlignment.right
     * @constant
     */
    horizontalTextAlignRight: 2,

    /**
     * @constant
     */
    verticalTextAlign: 7,

    /**
     * @see dd.core.text.printer.constants.verticalTextAlignment.top
     * @constant
     */
    verticalTextAlignTop: 0,

    /**
     * @see dd.core.text.printer.constants.verticalTextAlignment.center
     * @constant
     */
    verticalTextAlignCenter: 1,

    /**
     * @see dd.core.text.printer.constants.verticalTextAlignment.bottom
     * @constant
     */
    verticalTextAlignBottom: 2,

    /**
     * @constant
     */
    marginLeft: 8,

    /**
     * @constant
     */
    marginRight: 9,

    /**
     * @constant
     */
    marginTop: 10,

    /**
     * @constant
     */
    marginBottom: 11,

    /**
     * @constant
     */
    colorChannelRed: 13,

    /**
     * @constant
     */
    colorChannelGreen: 14,

    /**
     * @constant
     */
    colorChannelBlue: 15,

    /**
     * @constant
     */
    opacity: 16,

    /**
     * @constant
     */
    scaleX: 17,

    /**
     * @constant
     */
    scaleY: 18,

    /**
     * @constant
     */
    printingSfx: 19,

    /**
     * @constant
     */
    horizontalPosition: 20,

    /**
     * @constant
     */
    horizontalPositionLeft: 0,

    /**
     * @constant
     */
    horizontalPositionCenter: 1,

    /**
     * @constant
     */
    horizontalPositionRight: 2,

    /**
     * @constant
     */
    verticalPosition: 21,

    /**
     * @constant
     */
    verticalPositionTop: 0,

    /**
     * @constant
     */
    verticalPositionCenter: 1,

    /**
     * @constant
     */
    verticalPositionBottom: 2,

    /**
     * @constant
     */
    indicatorImage: 22,

    /**
     * @constant
     */
    indicatorImageFrameX: 23,

    /**
     * @constant
     */
    indicatorImageFrameY: 24,

    /**
     * @constant
     */
    indicatorImageFrameWidth: 25,

    /**
     * @constant
     */
    indicatorImageFrameHeight: 26,

    /**
     * @constant
     */
    okSwitch: 27,

    /**
     * @constant
     */
    okSwitchSource: 127,

    /**
     * @constant
     */
    cancelSwitch: 28,

    /**
     * @constant
     */
    cancelSwitchSource: 128,

    /**
     * @constant
     */
    expedite: 29,

    /**
     * @constant
     */
    expediteFalse: 0,

    /**
     * @constant
     */
    expediteTrue: 1
  };

/**
 *
 */
module.exports = {
  ids: _ids,
  entries: [
    _param.hr,
    _param.embedded(-1, 'PARAM_INPUTS_GROUP'),
    _param.customId(
      _ids.objectInstanceMode,
      'PARAM_OBJECT_INSTANCE_MODE',
      [
        { id: _ids.objectInstanceModeUseSelf, name: 'SELF' },
        { id: _ids.objectInstanceModeUseParent, name: 'PARENT' }
      ],
      _ids.objectInstanceModeUseSelf
    ),
    _param.br,
    _param.number(_ids.printSpeed, 'PARAM_PRINT_SPEED', 0, { decimals: 3, minimumValue: 0 }),
    _param.br,
    _param.number(_ids.clearSpeed, 'PARAM_CLEAR_SPEED', 0, { decimals: 3, minimumValue: 0 }),
    _param.br,
    _param.json(_ids.messages, 'PARAM_MESSAGES', []),
    _param.br,
    _param.fontId(_ids.overrideFont, 'PARAM_OVERRIDE_FONT'),
    _param.br,
    _param.customId(
      _ids.horizontalTextAlign,
      'PARAM_HORIZONTAL_TEXT_ALIGN',
      [
        { id: _ids.horizontalTextAlignLeft, name: 'LEFT' },
        { id: _ids.horizontalTextAlignCenter, name: 'CENTER' },
        { id: _ids.horizontalTextAlignRight, name: 'RIGHT' }
      ],
      _ids.horizontalTextAlignLeft
    ),
    _param.br,
    _param.customId(
      _ids.verticalTextAlign,
      'PARAM_VERTICAL_TEXT_ALIGN',
      [
        { id: _ids.verticalTextAlignTop, name: 'TOP' },
        { id: _ids.verticalTextAlignCenter, name: 'CENTER' },
        { id: _ids.verticalTextAlignBottom, name: 'BOTTOM' }
      ],
      _ids.verticalTextAlignTop
    ),
    _param.br,
    _param.number(_ids.marginLeft, 'PARAM_MARGIN_LEFT', 0, { decimals: 0, minimumValue: 0 }),
    _param.number(_ids.marginRight, 'PARAM_MARGIN_RIGHT', 0, { decimals: 0, minimumValue: 0 }),
    _param.number(_ids.marginTop, 'PARAM_MARGIN_TOP', 0, { decimals: 0, minimumValue: 0 }),
    _param.number(_ids.marginBottom, 'PARAM_MARGIN_BOTTOM', 0, { decimals: 0, minimumValue: 0 }),
    _param.br,
    _param.number(_ids.colorChannelRed, 'PARAM_COLOR_CHANNEL_RED', 255, {
      decimals: 0,
      minimumValue: 0,
      maximumValue: 255
    }),
    _param.number(_ids.colorChannelGreen, 'PARAM_COLOR_CHANNEL_GREEN', 255, {
      decimals: 0,
      minimumValue: 0,
      maximumValue: 255
    }),
    _param.number(_ids.colorChannelBlue, 'PARAM_COLOR_CHANNEL_BLUE', 255, {
      decimals: 0,
      minimumValue: 0,
      maximumValue: 255
    }),
    _param.number(_ids.opacity, 'PARAM_OPACITY', 1, { decimals: 2, minimumValue: 0, maximumValue: 1 }),
    _param.br,
    _param.number(_ids.scaleX, 'PARAM_SCALE_X_%', 100, { decimals: 0, minimumValue: 0 }),
    _param.number(_ids.scaleY, 'PARAM_SCALE_Y_%', 100, { decimals: 0, minimumValue: 0 }),
    _param.br,
    _param.seId(_ids.printingSfx, 'PARAM_PRINTING_SFX'),
    _param.br,
    _param.customId(
      _ids.horizontalPosition,
      'PARAM_HORIZONTAL_POSITION',
      [
        { id: _ids.horizontalPositionLeft, name: 'LEFT' },
        { id: _ids.horizontalPositionCenter, name: 'CENTER' },
        { id: _ids.horizontalPositionRight, name: 'RIGHT' }
      ],
      _ids.horizontalPositionCenter
    ),
    _param.br,
    _param.customId(
      _ids.verticalPosition,
      'PARAM_VERTICAL_POSITION',
      [
        { id: _ids.verticalPositionTop, name: 'TOP' },
        { id: _ids.verticalPositionCenter, name: 'CENTER' },
        { id: _ids.verticalPositionBottom, name: 'BOTTOM' }
      ],
      _ids.verticalPositionCenter
    ),
    _param.br,
    _param.imageId(_ids.indicatorImage, 'PARAM_INDICATOR_IMAGE'),
    _param.br,
    _param.number(_ids.indicatorImageFrameX, 'PARAM_INDICATOR_IMAGE_FRAME_X', 0, { decimals: 0, minimumValue: 0 }),
    _param.number(_ids.indicatorImageFrameY, 'PARAM_INDICATOR_IMAGE_FRAME_Y', 0, { decimals: 0, minimumValue: 0 }),
    _param.number(_ids.indicatorImageFrameWidth, 'PARAM_INDICATOR_IMAGE_FRAME_WIDTH', 0, {
      decimals: 0,
      minimumValue: 0
    }),
    _param.number(_ids.indicatorImageFrameHeight, 'PARAM_INDICATOR_IMAGE_FRAME_HEIGHT', 0, {
      decimals: 0,
      minimumValue: 0
    }),
    _param.br,
    _param.switchVariableObjectId(_ids.okSwitchSource, 'PARAM_OK_SWITCH_SOURCE', ['SelfObject', 'ParentObject']),
    _param.br,
    _param.switchId(_ids.okSwitch, 'PARAM_OK_SWITCH', _ids.okSwitchSource, true),
    _param.br,
    _param.switchVariableObjectId(_ids.cancelSwitchSource, 'PARAM_CANCEL_SWITCH_SOURCE', [
      'SelfObject',
      'ParentObject'
    ]),
    _param.br,
    _param.switchId(_ids.cancelSwitch, 'PARAM_CANCEL_SWITCH', _ids.CancelSwitchSource, true),
    _param.br,
    _param.customId(
      _ids.expedite,
      'PARAM_EXPEDITE',
      [
        { id: _ids.expediteFalse, name: 'FALSE' },
        { id: _ids.expediteTrue, name: 'TRUE' }
      ],
      _ids.expediteTrue
    ),
    _param.hr
  ]
};
