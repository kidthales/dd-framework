/**
 * @module @dd/core/api/text/create-text-sprite
 * @internal
 */

/**
 * @private
 */
var _defaultColor = [255, 255, 255];

/**
 *
 * @param {string} letter
 * @param {import('../font/types').FontData} fontData
 * @param {[number, number, number]|undefined} color
 * @param {number|undefined} size
 * @param {number|undefined} x
 * @param {boolean|undefined} shouldRetain
 */
module.exports = function (
  /** @type {string} */
  letter,
  /** @type {import('../font/types').FontData} */
  fontData,
  /** @type {[number, number, number]|undefined} */
  color,
  /** @type {number|undefined} */
  size,
  /** @type {number|undefined} */
  x,
  /** @type {boolean|undefined} */
  shouldRetain
) {
  var fontType = require('../font').type,
    /** @type {import('./types').TextSprite} */
    textSprite,
    /** @type {string} */
    layoutLineList,
    /** @type {boolean} */
    isHankaku,
    /** @type {number} */
    cx,
    /** @type {number} */
    cy,
    /** @type {number} */
    i,
    /** @type {number} */
    index,
    /** @type {import('@pgmmv/cc/sprite').CCSprite|import('@pgmmv/cc/label-ttf').CCLabelTTF} */
    sprite;

  color = color !== undefined ? color : _defaultColor;
  size = size !== undefined ? size : fontData.letterHeight;
  x = x || 0;

  switch (fontData.type) {
    case fontType.bitmap:
      layoutLineList = fontData.layoutLineList;
      // eslint-disable-next-line no-control-regex
      isHankaku = !letter.match(/[^\x01-\x7E]/) || !letter.match(/[^\uFF65-\uFF9F]/);

      cx = -1;
      cy = -1;

      for (i = 0; i < layoutLineList.length; i++) {
        index = layoutLineList[i].indexOf(letter);

        if (index >= 0) {
          cx = index;
          cy = i;
          break;
        }
      }

      if (cx === -1 || cy === -1) {
        cx = 0;
        cy = 0;
      }

      if (cx >= 0 && cy >= 0) {
        sprite = new cc.Sprite(
          fontData.texture,
          cc.rect(cx * fontData.letterWidth, cy * fontData.letterHeight, fontData.letterWidth, fontData.letterHeight)
        );

        sprite.setAnchorPoint(0, 0);
        sprite.x = x;
        sprite.y = 0;
        sprite.width = (fontData.letterWidth * size) / fontData.letterHeight;
        sprite.height = size;
        sprite.color = cc.color(color[0], color[1], color[2]);

        if (shouldRetain) {
          sprite.retain();
        }

        textSprite = {
          endX:
            x +
            ((fontData.fixedWidth ? fontData.letterWidth : isHankaku ? fontData.hankakuWidth : fontData.zenkakuWidth) *
              size) /
              fontData.letterHeight,
          sprite: sprite
        };
      }

      break;
    case fontType.ttf:
      sprite = new cc.LabelTTF(
        letter,
        fontData.filename,
        (fontData.size * size) / fontData.letterHeight,
        undefined,
        undefined,
        undefined,
        // not actually used...?
        fontData.aliasThreshold
      );

      sprite.color = cc.color(color[0], color[1], color[2]);
      sprite.setAnchorPoint(0, 0);
      sprite.x = x;
      sprite.y = 0;

      if (shouldRetain) {
        sprite.retain();
      }

      textSprite = { endX: x + sprite.width, sprite: sprite };

      break;
    default:
      sprite = new cc.Sprite();

      if (shouldRetain) {
        sprite.retain();
      }

      textSprite = { endX: x, sprite: sprite };

      break;
  }

  return textSprite;
};
