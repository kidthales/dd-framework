/**
 * Core plugin API string module.
 *
 * @module    dd.core.string
 * @author    kidthales <kidthales@agogpixel.com>
 * @copyright 2023 kidthales
 * @license   {@link https://github.com/kidthales/dd-framework/blob/main/LICENSE.txt | MIT License}
 */

/**
 * Exposes methods for working with strings.
 */
module.exports = {
  /**
   * {@linkcode "dd.core.string.getByteLength" | dd.core.string.getByteLength}
   */
  getByteLength: require('./get-byte-length'),

  /**
   * {@linkcode "dd.core.string.padStart" | dd.core.string.padStart}
   */
  padStart: require('./pad-start'),

  /**
   * {@linkcode "dd.core.string.padEnd" | dd.core.string.padEnd}
   */
  padEnd: require('./pad-end'),

  /**
   * {@linkcode "dd.core.string.repeat" | dd.core.string.repeat}
   */
  repeat: require('./repeat'),

  /**
   * {@linkcode "dd.core.string.resolveIntString" | dd.core.string.resolveIntString}
   */
  resolveIntString: require('./resolve-int-string'),

  /**
   * {@linkcode "dd.core.string.toJson" | dd.core.string.toJson}
   */
  toJson: require('./to-json')
};
