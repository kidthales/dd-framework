/**
 * Core plugin API object instance module.
 *
 * @module    dd.core.objectInstance
 * @author    kidthales <kidthales@agogpixel.com>
 * @copyright 2023 kidthales
 * @license   {@link https://github.com/kidthales/dd-framework/blob/main/LICENSE.txt | MIT License}
 */

/**
 * Exposes methods for working with PGMMV object instances.
 */
module.exports = {
  /**
   * {@linkcode "dd.core.objectInstance.inRect" | dd.core.objectInstance.inRect}
   */
  inRect: require('./in-rect'),

  /**
   * {@linkcode "dd.core.objectInstance.inTile" | dd.core.objectInstance.inTile}
   */
  inTile: require('./in-tile'),

  /**
   * {@linkcode "dd.core.objectInstance.inTileRect" | dd.core.objectInstance.inTileRect}
   */
  inTileRect: require('./in-tile-rect'),

  /**
   * {@linkcode "dd.core.objectInstance.resolve" | dd.core.objectInstance.resolve}
   */
  resolve: require('./resolve'),

  /**
   * {@linkcode "dd.core.objectInstance.resolveParent" | dd.core.objectInstance.resolveParent}
   */
  resolveParent: require('./resolve-parent'),

  /**
   * {@linkcode "dd.core.objectInstance.resolvePosition" | dd.core.objectInstance.resolvePosition}
   */
  resolvePosition: require('./resolve-position'),

  /**
   * {@linkcode "dd.core.objectInstance.resolveScale" | dd.core.objectInstance.resolveScale}
   */
  resolveScale: require('./resolve-scale'),

  /**
   * {@linkcode "dd.core.objectInstance.resolveSingleUnit" | dd.core.objectInstance.resolveSingleUnit}
   */
  resolveSingleUnit: require('./resolve-single-unit'),

  /**
   * {@linkcode "dd.core.objectInstance.resolveSwitch" | dd.core.objectInstance.resolveSwitch}
   */
  resolveSwitch: require('./resolve-switch'),

  /**
   * {@linkcode "dd.core.objectInstance.resolveSwitchValue" | dd.core.objectInstance.resolveSwitchValue}
   */
  resolveSwitchValue: require('./resolve-switch-value'),

  /**
   * {@linkcode "dd.core.objectInstance.resolveVariable" | dd.core.objectInstance.resolveVariable}
   */
  resolveVariable: require('./resolve-variable'),

  /**
   * {@linkcode "dd.core.objectInstance.resolveVariableValue" | dd.core.objectInstance.resolveVariableValue}
   */
  resolveVariableValue: require('./resolve-variable-value'),

  /**
   * {@linkcode "dd.core.objectInstance.resolveVelocity" | dd.core.objectInstance.resolveVelocity}
   */
  resolveVelocity: require('./resolve-velocity'),

  /**
   * {@linkcode "dd.core.objectInstance.snapToTile" | dd.core.objectInstance.snapToTile}
   */
  snapToTile: require('./snap-to-tile')
};
