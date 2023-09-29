/**
 * Core plugin API user interface indicator get constructor module.
 *
 * @module    dd.core.ui.indicator.getConstructor
 * @author    kidthales <kidthales@agogpixel.com>
 * @copyright 2023 kidthales
 * @license   {@link https://github.com/kidthales/dd-framework/blob/main/LICENSE.txt | MIT License}
 */

/**
 * @type {import("./types").IndicatorConstructor|undefined}
 * @private
 */
var _Indicator;

/**
 * @returns {import("./types").IndicatorConstructor}
 */
module.exports = function () {
  return _Indicator || (_Indicator = require('./create-constructor')());
};
