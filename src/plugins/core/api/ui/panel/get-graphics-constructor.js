/**
 * @module dd/core/ui/panel/get-graphics-constructor
 */

/**
 * @type {import("./types").GraphicsPanelConstructor|undefined}
 * @private
 */
var _Panel;

/**
 *
 * @returns {import("./types").GraphicsPanelConstructor}
 */
module.exports = function () {
  return _Panel || (_Panel = require('./create-graphics-constructor')());
};
