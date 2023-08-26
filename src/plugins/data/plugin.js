/**
 * @private
 */
var _commonApi = require('@dd/common'),
  /**
   * @private
   */
  _ns = require('@dd/common/plugin/constants').frameworkNamespace,
  /**
   * @private
   */
  _parameters = require('./parameters'),
  /**
   * @private
   */
  _identifier = 'data',
  /**
   *
   */
  plugin = _commonApi.createPlugin(
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

module.exports = plugin;
