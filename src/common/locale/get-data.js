/**
 * @module @dd/common/locale/get-code
 */

/**
 * @returns {import('./types').LocalizedStringByLocaleCodeByLocaleKey | undefined}
 */
module.exports = function () {
  return require('./state').data;
};
