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
    require('../../api/log')
      .createLinkConditionLogger(payload, 'LC_IN_RECT_001_NAME')
      .error(require('@dd/common').resolveLocaleKey('ERROR_OBJECT_INSTANCE_MISSING'));
    return false;
  }

  return require('../../api/object-instance/in-rect')(
    objectInstance,
    cc.rect(
      payload.param[paramIds.rectX],
      payload.param[paramIds.rectY],
      payload.param[paramIds.rectWidth],
      payload.param[paramIds.rectHeight]
    )
  );
};
