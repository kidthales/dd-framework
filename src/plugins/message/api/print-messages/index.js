/**
 * Message plugin API print messages module.
 *
 * @module    dd.message.printMessages
 * @author    kidthales <kidthales@agogpixel.com>
 * @copyright 2023 kidthales
 * @license   {@link https://github.com/kidthales/dd-framework/blob/main/LICENSE.txt | MIT License}
 */

/**
 * Exposes methods & properties for printing messages.
 */
module.exports = {
  /**
   * {@linkcode "dd.message.printMessages.beginRelativePositionSession" | dd.message.printMessages.beginRelativePositionSession}
   */
  beginRelativePositionSession: require('./begin-relative-position-session'),

  /**
   * {@linkcode "dd.message.printMessages.constants" | dd.message.printMessages.constants}
   */
  constants: require('./constants'),

  /**
   * {@linkcode "dd.message.printMessages.updateInteractiveSession" | dd.message.printMessages.updateInteractiveSession}
   */
  updateInteractiveSession: require('./update-interactive-session')
};
