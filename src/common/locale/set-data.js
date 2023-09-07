/**
 * Set data module.
 *
 * @module dd/common/locale/set-data
 */

/**
 * @param {import('./types').LocalizedStringByLocaleCodeByLocaleKey} data
 * @returns {void}
 */
module.exports = function (data) {
  require('./state').data = data;
};
