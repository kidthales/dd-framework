/**
 * Common plugin dependencies on dependency initialized module.
 *
 * @module    @dd/common/plugin/deps/on-dependency-initialized
 * @author    kidthales <kidthales@agogpixel.com>
 * @copyright 2023 kidthales
 * @license   {@link https://github.com/kidthales/dd-framework/blob/main/LICENSE.txt | MIT License}
 */

/**
 * Handles plugin initialized events; tracks if a plugin dependency has been
 * initialized.
 *
 * @param {string} identifier
 * @returns {void}
 */
module.exports = function (identifier) {
  var missing = require('./state').missing,
    /** @type {number|undefined} */
    index;

  if (!missing || !missing.length) {
    return;
  }

  index = missing.indexOf(identifier);

  if (index > -1) {
    missing.splice(index, 1);
  }
};
