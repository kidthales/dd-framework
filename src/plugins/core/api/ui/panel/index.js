/**
 * Core plugin API user interface panel module.
 *
 * @module    dd.core.ui.panel
 * @author    kidthales <kidthales@agogpixel.com>
 * @copyright 2023 kidthales
 * @license   {@link https://github.com/kidthales/dd-framework/blob/main/LICENSE.txt | MIT License}
 */

/**
 * Exposes methods & properties for managing a UI panel.
 */
module.exports = {
  /**
   * {@linkcode "dd.core.ui.panel.classProperties" | dd.core.ui.panel.classProperties}
   */
  classProperties: require('./class-properties'),

  /**
   * {@linkcode "dd.core.ui.panel.create" | dd.core.ui.panel.create}
   */
  create: require('./create'),

  /**
   * {@linkcode "dd.core.ui.panel.createGraphicsConstructor" | dd.core.ui.panel.createGraphicsConstructor}
   */
  createGraphicsConstructor: require('./create-graphics-constructor'),

  /**
   * {@linkcode "dd.core.ui.panel.createImageConstructor" | dd.core.ui.panel.createImageConstructor}
   */
  createImageConstructor: require('./create-image-constructor'),

  /**
   * {@linkcode "dd.core.ui.panel.getGraphicsConstructor" | dd.core.ui.panel.getGraphicsConstructor}
   */
  getGraphicsConstructor: require('./get-graphics-constructor'),

  /**
   * {@linkcode "dd.core.ui.panel.getImageConstructor" | dd.core.ui.panel.getImageConstructor}
   */
  getImageConstructor: require('./get-image-constructor')
};
