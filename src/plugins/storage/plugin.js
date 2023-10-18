/**
 * Plugin module.
 *
 * @module
 */

/**
 *
 */
module.exports = require('@dd/common').createPlugin(
  'storage',
  {
    dependencies: ['core'],
    actionCommands: require('./action-commands'),
    api: require('./api'),
    locale: require('./locale')
  },
  {
    onInitialize: function () {
      dd.core.event.addUpdateEventListener(function () {
        require('./api/update')();
      });
      // TODO: Check error...
    }
  }
);
