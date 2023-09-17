/**
 * Resolve texture module.
 *
 * @module dd/core/util/resolve-texture
 */

/**
 * Resolve to a texture.
 *
 * @param {import("./types").TextureSource} source
 * @returns {import("@pgmmv/cc/texture-2d").CCTexture2D|undefined}
 */
module.exports = function (source) {
  /** @type {import("@pgmmv/agtk/images/image").AgtkImage|undefined} */
  var image,
    /** @type {number|undefined} */
    imageId,
    /** @type {import("@pgmmv/cc/texture-2d").CCTexture2D|undefined} */
    texture;

  if (typeof source === 'number' && source !== Agtk.constants.actionCommands.UnsetObject) {
    image = Agtk.images.get(source);
  } else if (typeof source === 'string') {
    imageId === Agtk.images.getIdByName(source);

    if (imageId !== Agtk.constants.actionCommands.UnsetObject) {
      image = Agtk.images.get(imageId);
    }
  } else if (source && typeof source.id === 'number') {
    image = source;
  }

  if (image) {
    texture = cc.textureCache.addImage(image.filename);
    texture.setAliasTexParameters();
    return texture;
  }
};
