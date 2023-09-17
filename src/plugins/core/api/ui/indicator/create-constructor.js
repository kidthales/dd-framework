/**
 * Create constructor module.
 *
 * @module dd/core/ui/indicator/create-constructor
 */

var _draw = function (
  /** @type {import("@pgmmv/cc/draw-node").CCDrawNode} */
  drawNode,
  /** @type {import("@pgmmv/cc/color").CCColor} */
  color
) {
  var size = drawNode.getContentSize(),
    left = -size.width / 2,
    right = -left,
    top = size.height / 4,
    bottom = -top,
    center = 0;

  drawNode.clear();

  drawNode.drawPoly([cc.p(center, bottom), cc.p(left, top), cc.p(right, top), cc.p(center, bottom)], color, 0);
};

/**
 * @returns {import("./types").IndicatorConstructor}
 */
module.exports = function () {
  /** @type {import("./types").IndicatorConstructor} */
  var Indicator = cc.Node.extend({
    /**
     * @param {import("./types").IndicatorConfig} config
     * @returns {boolean}
     */
    ctor: function (config) {
      /** @type {import('./types').Indicator} */
      var self = this,
        drawNode = new cc.DrawNode();

      self._super();

      self.setCascadeOpacityEnabled(true);

      drawNode.setName('drawNode');
      self.addChild(drawNode);

      self.setContentSize(config.contentSize.width, config.contentSize.height);
      self.setColor(config.color || cc.color(255, 255, 255));
      self.setOpacity(config.opacity !== undefined ? config.opacity : 255);

      return true;
    },

    /**
     * @param {import("@pgmmv/cc/size").CCSize|number} size
     * @param {number|undefined} height
     * @returns {void}
     */
    setContentSize: function (size, height) {
      /** @type {import('./types').Indicator} */
      var self = this,
        drawNode = self.getChildByName('drawNode');

      self._super(size, height);
      drawNode.setContentSize(size, height);

      _draw(drawNode, self.getColor());
    },

    /**
     * @param {import("@pgmmv/cc/color").CCColor} color
     * @returns {void}
     */
    setColor: function (color) {
      /** @type {import('./types').Indicator} */
      var self = this,
        drawNode = self.getChildByName('drawNode');

      self._super(color);

      _draw(drawNode, color);
    }
  });

  return Indicator;
};
