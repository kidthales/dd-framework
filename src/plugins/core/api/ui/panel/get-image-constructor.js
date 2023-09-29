/**
 * Core plugin API user interface panel get image constructor module.
 *
 * @module dd.core.ui.panel.getImageConstructor
 * @author    kidthales <kidthales@agogpixel.com>
 * @copyright 2023 kidthales
 * @license   {@link https://github.com/kidthales/dd-framework/blob/main/LICENSE.txt | MIT License}
 */

/**
 * @type {import("./types").ImagePanelConstructor|undefined}
 * @private
 */
var _Panel;

/**
 * @returns {import("./types").ImagePanelConstructor}
 */
module.exports = function () {
  return _Panel || (_Panel = require('./create-image-constructor')());
};
