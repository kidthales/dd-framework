/**
 * Parse text tag module.
 *
 * @module dd/core/text/parse-text-tag
 * @internal
 */

/**
 * @constant
 * @private
 */
var _kTextTagStartIndexOffset = 3,
  /**
   * @param {string} text
   * @param {number} startIndex
   * @returns {number}
   * @private
   */
  _getTextTagEndIndex = function (
    /** @type {string} */
    text,
    /** @type {number} */
    startIndex
  ) {
    return text.indexOf(']', startIndex + _kTextTagStartIndexOffset);
  };

/**
 * @param {string} text
 * @param {number} startIndex
 * @param {import('./types').TextTagParserContext} context
 * @returns {import('./types').ParsedTextTag|undefined}
 */
module.exports = function (text, startIndex, context) {
  var resolveIntString = require('../string/resolve-int-string'),
    textConstants = require('./constants'),
    candidateStartText = text.substring(startIndex, startIndex + _kTextTagStartIndexOffset),
    /** @type {number} */
    endIndex,
    /** @type {import("./types").ParsedTextTag | undefined} */
    parsedTextTag,
    /** @type {string} */
    word,
    /** @type {[number, number, number]} */
    rgb,
    /** @type {number} */
    v,
    /** @type {string[]} */
    list,
    /** @type {number} */
    size;

  switch (candidateStartText) {
    case '\\' + textConstants.colorTag + '[':
      endIndex = _getTextTagEndIndex(text, startIndex);

      if (endIndex >= 0) {
        word = text.substring(startIndex + _kTextTagStartIndexOffset, endIndex);

        if (word.length == 0) {
          rgb = context.defaultColor;
        } else if (word[0] == '#') {
          if (word.length == 3 + 1) {
            v = parseInt(word.substring(1), 16);
            rgb = [((v >> 8) & 0x0f) * 0x11, ((v >> 4) & 0x0f) * 0x11, ((v >> 0) & 0x0f) * 0x11];
          } else if (word.length == 6 + 1) {
            v = parseInt(word.substring(1), 16);
            rgb = [(v >> 16) & 0xff, (v >> 8) & 0xff, (v >> 0) & 0xff];
          } else {
            rgb = context.defaultColor;
          }
        } else {
          list = word.split(',');

          if (list.length < 3) {
            rgb = context.defaultColor;
          } else {
            rgb = [
              Math.max(0, Math.min(255, resolveIntString(list[0], 255))),
              Math.max(0, Math.min(255, resolveIntString(list[1], 255))),
              Math.max(0, Math.min(255, resolveIntString(list[2], 255)))
            ];
          }
        }

        parsedTextTag = { head: endIndex + 1, tagName: textConstants.colorTag, param: rgb };
      }

      break;

    case '\\' + textConstants.sizeTag + '[':
      endIndex = _getTextTagEndIndex(text, startIndex);

      if (endIndex >= 0) {
        word = text.substring(startIndex + _kTextTagStartIndexOffset, endIndex);

        if (word.length == 0) {
          size = context.defaultSize;
        } else if (word[0] == '+') {
          size = Math.max(0, context.currentSize + resolveIntString(word.substring(1), 0));
        } else if (word[0] == '-') {
          size = Math.max(0, context.currentSize - resolveIntString(word.substring(1), 0));
        } else {
          size = Math.max(0, resolveIntString(word, context.defaultSize));
        }

        parsedTextTag = { head: endIndex + 1, tagName: textConstants.sizeTag, param: size };
      }

      break;

    default:
      break;
  }

  return parsedTextTag;
};
