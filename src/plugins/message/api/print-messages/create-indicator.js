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
    /** @type {import("@pgmmv/cc/size").CCSize|undefined} */
    indicatorSize,
    /** @type {import("@pgmmv/cc/node").CCNode|undefined} */
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

  if (!indicator) {
    indicatorSize = cc.size(16, 16);

    indicator = new cc.DrawNode();
    indicator.setContentSize(indicatorSize);
    indicator.drawPoly_(
      [
        cc.p(0, -indicatorSize.height / 4),
        cc.p(-indicatorSize.width / 2, indicatorSize.height / 4),
        cc.p(indicatorSize.width / 2, indicatorSize.height / 4),
        cc.p(0, -indicatorSize.height / 4)
      ],
      cc.color(255, 255, 255),
      0
    );
  }

  return indicator;
};
