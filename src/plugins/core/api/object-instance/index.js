/**
 * Object instance module.
 *
 * @module dd/core/object-instance
 */

/**
 *
 */
module.exports = {
  inRect: require('./in-rect'),
  inTile: require('./in-tile'),
  inTileRect: require('./in-tile-rect'),
  resolve: require('./resolve'),
  resolveParent: require('./resolve-parent'),
  resolvePosition: require('./resolve-position'),
  resolveScale: require('./resolve-scale'),
  resolveSingleUnit: require('./resolve-single-unit'),
  resolveSwitch: require('./resolve-switch'),
  resolveSwitchValue: require('./resolve-switch-value'),
  resolveVariable: require('./resolve-variable'),
  resolveVariableValue: require('./resolve-variable-value'),
  snapToTile: require('./snap-to-tile')
};
