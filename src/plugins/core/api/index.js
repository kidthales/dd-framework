/**
 * Core plugin api module.
 *
 * @module dd/core
 */

/**
 *
 */
module.exports = {
  common: require('./common'),
  coord: require('./coord'),
  event: require('./event'),
  font: require('./font'),
  fs: require('./fs'),
  input: require('./input'),
  lock: require('./lock'),
  log: require('./log'),
  object: require('./object'),
  objectInstance: require('./object-instance'),
  string: require('./string'),
  text: require('./text'),
  time: require('./time'),
  ui: require('./ui'),
  util: require('./util')
};
