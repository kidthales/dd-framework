/**
 * Core plugin API user interface indicator create module.
 *
 * @module    dd.core.ui.indicator.create
 * @author    kidthales <kidthales@agogpixel.com>
 * @copyright 2023 kidthales
 * @license   {@link https://github.com/kidthales/dd-framework/blob/main/LICENSE.txt | MIT License}
 */

/**
 * @param {import("./types").IndicatorConfig} config
 * @returns {import("./types").Indicator}
 */
module.exports = function (config) {
  return new (require('./get-constructor')())(config);
};
