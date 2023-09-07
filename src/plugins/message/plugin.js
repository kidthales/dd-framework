/**
 * Plugin module.
 *
 * @module
 */

/**
 *
 */
module.exports = require('@dd/common').createPlugin(
  'message',
  {
    dependencies: ['core'],
    actionCommands: require('./action-commands'),
    api: require('./api'),
    locale: require('./locale')
  },
  {}
);
