/**
 * Core plugin API user interface panel get graphics constructor module.
 *
 * @module dd.core.ui.panel.getGraphicsConstructor
 * @author    kidthales <kidthales@agogpixel.com>
 * @copyright 2023 kidthales
 * @license   {@link https://github.com/kidthales/dd-framework/blob/main/LICENSE.txt | MIT License}
 */

/**
 * @type {import("./types").GraphicsPanelConstructor|undefined}
 * @private
 */
var _Panel;

/**
 * @returns {import("./types").GraphicsPanelConstructor}
 */
module.exports = function () {
  return _Panel || (_Panel = require('./create-graphics-constructor')());
};
