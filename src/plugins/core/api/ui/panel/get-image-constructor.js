/**
 * @module dd/core/ui/panel/get-image-constructor
 */

/**
 * @type {import("./types").ImagePanelConstructor|undefined}
 * @private
 */
var _Panel;

/**
 *
 * @returns {import("./types").ImagePanelConstructor}
 */
module.exports = function () {
  return _Panel || (_Panel = require('./create-image-constructor')());
};
