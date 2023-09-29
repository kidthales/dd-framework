/**
 * Dank Developer Framework: Message Plugin API Module.
 *
 * @module    dd.message
 * @author    kidthales <kidthales@agogpixel.com>
 * @copyright 2023 kidthales
 * @license   {@link https://github.com/kidthales/dd-framework/blob/main/LICENSE.txt | MIT License}
 */

/**
 * Exposes methods & properties to facilitate scripting with the message plugin.
 */
module.exports = {
  /**
   * {@linkcode "dd.message.printMessages" | dd.message.printMessages}
   */
  printMessages: require('./print-messages'),

  /**
   * {@linkcode "dd.message.session" | dd.message.session}
   */
  session: require('./session')
};
