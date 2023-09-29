/**
 * Core plugin API object module.
 *
 * @module    dd.core.object
 * @author    kidthales <kidthales@agogpixel.com>
 * @copyright 2023 kidthales
 * @license   {@link https://github.com/kidthales/dd-framework/blob/main/LICENSE.txt | MIT License}
 */

/**
 * Exposes methods for working with PGMMV objects.
 */
module.exports = {
  /**
   * {@linkcode "dd.core.object.resolve" | dd.core.object.resolve}
   */
  resolve: require('./resolve'),

  /**
   * {@linkcode "dd.core.object.resolveAction" | dd.core.object.resolveAction}
   */
  resolveAction: require('./resolve-action'),

  /**
   * {@linkcode "dd.core.object.resolveActions" | dd.core.object.resolveActions}
   */
  resolveActions: require('./resolve-actions'),

  /**
   * {@linkcode "dd.core.object.resolveBullet" | dd.core.object.resolveBullet}
   */
  resolveBullet: require('./resolve-bullet'),

  /**
   * {@linkcode "dd.core.object.resolveBullets" | dd.core.object.resolveBullets}
   */
  resolveBullets: require('./resolve-bullets'),

  /**
   * {@linkcode "dd.core.object.resolveSwitch" | dd.core.object.resolveSwitch}
   */
  resolveSwitch: require('./resolve-switch'),

  /**
   * {@linkcode "dd.core.object.resolveSwitches" | dd.core.object.resolveSwitches}
   */
  resolveSwitches: require('./resolve-switches'),

  /**
   * {@linkcode "dd.core.object.resolveVariable" | dd.core.object.resolveVariable}
   */
  resolveVariable: require('./resolve-variable'),

  /**
   * {@linkcode "dd.core.object.resolveVariables" | dd.core.object.resolveVariables}
   */
  resolveVariables: require('./resolve-variables'),

  /**
   * {@linkcode "dd.core.object.resolveViewport" | dd.core.object.resolveViewport}
   */
  resolveViewport: require('./resolve-viewport'),

  /**
   * {@linkcode "dd.core.object.resolveViewports" | dd.core.object.resolveViewports}
   */
  resolveViewports: require('./resolve-viewports')
};
