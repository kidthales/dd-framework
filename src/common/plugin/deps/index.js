/**
 * @module @dd/common/plugin/events
 */
module.exports = {
  setDependencies: require('./set-dependencies'),
  isMissingDependencies: require('./is-missing-dependencies'),
  onDependencyInitialized: require('./on-dependency-initialized')
};
