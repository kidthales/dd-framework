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
    tileRectXVariable,
    /** @type {import('@pgmmv/agtk/variables/variable').AgtkVariable|import('@pgmmv/agtk/object-instances/object-instance/variables/variable').AgtkVariable|undefined} */
    tileRectYVariable,
    /** @type {import('@pgmmv/agtk/variables/variable').AgtkVariable|import('@pgmmv/agtk/object-instances/object-instance/variables/variable').AgtkVariable|undefined} */
    tileRectWidthVariable,
    /** @type {import('@pgmmv/agtk/variables/variable').AgtkVariable|import('@pgmmv/agtk/object-instances/object-instance/variables/variable').AgtkVariable|undefined} */
    tileRectHeightVariable;

  if (!objectInstance) {
    require('../../api/log')
      .createLinkConditionLogger(payload, 'LC_IN_TILE_RECT_002_NAME')
      .error(require('@dd/common').resolveLocaleKey('ERROR_OBJECT_INSTANCE_MISSING'));
    return false;
  }

  tileRectXVariable = resolveVariableFromSwitchVariableObject(
    payload.param[paramIds.tileRectXVariableSource],
    payload.param[paramIds.tileRectXVariable],
    objectInstance.id
  );

  if (!tileRectXVariable) {
    require('../../api/log')
      .createLinkConditionLogger(payload, 'LC_IN_TILE_RECT_002_NAME')
      .error(require('@dd/common').resolveLocaleKey('ERROR_X_VARIABLE_MISSING'));
    return false;
  }

  tileRectYVariable = resolveVariableFromSwitchVariableObject(
    payload.param[paramIds.tileRectYVariableSource],
    payload.param[paramIds.tileRectYVariable],
    objectInstance.id
  );

  if (!tileRectYVariable) {
    require('../../api/log')
      .createLinkConditionLogger(payload, 'LC_IN_TILE_RECT_002_NAME')
      .error(require('@dd/common').resolveLocaleKey('ERROR_Y_VARIABLE_MISSING'));
    return false;
  }

  tileRectWidthVariable = resolveVariableFromSwitchVariableObject(
    payload.param[paramIds.tileRectWidthVariableSource],
    payload.param[paramIds.tileRectWidthVariable],
    objectInstance.id
  );

  if (!tileRectWidthVariable) {
    require('../../api/log')
      .createLinkConditionLogger(payload, 'LC_IN_TILE_RECT_002_NAME')
      .error(require('@dd/common').resolveLocaleKey('ERROR_WIDTH_VARIABLE_MISSING'));
    return false;
  }

  tileRectHeightVariable = resolveVariableFromSwitchVariableObject(
    payload.param[paramIds.tileRectHeightVariableSource],
    payload.param[paramIds.tileRectHeightVariable],
    objectInstance.id
  );

  if (!tileRectHeightVariable) {
    require('../../api/log')
      .createLinkConditionLogger(payload, 'LC_IN_TILE_RECT_002_NAME')
      .error(require('@dd/common').resolveLocaleKey('ERROR_HEIGHT_VARIABLE_MISSING'));
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
