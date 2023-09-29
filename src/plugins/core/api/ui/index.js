/**
 * Core plugin API user interface module.
 *
 * @module    dd.core.ui
 * @author    kidthales <kidthales@agogpixel.com>
 * @copyright 2023 kidthales
 * @license   {@link https://github.com/kidthales/dd-framework/blob/main/LICENSE.txt | MIT License}
 */

/**
 * Exposes methods & properties for creating & managing user interfaces.
 */
module.exports = {
  /**
   * {@linkcode "dd.core.ui.font" | dd.core.ui.font}
   */
  font: require('./font'),

  /**
   * {@linkcode "dd.core.ui.indicator" | dd.core.ui.indicator}
   */
  indicator: require('./indicator'),

  /**
   * {@linkcode "dd.core.ui.openClose" | dd.core.ui.openClose}
   */
  openClose: require('./open-close'),

  /**
   * {@linkcode "dd.core.ui.panel" | dd.core.ui.panel}
   */
  panel: require('./panel'),

  /**
   * {@linkcode "dd.core.ui.text" | dd.core.ui.text}
   */
  text: require('./text')
};
