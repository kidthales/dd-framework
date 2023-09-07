/**
 * Get data module.
 *
 * @module dd/common/locale/get-data
 */

/**
 * @returns {import('./types').LocalizedStringByLocaleCodeByLocaleKey | undefined}
 */
module.exports = function () {
  return require('./state').data;
};
