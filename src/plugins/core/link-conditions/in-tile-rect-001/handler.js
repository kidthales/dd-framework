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
    );

  if (!objectInstance) {
    return false;
  }

  return require('../../api/object-instance/in-tile-rect')(
    objectInstance,
    cc.rect(
      payload.param[paramIds.tileRectX],
      payload.param[paramIds.tileRectY],
      payload.param[paramIds.tileRectWidth],
      payload.param[paramIds.tileRectHeight]
    )
  );
};
