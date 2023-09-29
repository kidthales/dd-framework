/**
 * Core plugin API user interface indicator module.
 *
 * @module    dd.core.ui.indicator
 * @author    kidthales <kidthales@agogpixel.com>
 * @copyright 2023 kidthales
 * @license   {@link https://github.com/kidthales/dd-framework/blob/main/LICENSE.txt | MIT License}
 */

/**
 * Exposes methods for creating a UI indicator.
 */
module.exports = {
  /**
   * {@linkcode "dd.core.ui.indicator.create" | dd.core.ui.indicator.create}
   */
  create: require('./create'),

  /**
   * {@linkcode "dd.core.ui.indicator.createConstructor" | dd.core.ui.indicator.createConstructor}
   */
  createConstructor: require('./create-constructor'),

  /**
   * {@linkcode "dd.core.ui.indicator.getConstructor" | dd.core.ui.indicator.getConstructor}
   */
  getConstructor: require('./get-constructor')
};
