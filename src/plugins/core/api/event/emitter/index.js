/**
 * Core plugin API event emitter module.
 *
 * @module    dd.core.event.emitter
 * @author    kidthales <kidthales@agogpixel.com>
 * @copyright 2023 kidthales
 * @license   {@link https://github.com/kidthales/dd-framework/blob/main/LICENSE.txt | MIT License}
 */

/**
 * Exposes method for creating an event emitter.
 */
module.exports = {
  /**
   * {@linkcode "dd.core.event.emitter.create" | dd.core.event.emitter.create}
   */
  create: require('./create')
};
