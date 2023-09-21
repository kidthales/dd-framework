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
    tileXVariable,
    /** @type {import('@pgmmv/agtk/variables/variable').AgtkVariable|import('@pgmmv/agtk/object-instances/object-instance/variables/variable').AgtkVariable|undefined} */
    tileYVariable;

  if (!objectInstance) {
    require('../../api/log')
      .createLinkConditionLogger(payload, 'LC_IN_TILE_002_NAME')
      .error(require('@dd/common').resolveLocaleKey('ERROR_OBJECT_INSTANCE_MISSING'));
    return false;
  }

  tileXVariable = resolveVariableFromSwitchVariableObject(
    payload.param[paramIds.tileXVariableSource],
    payload.param[paramIds.tileXVariable],
    objectInstance.id
  );

  if (!tileXVariable) {
    require('../../api/log')
      .createLinkConditionLogger(payload, 'LC_IN_TILE_002_NAME')
      .error(require('@dd/common').resolveLocaleKey('ERROR_X_VARIABLE_MISSING'));
    return false;
  }

  tileYVariable = resolveVariableFromSwitchVariableObject(
    payload.param[paramIds.tileYVariableSource],
    payload.param[paramIds.tileYVariable],
    objectInstance.id
  );

  if (!tileYVariable) {
    require('../../api/log')
      .createLinkConditionLogger(payload, 'LC_IN_TILE_002_NAME')
      .error(require('@dd/common').resolveLocaleKey('ERROR_Y_VARIABLE_MISSING'));
    return false;
  }

  return require('../../api/object-instance/in-tile')(
    objectInstance,
    tileXVariable.getValue(),
    tileYVariable.getValue()
  );
};
