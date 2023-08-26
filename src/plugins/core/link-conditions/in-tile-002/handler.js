/**
 * @param {import('@dd/common/plugin/types').LinkConditionPayload} payload
 * @returns {boolean}
 */
module.exports = function handler(
  /** @type {import('@dd/common/plugin/types').LinkConditionPayload} */
  payload
) {
  var paramIds = require('./parameters').ids,
    objectInstance = require('../../api/util/resolve-switch-variable-object')(
      payload.param[paramIds.objectInstanceMode],
      payload.instanceId
    ),
    /** @type {import('@pgmmv/agtk/variables/variable').AgtkVariable|import('@pgmmv/agtk/object-instances/object-instance/variables/variable').AgtkVariable|undefined} */
    tileXVariable,
    /** @type {import('@pgmmv/agtk/variables/variable').AgtkVariable|import('@pgmmv/agtk/object-instances/object-instance/variables/variable').AgtkVariable|undefined} */
    tileYVariable;

  if (!objectInstance) {
    return false;
  }

  tileXVariable = dd.core.util.resolveVariableFromSwitchVariableObject(
    payload.param[paramIds.tileXVariableSource],
    payload.param[paramIds.tileXVariable],
    objectInstance.id
  );

  if (!tileXVariable) {
    return false;
  }

  tileYVariable = dd.core.util.resolveVariableFromSwitchVariableObject(
    payload.param[paramIds.tileYVariableSource],
    payload.param[paramIds.tileYVariable],
    objectInstance.id
  );

  if (!tileYVariable) {
    return false;
  }

  return require('../../api/object-instance/in-tile')(
    objectInstance,
    tileXVariable.getValue(),
    tileYVariable.getValue()
  );
};
