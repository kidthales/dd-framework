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
    tileRectXVariable,
    /** @type {import('@pgmmv/agtk/variables/variable').AgtkVariable|import('@pgmmv/agtk/object-instances/object-instance/variables/variable').AgtkVariable|undefined} */
    tileRectYVariable,
    /** @type {import('@pgmmv/agtk/variables/variable').AgtkVariable|import('@pgmmv/agtk/object-instances/object-instance/variables/variable').AgtkVariable|undefined} */
    tileRectWidthVariable,
    /** @type {import('@pgmmv/agtk/variables/variable').AgtkVariable|import('@pgmmv/agtk/object-instances/object-instance/variables/variable').AgtkVariable|undefined} */
    tileRectHeightVariable;

  if (!objectInstance) {
    return false;
  }

  tileRectXVariable = dd.core.util.resolveVariableFromSwitchVariableObject(
    payload.param[paramIds.tileRectXVariableSource],
    payload.param[paramIds.tileRectXVariable],
    objectInstance.id
  );

  if (!tileRectXVariable) {
    return false;
  }

  tileRectYVariable = dd.core.util.resolveVariableFromSwitchVariableObject(
    payload.param[paramIds.tileRectYVariableSource],
    payload.param[paramIds.tileRectYVariable],
    objectInstance.id
  );

  if (!tileRectYVariable) {
    return false;
  }

  tileRectWidthVariable = dd.core.util.resolveVariableFromSwitchVariableObject(
    payload.param[paramIds.tileRectWidthVariableSource],
    payload.param[paramIds.tileRectWidthVariable],
    objectInstance.id
  );

  if (!tileRectWidthVariable) {
    return false;
  }

  tileRectHeightVariable = dd.core.util.resolveVariableFromSwitchVariableObject(
    payload.param[paramIds.tileRectHeightVariableSource],
    payload.param[paramIds.tileRectHeightVariable],
    objectInstance.id
  );

  if (!tileRectHeightVariable) {
    return false;
  }

  return require('../../api/object-instance/in-tile-rect')(
    objectInstance,
    cc.rect(
      tileRectXVariable.getValue(),
      tileRectYVariable.getValue(),
      tileRectWidthVariable.getValue(),
      tileRectHeightVariable.getValue()
    )
  );
};
