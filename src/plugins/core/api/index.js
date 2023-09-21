/**
 * Core plugin api module.
 *
 * @module dd/core
 */

/**
 *
 */
module.exports = {
  camera: require('./camera'),
  common: require('./common'),
  coord: require('./coord'),
  event: require('./event'),
  fs: require('./fs'),
  input: require('./input'),
  lock: require('./lock'),
  log: require('./log'),
  object: require('./object'),
  objectInstance: require('./object-instance'),
  string: require('./string'),
  time: require('./time'),
  ui: require('./ui'),
  util: require('./util')
};
