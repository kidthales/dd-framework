/**
 * Handler module.
 *
 * @module
 */

/**
 * @param {import('@dd/common/plugin/types').ActionCommandPayload} payload
 * @returns {import('@pgmmv/agtk/constants/action-commands/command-behavior').AgtkCommandBehavior['CommandBehaviorNext']} Command behavior 'next'.
 */
module.exports = function handler(payload) {
  var paramIds = require('./parameters').ids,
    objectInstance = require('../../api/util/resolve-switch-variable-object')(
      payload.param[paramIds.objectInstanceMode],
      payload.instanceId
    ),
    resolveVariableFromSwitchVariableObject = require('../../api/util/resolve-variable-from-switch-variable-object'),
    /** @type {import('@pgmmv/agtk/variables/variable').AgtkVariable|import('@pgmmv/agtk/object-instances/object-instance/variables/variable').AgtkVariable|undefined} */
    inputXVariable,
    /** @type {import('@pgmmv/agtk/variables/variable').AgtkVariable|import('@pgmmv/agtk/object-instances/object-instance/variables/variable').AgtkVariable|undefined} */
    inputYVariable,
    /** @type {import('@pgmmv/agtk/variables/variable').AgtkVariable|import('@pgmmv/agtk/object-instances/object-instance/variables/variable').AgtkVariable|undefined} */
    outputXVariable,
    /** @type {import('@pgmmv/agtk/variables/variable').AgtkVariable|import('@pgmmv/agtk/object-instances/object-instance/variables/variable').AgtkVariable|undefined} */
    outputYVariable,
    /** @type {import('@pgmmv/cc/point').CCPoint|undefined} */
    position;

  if (!objectInstance) {
    require('../../api/log')
      .createActionCommandLogger(payload, 'AC_WORLD_TO_CAMERA_001_NAME')
      .error(require('@dd/common').resolveLocaleKey('ERROR_OBJECT_INSTANCE_MISSING'));
    return Agtk.constants.actionCommands.commandBehavior.CommandBehaviorNext;
  }

  inputXVariable = resolveVariableFromSwitchVariableObject(
    payload.param[paramIds.inputXVariableSource],
    payload.param[paramIds.inputXVariable],
    objectInstance.id
  );

  if (!inputXVariable) {
    require('../../api/log')
      .createActionCommandLogger(payload, 'AC_WORLD_TO_CAMERA_001_NAME')
      .error(require('@dd/common').resolveLocaleKey('ERROR_INPUT_X_VARIABLE_MISSING'));
    return Agtk.constants.actionCommands.commandBehavior.CommandBehaviorNext;
  }

  inputYVariable = resolveVariableFromSwitchVariableObject(
    payload.param[paramIds.inputYVariableSource],
    payload.param[paramIds.inputYVariable],
    objectInstance.id
  );

  if (!inputYVariable) {
    require('../../api/log')
      .createActionCommandLogger(payload, 'AC_WORLD_TO_CAMERA_001_NAME')
      .error(require('@dd/common').resolveLocaleKey('ERROR_INPUT_Y_VARIABLE_MISSING'));
    return Agtk.constants.actionCommands.commandBehavior.CommandBehaviorNext;
  }

  outputXVariable = resolveVariableFromSwitchVariableObject(
    payload.param[paramIds.outputXVariableSource],
    payload.param[paramIds.outputXVariable],
    objectInstance.id
  );

  if (!outputXVariable) {
    require('../../api/log')
      .createActionCommandLogger(payload, 'AC_WORLD_TO_CAMERA_001_NAME')
      .error(require('@dd/common').resolveLocaleKey('ERROR_OUTPUT_X_VARIABLE_MISSING'));
    return Agtk.constants.actionCommands.commandBehavior.CommandBehaviorNext;
  }

  outputYVariable = resolveVariableFromSwitchVariableObject(
    payload.param[paramIds.outputYVariableSource],
    payload.param[paramIds.outputYVariable],
    objectInstance.id
  );

  if (!outputYVariable) {
    require('../../api/log')
      .createActionCommandLogger(payload, 'AC_WORLD_TO_CAMERA_001_NAME')
      .error(require('@dd/common').resolveLocaleKey('ERROR_OUTPUT_Y_VARIABLE_MISSING'));
    return Agtk.constants.actionCommands.commandBehavior.CommandBehaviorNext;
  }

  position = require('../../api/coord/world-position-to-camera')(inputXVariable.getValue(), inputYVariable.getValue());

  outputXVariable.setValue(position.x);
  outputYVariable.setValue(position.y);

  return Agtk.constants.actionCommands.commandBehavior.CommandBehaviorNext;
};
