/**
 * Dependencies module.
 *
 * @module dd/common/plugin/deps
 */

/**
 *
 */
module.exports = {
  setDependencies: require('./set-dependencies'),
  isMissingDependencies: require('./is-missing-dependencies'),
  onDependencyInitialized: require('./on-dependency-initialized')
};
