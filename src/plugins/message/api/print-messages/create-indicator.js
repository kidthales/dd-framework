/**
 * Create indicator module.
 *
 * @module dd/message/print-messages/create-indicator
 * @internal
 */

/**
 * @param {import("./types").CustomIndicator} config
 * @returns {import("@pgmmv/cc/node").CCNode}
 */
module.exports = function (config) {
  /** @type {import("@pgmmv/agtk/images/image").AgtkImage|undefined} */
  var indicatorImage,
    /** @type {import("@pgmmv/cc/texture-2d").CCTexture2D|undefined} */
    indicatorTexture,
    /** @type {import("@pgmmv/cc/sprite").CCSprite|import("@pgmmv/cc/draw-node").CCDrawNode|undefined} */
    indicator;

  if (config.imageId !== Agtk.constants.actionCommands.UnsetObject) {
    indicatorImage = Agtk.images.get(config.imageId);

    if (indicatorImage) {
      indicatorTexture = cc.textureCache.addImage(indicatorImage.filename);
      indicatorTexture.setAliasTexParameters();

      indicator = new cc.Sprite(
        indicatorTexture,
        cc.rect(config.frame.x, config.frame.y, config.frame.width, config.frame.height)
      );
    }
  }

  return indicator || dd.core.ui.indicator.create({ contentSize: cc.size(16, 16) });
};
