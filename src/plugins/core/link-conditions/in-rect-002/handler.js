/**
 * Handler module.
 *
 * @module
 */

/**
 * @param {import('@dd/common/plugin/types').LinkConditionPayload} payload
 * @returns {boolean}
 */
module.exports = function handler(payload) {
  var paramIds = require('./parameters').ids,
    objectInstance = require('../../api/util/resolve-switch-variable-object')(
      payload.param[paramIds.objectInstanceMode],
      payload.instanceId
    ),
    resolveVariableFromSwitchVariableObject = require('../../api/util/resolve-variable-from-switch-variable-object'),
    /** @type {import('@pgmmv/agtk/variables/variable').AgtkVariable|import('@pgmmv/agtk/object-instances/object-instance/variables/variable').AgtkVariable|undefined} */
    rectXVariable,
    /** @type {import('@pgmmv/agtk/variables/variable').AgtkVariable|import('@pgmmv/agtk/object-instances/object-instance/variables/variable').AgtkVariable|undefined} */
    rectYVariable,
    /** @type {import('@pgmmv/agtk/variables/variable').AgtkVariable|import('@pgmmv/agtk/object-instances/object-instance/variables/variable').AgtkVariable|undefined} */
    rectWidthVariable,
    /** @type {import('@pgmmv/agtk/variables/variable').AgtkVariable|import('@pgmmv/agtk/object-instances/object-instance/variables/variable').AgtkVariable|undefined} */
    rectHeightVariable;

  if (!objectInstance) {
    require('../../api/log')
      .createLinkConditionLogger(payload, 'LC_IN_RECT_002_NAME')
      .error(require('@dd/common').resolveLocaleKey('ERROR_OBJECT_INSTANCE_MISSING'));
    return false;
  }

  rectXVariable = resolveVariableFromSwitchVariableObject(
    payload.param[paramIds.rectXVariableSource],
    payload.param[paramIds.rectXVariable],
    objectInstance.id
  );

  if (!rectXVariable) {
    require('../../api/log')
      .createLinkConditionLogger(payload, 'LC_IN_RECT_002_NAME')
      .error(require('@dd/common').resolveLocaleKey('ERROR_X_VARIABLE_MISSING'));
    return false;
  }

  rectYVariable = resolveVariableFromSwitchVariableObject(
    payload.param[paramIds.rectYVariableSource],
    payload.param[paramIds.rectYVariable],
    objectInstance.id
  );

  if (!rectYVariable) {
    require('../../api/log')
      .createLinkConditionLogger(payload, 'LC_IN_RECT_002_NAME')
      .error(require('@dd/common').resolveLocaleKey('ERROR_Y_VARIABLE_MISSING'));
    return false;
  }

  rectWidthVariable = resolveVariableFromSwitchVariableObject(
    payload.param[paramIds.rectWidthVariableSource],
    payload.param[paramIds.rectWidthVariable],
    objectInstance.id
  );

  if (!rectWidthVariable) {
    require('../../api/log')
      .createLinkConditionLogger(payload, 'LC_IN_RECT_002_NAME')
      .error(require('@dd/common').resolveLocaleKey('ERROR_WIDTH_VARIABLE_MISSING'));
    return false;
  }

  rectHeightVariable = resolveVariableFromSwitchVariableObject(
    payload.param[paramIds.rectHeightVariableSource],
    payload.param[paramIds.rectHeightVariable],
    objectInstance.id
  );

  if (!rectHeightVariable) {
    require('../../api/log')
      .createLinkConditionLogger(payload, 'LC_IN_RECT_002_NAME')
      .error(require('@dd/common').resolveLocaleKey('ERROR_HEIGHT_VARIABLE_MISSING'));
    return false;
  }

  return require('../../api/object-instance/in-rect')(
    objectInstance,
    cc.rect(
      rectXVariable.getValue(),
      rectYVariable.getValue(),
      rectWidthVariable.getValue(),
      rectHeightVariable.getValue()
    )
  );
};
