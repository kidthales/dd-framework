/**
 * @module @dd/core/api/font/get-font-data
 */

/**
 *
 * @param {number} fontId
 * @returns {import("./types").FontData|undefined}
 */
module.exports = function (
  /** @type {number} */
  fontId
) {
  var cache = require('./cache'),
    fontConstants = require('./constants'),
    /** @type {import("./types").FontData|undefined} */
    fontData = cache.get(fontId),
    /** @type {import("@pgmmv/agtk/fonts/font").AgtkFont|null} */
    agtkFont,
    /** @type {import("@pgmmv/agtk/images/image").AgtkImage|null} */
    agtkImage,
    /** @type {import("@pgmmv/cc/texture-2d").CCTexture2D|null} */
    texture,
    /** @type {string[]} */
    layoutLineList,
    /** @type {number} */
    layoutLines,
    /** @type {number} */
    maxLetters,
    /** @type {number} */
    i;

  if (fontData) {
    return fontData;
  }

  agtkFont = Agtk.fonts.get(fontId);

  if (!agtkFont) {
    return;
  }

  fontData = {
    fontId: fontId
  };

  if (agtkFont.imageFontFlag) {
    agtkImage = Agtk.images.get(agtkFont.imageId);

    if (!agtkImage) {
      return;
    }

    texture = cc.textureCache.addImage(agtkImage.filename);

    if (!texture) {
      return;
    }

    texture.setAliasTexParameters();
    layoutLineList = agtkFont.letterLayout.split('\n');

    fontData.type = fontConstants.bitmap;
    fontData.fixedWidth = agtkFont.fixedWidth;
    fontData.hankakuWidth = agtkFont.hankakuWidth;
    fontData.layoutLineList = layoutLineList;
    fontData.texture = texture;
    fontData.zenkakuWidth = agtkFont.zenkakuWidth;

    layoutLines = layoutLineList.length;
    maxLetters = 0;

    for (i = 0; i < layoutLines; i++) {
      maxLetters = Math.max(maxLetters, layoutLineList[i].length);
    }

    fontData.letterWidth = Math.floor(texture.width / maxLetters);
    fontData.letterHeight = Math.floor(texture.height / layoutLines);
  } else {
    fontData.type = fontConstants.ttf;
    fontData.aliasThreshold = agtkFont.antialiasDisabled ? agtkFont.aliasThreshold : -1;
    fontData.filename = 'fonts/' + agtkFont.fontName + '.ttf';
    fontData.letterHeight = agtkFont.fontSize;
    fontData.size = agtkFont.fontSize;
  }

  cache.set(fontId, fontData);

  return fontData;
};
