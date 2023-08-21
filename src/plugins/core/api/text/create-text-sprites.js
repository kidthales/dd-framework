/**
 * @module @dd/core/api/text/create-text-sprites
 */

/**
 * @private
 */
var _defaultColor = [255, 255, 255];

/**
 *
 * @param {import('./types').TextData} textData
 * @param {boolean|undefined} shouldRetain
 * @returns {import('./types').TextSprites|undefined}
 */
module.exports = function (
  /** @type {import('./types').TextData} */
  textData,
  /** @type {boolean|undefined} */
  shouldRetain
) {
  var textConstants = require('./constants'),
    parseTextTag = require('./parse-text-tag'),
    createTextSprite = require('./create-text-sprite'),
    fontData = textData.font,
    /** @type {import('./types').TextSprites} */
    textSprites,
    /** @type {string[]} */
    lines,
    /** @type {number} */
    numLines,
    /** @type {number} */
    linesIndex,
    /** @type {import('./types').TextSpritesLine} */
    textSpritesLine,
    /** @type {string} */
    line,
    /** @type {number} */
    lineLen,
    /** @type {number} */
    lineIndex,
    /** @type {number} */
    letterX,
    /** @type {(string) => void} */
    addTextSprite,
    /** @type {number} */
    currentSize,
    /** @type {[number, number, number]} */
    currentColor,
    /** @type {import('./types').ParsedTextTag|undefined} */
    parsedTextTag,
    /** @type {import('@pgmmv/cc/size').CCSize} */
    textDimensions,
    /** @type {number} */
    numLetters;

  if (!fontData) {
    return;
  }

  currentSize = fontData.letterHeight;
  currentColor = _defaultColor.slice();

  textSprites = [];
  textDimensions = cc.size(0, 0);
  numLetters = 0;

  lines = textData.message.split('\n');
  numLines = lines.length;

  for (linesIndex = 0; linesIndex < numLines; ++linesIndex) {
    textSpritesLine = [];
    textSpritesLine.y = 0;
    textSpritesLine.width = 0;
    textSpritesLine.height = 0;

    textSprites.push(textSpritesLine);

    line = lines[linesIndex];
    lineLen = line.length;
    letterX = 0;

    addTextSprite = function (
      /** @type {string} */
      ch
    ) {
      var textSprite = createTextSprite(ch, fontData, currentColor, currentSize, letterX, shouldRetain);

      textSpritesLine.push(textSprite);
      textSprite.endX += textData.letterSpacing;
      letterX = textSprite.endX;
      textSpritesLine.width = letterX;

      if (textSprite.sprite.height > textSpritesLine.height) {
        textSpritesLine.height = textSprite.sprite.height;
      }
    };

    for (lineIndex = 0; lineIndex < lineLen; ++lineIndex) {
      if (line.substring(lineIndex, lineIndex + 2) == '\\\\') {
        addTextSprite('\\');
        // Will increment twice.
        ++lineIndex;
        continue;
      }

      parsedTextTag = parseTextTag(line, lineIndex, {
        currentSize: currentSize,
        defaultColor: _defaultColor,
        defaultSize: fontData.letterHeight
      });

      if (parsedTextTag) {
        switch (parsedTextTag.tagName) {
          case textConstants.sizeTag:
            currentSize = parsedTextTag.param;
            // Will increment to head.
            lineIndex = parsedTextTag.head - 1;
            continue;
          case textConstants.colorTag:
            currentColor = parsedTextTag.param;
            // Will increment to head.
            lineIndex = parsedTextTag.head - 1;
            continue;
          default:
            break;
        }
      }

      addTextSprite(line[lineIndex]);
    }

    if (textSpritesLine.width > textDimensions.width) {
      textDimensions.width = textSpritesLine.width;
    }

    textSpritesLine.y = -textDimensions.height - textSpritesLine.height - (linesIndex ? textData.lineSpacing : 0);

    textDimensions.height += textSpritesLine.height;
    textDimensions.height += linesIndex ? textData.lineSpacing : 0;

    numLetters += textSpritesLine.length;
  }

  textSprites.width = textDimensions.width;
  textSprites.height = textDimensions.height;
  textSprites.numLetters = numLetters;

  return textSprites;
};
