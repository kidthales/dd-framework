/**
 * Get constructor module.
 *
 * @module dd/core/ui/indicator/get-constructor
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
