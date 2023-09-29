/**
 * Dank Developer Framework: Core Plugin API Module.
 *
 * @module    dd.core
 * @author    kidthales <kidthales@agogpixel.com>
 * @copyright 2023 kidthales
 * @license   {@link https://github.com/kidthales/dd-framework/blob/main/LICENSE.txt | MIT License}
 */

/**
 * Exposes methods & properties to facilitate scripting with the core plugin.
 */
module.exports = {
  /**
   * {@linkcode "dd.core.camera" | dd.core.camera}
   */
  camera: require('./camera'),

  /**
   * {@linkcode "dd.core.common" | dd.core.common}
   */
  common: require('./common'),

  /**
   * {@linkcode "dd.core.coord" | dd.core.coord}
   */
  coord: require('./coord'),

  /**
   * {@linkcode "dd.core.event" | dd.core.event}
   */
  event: require('./event'),

  /**
   * {@linkcode "dd.core.fs" | dd.core.fs}
   */
  fs: require('./fs'),

  /**
   * {@linkcode "dd.core.input" | dd.core.input}
   */
  input: require('./input'),

  /**
   * {@linkcode "dd.core.lock" | dd.core.lock}
   */
  lock: require('./lock'),

  /**
   * {@linkcode "dd.core.log" | dd.core.log}
   */
  log: require('./log'),

  /**
   * {@linkcode "dd.core.object" | dd.core.object}
   */
  object: require('./object'),

  /**
   * {@linkcode "dd.core.objectInstance" | dd.core.objectInstance}
   */
  objectInstance: require('./object-instance'),

  /**
   * {@linkcode "dd.core.string" | dd.core.string}
   */
  string: require('./string'),

  /**
   * {@linkcode "dd.core.time" | dd.core.time}
   */
  time: require('./time'),

  /**
   * {@linkcode "dd.core.ui" | dd.core.ui}
   */
  ui: require('./ui'),

  /**
   * {@linkcode "dd.core.util" | dd.core.util}
   */
  util: require('./util')
};
