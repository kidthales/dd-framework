/**
 * Create image constructor module.
 *
 * @module dd/core/ui/panel/create-image-constructor
 */

/**
 * @private
 */
var _logApi = require('../../log'),
  /**
   * @private
   */
  _commonClassProperties = require('./class-properties'),
  /**
   * @type {import('./types').ImagePanel}
   * @private
   */
  _classProperties = {};

for (prop in _commonClassProperties) {
  if (Object.prototype.hasOwnProperty.call(_commonClassProperties, prop)) {
    _classProperties[prop] = _commonClassProperties[prop];
  }
}

_classProperties.ctor = function (
  /** @type {import('./types').ImagePanelConfig} */
  config
) {
  /** @type {import('./types').ImagePanel} */
  var self = this,
    result = _commonClassProperties.ctor.call(self, config);

  if (!result) {
    return false;
  }

  if (!config.texture) {
    _logApi.error('ImagePanel::ctor(): ImagePanelConfig must include texture.');
    return false;
  }

  if (!config.textureFrame) {
    _logApi.error('ImagePanel::ctor(): ImagePanelConfig must include textureFrame.');
    return false;
  }

  if (!config.capInsetRect) {
    _logApi.error('ImagePanel::ctor(): ImagePanelConfig must include capInsetRect.');
    return false;
  }

  self._config.renderType = 'image';
  self._config.texture = config.texture;
  self._config.textureFrame = config.textureFrame;
  self._config.capInsetRect = config.capInsetRect;

  self._super(new cc.SpriteFrame(self._config.texture, self._config.textureFrame), self._config.capInsetRect);

  if (self._config.startClosed) {
    self.setPreferredSize(0, 0);
  } else {
    self.setPreferredSize(self._config.size);
  }

  return true;
};

_classProperties._updateOpenCloseInterpolationState = function (dt, direction) {
  /** @type {import('./types').ImagePanel} */
  var self = this;

  _commonClassProperties._updateOpenCloseInterpolationState.call(self, dt, direction);

  self.setPreferredSize(
    cc.size(
      cc.clampf(cc.lerp(0, self._config.size.width, self._openCloseInterpolationState.x), 0, self._config.size.width),
      cc.clampf(cc.lerp(0, self._config.size.height, self._openCloseInterpolationState.y), 0, self._config.size.height)
    )
  );
};

/**
 * @returns {import("./types").ImagePanelConstructor}
 */
module.exports = function () {
  /** @type {import("./types").ImagePanelConstructor} */
  var ImagePanel = cc.Scale9Sprite.extend(_classProperties);
  return ImagePanel;
};
