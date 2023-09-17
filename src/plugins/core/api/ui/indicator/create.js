/**
 * Create module.
 *
 * @module dd/core/ui/indicator/create
 */

/**
 * @param {import("./types").IndicatorConfig} config
 * @returns {import("./types").Indicator}
 */
module.exports = function (config) {
  return new (require('./get-constructor')())(config);
};
