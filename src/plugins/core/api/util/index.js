/**
 * Core plugin API utility module.
 *
 * @module    dd.core.util
 * @author    kidthales <kidthales@agogpixel.com>
 * @copyright 2023 kidthales
 * @license   {@link https://github.com/kidthales/dd-framework/blob/main/LICENSE.txt | MIT License}
 */

/**
 * Exposes utility methods for working with various aspects of the PGMMV script API.
 */
module.exports = {
  /**
   * {@linkcode "dd.core.util.resolveSwitch" | dd.core.util.resolveSwitch}
   */
  resolveSwitch: require('./resolve-switch'),

  /**
   * {@linkcode "dd.core.util.resolveSwitchFromSwitchVariableObject" | dd.core.util.resolveSwitchFromSwitchVariableObject}
   */
  resolveSwitchFromSwitchVariableObject: require('./resolve-switch-from-switch-variable-object'),

  /**
   * {@linkcode "dd.core.util.resolveSwitchValue" | dd.core.util.resolveSwitchValue}
   */
  resolveSwitchValue: require('./resolve-switch-value'),

  /**
   * {@linkcode "dd.core.util.resolveSwitchVariableObject" | dd.core.util.resolveSwitchVariableObject}
   */
  resolveSwitchVariableObject: require('./resolve-switch-variable-object'),

  /**
   * {@linkcode "dd.core.util.resolveTexture" | dd.core.util.resolveTexture}
   */
  resolveTexture: require('./resolve-texture'),

  /**
   * {@linkcode "dd.core.util.resolveVariable" | dd.core.util.resolveVariable}
   */
  resolveVariable: require('./resolve-variable'),

  /**
   * {@linkcode "dd.core.util.resolveVariableFromSwitchVariableObject" | dd.core.util.resolveVariableFromSwitchVariableObject}
   */
  resolveVariableFromSwitchVariableObject: require('./resolve-variable-from-switch-variable-object'),

  /**
   * {@linkcode "dd.core.util.resolveVariableValue" | dd.core.util.resolveVariableValue}
   */
  resolveVariableValue: require('./resolve-variable-value')
};
