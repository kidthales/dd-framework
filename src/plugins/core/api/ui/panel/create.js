/**
 * Core plugin API user interface panel create module.
 *
 * @module    dd.core.ui.panel.create
 * @author    kidthales <kidthales@agogpixel.com>
 * @copyright 2023 kidthales
 * @license   {@link https://github.com/kidthales/dd-framework/blob/main/LICENSE.txt | MIT License}
 */

/**
 * @param {Partial<import("./types").PanelConfigUnion>} config
 * @returns {import("./types").PanelUnion}
 */
module.exports = function (config) {
  switch (config.renderType) {
    case 'image':
      return new (require('./get-image-constructor')())(config);

    case 'graphics':
    default:
      break;
  }

  return new (require('./get-graphics-constructor')())(config);
};
