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
    /** @type {import('@pgmmv/agtk/variables/variable').AgtkVariable|import('@pgmmv/agtk/object-instances/object-instance/variables/variable').AgtkVariable|undefined} */
    rectXVariable,
    /** @type {import('@pgmmv/agtk/variables/variable').AgtkVariable|import('@pgmmv/agtk/object-instances/object-instance/variables/variable').AgtkVariable|undefined} */
    rectYVariable,
    /** @type {import('@pgmmv/agtk/variables/variable').AgtkVariable|import('@pgmmv/agtk/object-instances/object-instance/variables/variable').AgtkVariable|undefined} */
    rectWidthVariable,
    /** @type {import('@pgmmv/agtk/variables/variable').AgtkVariable|import('@pgmmv/agtk/object-instances/object-instance/variables/variable').AgtkVariable|undefined} */
    rectHeightVariable;

  if (!objectInstance) {
    return false;
  }

  rectXVariable = dd.core.util.resolveVariableFromSwitchVariableObject(
    payload.param[paramIds.rectXVariableSource],
    payload.param[paramIds.rectXVariable],
    objectInstance.id
  );

  if (!rectXVariable) {
    return false;
  }

  rectYVariable = dd.core.util.resolveVariableFromSwitchVariableObject(
    payload.param[paramIds.rectYVariableSource],
    payload.param[paramIds.rectYVariable],
    objectInstance.id
  );

  if (!rectYVariable) {
    return false;
  }

  rectWidthVariable = dd.core.util.resolveVariableFromSwitchVariableObject(
    payload.param[paramIds.rectWidthVariableSource],
    payload.param[paramIds.rectWidthVariable],
    objectInstance.id
  );

  if (!rectWidthVariable) {
    return false;
  }

  rectHeightVariable = dd.core.util.resolveVariableFromSwitchVariableObject(
    payload.param[paramIds.rectHeightVariableSource],
    payload.param[paramIds.rectHeightVariable],
    objectInstance.id
  );

  if (!rectHeightVariable) {
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
