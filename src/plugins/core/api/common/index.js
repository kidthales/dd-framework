/**
 * Core plugin API common switch & variable module.
 *
 * @module    dd.core.common
 * @author    kidthales <kidthales@agogpixel.com>
 * @copyright 2023 kidthales
 * @license   {@link https://github.com/kidthales/dd-framework/blob/main/LICENSE.txt | MIT License}
 */

/**
 * Exposes methods for working with common switches & variables.
 */
module.exports = {
  /**
   * {@linkcode "dd.core.common.resolveSwitch" | dd.core.common.resolveSwitch}
   */
  resolveSwitch: require('./resolve-switch'),

  /**
   * {@linkcode "dd.core.common.resolveSwitchValue" | dd.core.common.resolveSwitchValue}
   */
  resolveSwitchValue: require('./resolve-switch-value'),

  /**
   * {@linkcode "dd.core.common.resolveVariable" | dd.core.common.resolveVariable}
   */
  resolveVariable: require('./resolve-variable'),

  /**
   * {@linkcode "dd.core.common.resolveVariableValue" | dd.core.common.resolveVariableValue}
   */
  resolveVariableValue: require('./resolve-variable-value')
};
