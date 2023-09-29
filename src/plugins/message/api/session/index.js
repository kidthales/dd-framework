/**
 * Message plugin API session module.
 *
 * @module    dd.message.session
 * @author    kidthales <kidthales@agogpixel.com>
 * @copyright 2023 kidthales
 * @license   {@link https://github.com/kidthales/dd-framework/blob/main/LICENSE.txt | MIT License}
 */

/**
 * Exposes methods for managing message sessions.
 */
module.exports = {
  /**
   * {@linkcode "dd.message.session.begin" | dd.message.session.begin}
   */
  begin: require('./begin'),

  /**
   * {@linkcode "dd.message.session.end" | dd.message.session.end}
   */
  end: require('./end'),

  /**
   * {@linkcode "dd.message.session.get" | dd.message.session.get}
   */
  get: require('./get'),

  /**
   * {@linkcode "dd.message.session.has" | dd.message.session.has}
   */
  has: require('./has')
};
