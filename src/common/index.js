/**
 * Common module. Each plugin will have its own copy of this module.
 *
 * @module dd/common
 */

/**
 * @private
 */
var _pluginApi = require('./plugin');

/**
 * @private
 */
var _localeApi = require('./locale');

/**
 *
 */
module.exports = {
  createPlugin: _pluginApi.create,
  paramHelper: _pluginApi.params,
  getInternalData: _pluginApi.getData,
  getLocaleCode: _localeApi.getCode,
  resolveLocaleKey: _localeApi.resolveKey
};
