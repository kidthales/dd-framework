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
    logLevel: 1,

    /**
     * @constant
     */
    logLevelDebug: 1,

    /**
     * @constant
     */
    logLevelInfo: 2,

    /**
     * @constant
     */
    logLevelWarn: 3,

    /**
     * @constant
     */
    logLevelError: 4,

    /**
     * @constant
     */
    logLevelCritical: 5,

    /**
     * @constant
     */
    jsonIndentSize: 2,

    /**
     * @constant
     */
    jsonStringifyFunctions: 3,

    /**
     * @constant
     */
    jsonStringifyFunctionsNever: 1,

    /**
     * @constant
     */
    jsonStringifyFunctionsDebugOnly: 2,

    /**
     * @constant
     */
    jsonStringifyFunctionsAlways: 3,

    /**
     * @constant
     */
    writeLogFiles: 4,

    /**
     * @constant
     */
    writeLogFilesOff: 1,

    /**
     * @constant
     */
    writeLogFilesOn: 2,

    /**
     * @constant
     */
    operationKeyOff: 1,

    /**
     * @constant
     */
    operationKeyOn: 2,

    /**
     * @constant
     */
    operationKeyA: 5,

    /**
     * @constant
     */
    operationKeyB: 6,

    /**
     * @constant
     */
    operationKeyX: 7,

    /**
     * @constant
     */
    operationKeyY: 8,

    /**
     * @constant
     */
    operationKeyR1: 9,

    /**
     * @constant
     */
    operationKeyR2: 10,

    /**
     * @constant
     */
    operationKeyL1: 11,

    /**
     * @constant
     */
    operationKeyL2: 12,

    /**
     * @constant
     */
    operationKeyUp: 13,

    /**
     * @constant
     */
    operationKeyDown: 14,

    /**
     * @constant
     */
    operationKeyLeft: 15,

    /**
     * @constant
     */
    operationKeyRight: 16,

    /**
     * @constant
     */
    operationKeyLeftStickUp: 17,

    /**
     * @constant
     */
    operationKeyLeftStickDown: 18,

    /**
     * @constant
     */
    operationKeyLeftStickLeft: 19,

    /**
     * @constant
     */
    operationKeyLeftStickRight: 20,

    /**
     * @constant
     */
    operationKeyRightStickUp: 21,

    /**
     * @constant
     */
    operationKeyRightStickDown: 22,

    /**
     * @constant
     */
    operationKeyRightStickLeft: 23,

    /**
     * @constant
     */
    operationKeyRightStickRight: 24,

    /**
     * @constant
     */
    operationKeyLeftClick: 25,

    /**
     * @constant
     */
    operationKeyRightClick: 26,

    /**
     * @constant
     */
    operationKeyStart: 27,

    /**
     * @constant
     */
    operationKeySelect: 28,

    /**
     * @constant
     */
    operationKeyHome: 29,

    /**
     * @constant
     */
    operationKeyOk: 30,

    /**
     * @constant
     */
    operationKeyCancel: 31,

    /**
     * @constant
     */
    reservedKeyCodePcOff: 1,

    /**
     * @constant
     */
    reservedKeyCodePcOn: 2,

    /**
     * @constant
     */
    reservedKeyCodePc_W: 32,

    /**
     * @constant
     */
    reservedKeyCodePc_A: 33,

    /**
     * @constant
     */
    reservedKeyCodePc_S: 34,

    /**
     * @constant
     */
    reservedKeyCodePc_D: 35,

    /**
     * @constant
     */
    reservedKeyCodePc_LeftClick: 36,

    /**
     * @constant
     */
    reservedKeyCodePc_RightClick: 37,

    /**
     * @constant
     */
    reservedKeyCodePc_Up: 38,

    /**
     * @constant
     */
    reservedKeyCodePc_Right: 39,

    /**
     * @constant
     */
    reservedKeyCodePc_Down: 40,

    /**
     * @constant
     */
    reservedKeyCodePc_Left: 41,

    /**
     * @constant
     */
    reservedKeyCodePc_MiddleClick: 42,

    /**
     * @constant
     */
    reservedKeyCodePc_WheelUp: 43,

    /**
     * @constant
     */
    reservedKeyCodePc_WheelDown: 44,

    /**
     * @constant
     */
    reservedKeyCodePc_MousePointer: 45
  },
  /**
   * @constant
   * @private
   */
  _operationKeyPairs = [
    [_ids.operationKeyA, 'PLUGIN_PARAM_OPERATION_KEY_A'],
    [_ids.operationKeyB, 'PLUGIN_PARAM_OPERATION_KEY_B'],
    [_ids.operationKeyX, 'PLUGIN_PARAM_OPERATION_KEY_X'],
    [_ids.operationKeyY, 'PLUGIN_PARAM_OPERATION_KEY_Y'],
    [_ids.operationKeyR1, 'PLUGIN_PARAM_OPERATION_KEY_R1'],
    [_ids.operationKeyR2, 'PLUGIN_PARAM_OPERATION_KEY_R2'],
    [_ids.operationKeyL1, 'PLUGIN_PARAM_OPERATION_KEY_L1'],
    [_ids.operationKeyL2, 'PLUGIN_PARAM_OPERATION_KEY_L2'],
    [_ids.operationKeyUp, 'PLUGIN_PARAM_OPERATION_KEY_UP'],
    [_ids.operationKeyDown, 'PLUGIN_PARAM_OPERATION_KEY_DOWN'],
    [_ids.operationKeyLeft, 'PLUGIN_PARAM_OPERATION_KEY_LEFT'],
    [_ids.operationKeyRight, 'PLUGIN_PARAM_OPERATION_KEY_RIGHT'],
    [_ids.operationKeyLeftStickUp, 'PLUGIN_PARAM_OPERATION_KEY_LEFT_STICK_UP'],
    [_ids.operationKeyLeftStickDown, 'PLUGIN_PARAM_OPERATION_KEY_LEFT_STICK_DOWN'],
    [_ids.operationKeyLeftStickLeft, 'PLUGIN_PARAM_OPERATION_KEY_LEFT_STICK_LEFT'],
    [_ids.operationKeyLeftStickRight, 'PLUGIN_PARAM_OPERATION_KEY_LEFT_STICK_RIGHT'],
    [_ids.operationKeyRightStickUp, 'PLUGIN_PARAM_OPERATION_KEY_RIGHT_STICK_UP'],
    [_ids.operationKeyRightStickDown, 'PLUGIN_PARAM_OPERATION_KEY_RIGHT_STICK_DOWN'],
    [_ids.operationKeyRightStickLeft, 'PLUGIN_PARAM_OPERATION_KEY_RIGHT_STICK_LEFT'],
    [_ids.operationKeyRightStickRight, 'PLUGIN_PARAM_OPERATION_KEY_RIGHT_STICK_RIGHT'],
    [_ids.operationKeyLeftClick, 'PLUGIN_PARAM_OPERATION_KEY_LEFT_CLICK'],
    [_ids.operationKeyRightClick, 'PLUGIN_PARAM_OPERATION_KEY_RIGHT_CLICK'],
    [_ids.operationKeyStart, 'PLUGIN_PARAM_OPERATION_KEY_START'],
    [_ids.operationKeySelect, 'PLUGIN_PARAM_OPERATION_KEY_SELECT'],
    [_ids.operationKeyHome, 'PLUGIN_PARAM_OPERATION_KEY_HOME'],
    [_ids.operationKeyOk, 'PLUGIN_PARAM_OPERATION_KEY_OK'],
    [_ids.operationKeyCancel, 'PLUGIN_PARAM_OPERATION_KEY_CANCEL']
  ],
  /**
   * @constant
   * @private
   */
  _reservedKeyCodePcPairs = [
    [_ids.reservedKeyCodePc_W, 'PLUGIN_PARAM_RESERVED_KEY_CODE_PC_W'],
    [_ids.reservedKeyCodePc_A, 'PLUGIN_PARAM_RESERVED_KEY_CODE_PC_A'],
    [_ids.reservedKeyCodePc_S, 'PLUGIN_PARAM_RESERVED_KEY_CODE_PC_S'],
    [_ids.reservedKeyCodePc_D, 'PLUGIN_PARAM_RESERVED_KEY_CODE_PC_D'],
    [_ids.reservedKeyCodePc_LeftClick, 'PLUGIN_PARAM_RESERVED_KEY_CODE_PC_LEFT_CLICK'],
    [_ids.reservedKeyCodePc_RightClick, 'PLUGIN_PARAM_RESERVED_KEY_CODE_PC_RIGHT_CLICK'],
    [_ids.reservedKeyCodePc_Up, 'PLUGIN_PARAM_RESERVED_KEY_CODE_PC_UP'],
    [_ids.reservedKeyCodePc_Right, 'PLUGIN_PARAM_RESERVED_KEY_CODE_PC_RIGHT'],
    [_ids.reservedKeyCodePc_Down, 'PLUGIN_PARAM_RESERVED_KEY_CODE_PC_DOWN'],
    [_ids.reservedKeyCodePc_Left, 'PLUGIN_PARAM_RESERVED_KEY_CODE_PC_LEFT'],
    [_ids.reservedKeyCodePc_MiddleClick, 'PLUGIN_PARAM_RESERVED_KEY_CODE_PC_MIDDLE_CLICK'],
    [_ids.reservedKeyCodePc_WheelUp, 'PLUGIN_PARAM_RESERVED_KEY_CODE_PC_WHEEL_UP'],
    [_ids.reservedKeyCodePc_WheelDown, 'PLUGIN_PARAM_RESERVED_KEY_CODE_PC_WHEEL_DOWN'],
    [_ids.reservedKeyCodePc_MousePointer, 'PLUGIN_PARAM_RESERVED_KEY_CODE_PC_MOUSE_POINTER']
  ],
  /**
   * @returns {import('@pgmmv/agtk/plugins/plugin/parameter').AgtkCustomIdParameter[]}
   * @private
   */
  _createOperationKeyCustomIdParams = function () {
    /** @type {import('@pgmmv/agtk/plugins/plugin/parameter').AgtkCustomIdParameter[]} */
    var params = [],
      /** @type {[number, string]} */
      pair,
      len = _operationKeyPairs.length,
      /** @type {number} */
      i;

    for (i = 0; i < len; ++i) {
      pair = _operationKeyPairs[i];

      params.push(
        _paramHelper.customId(
          pair[0],
          pair[1],
          [
            { id: _ids.operationKeyOff, name: 'OFF' },
            { id: _ids.operationKeyOn, name: 'ON' }
          ],
          _ids.operationKeyOff
        )
      );

      if (i < len - 1) {
        params.push(_paramHelper.br);
      }
    }

    return params;
  },
  /**
   * @returns {import('@pgmmv/agtk/plugins/plugin/parameter').AgtkCustomIdParameter[]}
   * @private
   */
  _createReservedKeyCodePcCustomIdParams = function () {
    /** @type {import('@pgmmv/agtk/plugins/plugin/parameter').AgtkCustomIdParameter[]} */
    var params = [],
      /** @type {[number, string]} */
      pair,
      len = _reservedKeyCodePcPairs.length,
      /** @type {number} */
      i;

    for (i = 0; i < len; ++i) {
      pair = _reservedKeyCodePcPairs[i];

      params.push(
        _paramHelper.customId(
          pair[0],
          pair[1],
          [
            { id: _ids.reservedKeyCodePcOff, name: 'OFF' },
            { id: _ids.reservedKeyCodePcOn, name: 'ON' }
          ],
          _ids.reservedKeyCodePcOff
        )
      );

      if (i < len - 1) {
        params.push(_paramHelper.br);
      }
    }

    return params;
  };

/**
 *
 */
module.exports = {
  ids: _ids,
  entries: [
    _paramHelper.hr,
    _paramHelper.embedded(-1, 'PLUGIN_PARAM_LOG_GROUP'),
    _paramHelper.customId(
      _ids.logLevel,
      'PARAM_LOG_LEVEL',
      [
        { id: _ids.logLevelDebug, name: 'DEBUG' },
        { id: _ids.logLevelInfo, name: 'INFO' },
        { id: _ids.logLevelWarn, name: 'WARN' },
        { id: _ids.logLevelError, name: 'ERROR' },
        { id: _ids.logLevelCritical, name: 'CRITICAL' }
      ],
      _ids.logLevelInfo
    ),
    _paramHelper.br,
    _paramHelper.number(_ids.jsonIndentSize, 'PLUGIN_PARAM_JSON_INDENT_SIZE', 2, {
      decimals: 0,
      minimumValue: 0,
      maximumValue: 8
    }),
    _paramHelper.br,
    _paramHelper.customId(
      _ids.jsonStringifyFunctions,
      'PLUGIN_PARAM_JSON_STRINGIFY_FUNCTIONS',
      [
        { id: _ids.jsonStringifyFunctionsNever, name: 'NEVER' },
        { id: _ids.jsonStringifyFunctionsDebugOnly, name: 'DEBUG_ONLY' },
        { id: _ids.jsonStringifyFunctionsAlways, name: 'ALWAYS' }
      ],
      _ids.jsonStringifyFunctionsDebugOnly
    ),
    _paramHelper.br,
    _paramHelper.customId(
      _ids.writeLogFiles,
      'PLUGIN_PARAM_WRITE_LOG_FILES',
      [
        { id: _ids.writeLogFilesOff, name: 'OFF' },
        { id: _ids.writeLogFilesOn, name: 'ON' }
      ],
      _ids.writeLogFilesOff
    ),
    _paramHelper.hr,
    _paramHelper.embedded(-1, 'PLUGIN_PARAM_INPUT_GROUP')
  ]
    .concat(_createOperationKeyCustomIdParams())
    .concat([_paramHelper.br])
    .concat(_createReservedKeyCodePcCustomIdParams())
    .concat([_paramHelper.hr])
};
