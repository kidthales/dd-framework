/**
 * @module @dd/common/locale/set-code
 */

/**
 * @param {import('./types').LocalizedStringByLocaleCodeByLocaleKey} data
 * @returns {void}
 */
module.exports = function (data) {
  require('./state').data = data;
};
