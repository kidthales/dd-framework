/**
 * Plugin module.
 *
 * @module
 */

/**
 * @private
 */
var _ns = require('@dd/common/plugin/constants').frameworkNamespace,
  /**
   * @private
   */
  _parameters = require('./parameters'),
  /**
   * @private
   */
  _identifier = 'data';

/**
 *
 */
module.exports = require('@dd/common').createPlugin(
  _identifier,
  {
    parameters: _parameters,
    locale: require('./locale')
  },
  {
    onSetParamValue: function (paramValue) {
      if (!window[_ns]) {
        window[_ns] = {};
      }

      window[_ns][_identifier] = JSON.parse(paramValue[_parameters.ids.data]);
    }
  }
);
