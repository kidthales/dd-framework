/**
 * Common plugin dependencies module.
 *
 * @module    @dd/common/plugin/deps
 * @author    kidthales <kidthales@agogpixel.com>
 * @copyright 2023 kidthales
 * @license   {@link https://github.com/kidthales/dd-framework/blob/main/LICENSE.txt | MIT License}
 */

/**
 * Exposes methods for basic plugin dependency management.
 */
module.exports = {
  /**
   * @see {@link "@dd/common/plugin/deps/set-dependencies" | @dd/common/plugin/deps/set-dependencies}
   */
  setDependencies: require('./set-dependencies'),

  /**
   * @see {@link "@dd/common/plugin/deps/is-missing-dependencies" | @dd/common/plugin/deps/is-missing-dependencies}
   */
  isMissingDependencies: require('./is-missing-dependencies'),

  /**
   * @see {@link "@dd/common/plugin/deps/on-dependency-initialized" | @dd/common/plugin/deps/on-dependency-initialized}
   */
  onDependencyInitialized: require('./on-dependency-initialized')
};
