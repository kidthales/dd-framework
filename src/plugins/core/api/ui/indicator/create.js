/**
 * Create module.
 *
 * @module dd/core/ui/indicator/create
 */

/**
 * @param {import("./types").IndicatorConfig} config
 * @returns {import("@pgmmv/cc/draw-node").CCDrawNode}
 */
module.exports = function (config) {
  var indicator = new cc.DrawNode();

  indicator.setContentSize(config.contentSize.width, config.contentSize.height);

  indicator.drawPoly(
    [
      cc.p(0, -config.contentSize.height / 4),
      cc.p(-config.contentSize.width / 2, config.contentSize.height / 4),
      cc.p(config.contentSize.width / 2, config.contentSize.height / 4),
      cc.p(0, -config.contentSize.height / 4)
    ],
    config.color || cc.color(255, 255, 255),
    0
  );

  return indicator;
};
