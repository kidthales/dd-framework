/**
 * Plugin module.
 *
 * @module dd/common/plugin
 */
module.exports = {
  create: require('./create'),
  params: require('./params'),
  getData: require('./data').getData
};
