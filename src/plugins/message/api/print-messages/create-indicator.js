/**
 * Message plugin API print messages create indicator module.
 *
 * @internal
 * @module    @dd/message/print-messages/create-indicator
 * @author    kidthales <kidthales@agogpixel.com>
 * @copyright 2023 kidthales
 * @license   {@link https://github.com/kidthales/dd-framework/blob/main/LICENSE.txt | MIT License}
 */

/**
 * @internal
 * @param {import("./types").CustomIndicator} config
 * @returns {import("@pgmmv/cc/node").CCNode}
 */
module.exports = function (config) {
  var texture = dd.core.util.resolveTexture(config.imageId),
    /** @type {import("@pgmmv/cc/sprite").CCSprite|import("@pgmmv/cc/draw-node").CCDrawNode|undefined} */
    indicator;

  if (texture) {
    indicator = new cc.Sprite(
      texture,
      cc.rect(config.frame.x, config.frame.y, config.frame.width, config.frame.height)
    );
  }

  return indicator || dd.core.ui.indicator.create({ contentSize: cc.size(16, 16) });
};
