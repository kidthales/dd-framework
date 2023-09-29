/**
 * Dank Developer Framework: Common Module.
 *
 * Each plugin will have its own copy of this module.
 *
 * @module    @dd/common
 * @author    kidthales <kidthales@agogpixel.com>
 * @copyright 2023 kidthales
 * @license   {@link https://github.com/kidthales/dd-framework/blob/main/LICENSE.txt | MIT License}
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
 * Exposes methods & properties necessary for basic plugin & locale
 * functionality.
 *
 * Only accessible from within a plugin's implementation.
 * ```js
 * var commonApi = require('@dd/common');
 * ```
 */
module.exports = {
  /**
   * @see {@link "@dd/common/plugin/create" | @dd/common/plugin/create}
   */
  createPlugin: _pluginApi.create,

  /**
   * @see {@link "@dd/common/plugin/params" | @dd/common/plugin/params}
   */
  paramHelper: _pluginApi.params,

  /**
   * @see {@link "@dd/common/plugin/data" | @dd/common/plugin/data}
   */
  getInternalData: _pluginApi.getData,
  getLocaleCode: _localeApi.getCode,
  resolveLocaleKey: _localeApi.resolveKey
};
