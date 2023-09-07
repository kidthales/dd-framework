/**
 * Create graphics constructor module.
 *
 * @module dd/core/ui/panel/create-graphics-constructor
 */

/**
 * @private
 */
var _commonClassProperties = require('./class-properties'),
  /**
   * @type {import('./types').GraphicsPanel}
   * @private
   */
  _classProperties = {},
  /**
   * @param {import('./types').GraphicsPanel} panel
   * @returns {void}
   * @static
   * @private
   */
  _drawRect = function (
    /** @type {import('./types').GraphicsPanel} */
    panel
  ) {
    var size = panel.getContentSize(),
      anchor = panel.getAnchorPoint(),
      left = -anchor.x * size.width,
      right = (1 - anchor.x) * size.width,
      top = (1 - anchor.y) * size.height,
      bottom = -anchor.y * size.height;

    panel.clear();

    panel.drawRect(
      cc.p(left, bottom),
      cc.p(right, top),
      panel._config.backgroundColor,
      panel._config.borderThickness,
      panel._config.borderColor
    );
  };

for (prop in _commonClassProperties) {
  if (Object.prototype.hasOwnProperty.call(_commonClassProperties, prop)) {
    _classProperties[prop] = _commonClassProperties[prop];
  }
}

_classProperties.ctor = function (
  /** @type {import('./types').GraphicsPanelConfig} */
  config
) {
  /** @type {import('./types').GraphicsPanel} */
  var self = this,
    result = _commonClassProperties.ctor.call(self, config);

  if (!result) {
    return false;
  }

  self._config.renderType = 'graphics';
  self._config.backgroundColor = config.backgroundColor || cc.color('#000000');
  self._config.borderColor = config.borderColor || cc.color('#ffffff');
  self._config.borderThickness = config.borderThickness || 4;

  self._super();

  if (self._config.startClosed) {
    self.setContentSize(0, 0);
  } else {
    self.setContentSize(self._config.size);
  }

  _drawRect(self);

  return true;
};

_classProperties._updateOpened = function (dt) {
  /** @type {import('./types').GraphicsPanel} */
  var self = this;
  _commonClassProperties._updateOpened.call(self, dt);
  _drawRect(self);
};

_classProperties._updateClosed = function (dt) {
  /** @type {import('./types').GraphicsPanel} */
  var self = this;
  _commonClassProperties._updateClosed.call(self, dt);
  _drawRect(self);
};

_classProperties._updateOpenCloseInterpolationState = function (dt, direction) {
  /** @type {import('./types').GraphicsPanel} */
  var self = this;

  _commonClassProperties._updateOpenCloseInterpolationState.call(self, dt, direction);

  self.setContentSize(
    cc.size(
      cc.clampf(cc.lerp(0, self._config.size.width, self._openCloseInterpolationState.x), 0, self._config.size.width),
      cc.clampf(cc.lerp(0, self._config.size.height, self._openCloseInterpolationState.y), 0, self._config.size.height)
    )
  );

  _drawRect(self);
};

/**
 * @returns {import("./types").GraphicsPanelConstructor}
 */
module.exports = function () {
  /** @type {import("./types").GraphicsPanelConstructor} */
  var GraphicsPanel = cc.DrawNode.extend(_classProperties);
  return GraphicsPanel;
};
