/**
 * Core plugin API camera get rectangle module.
 *
 * @module    dd.core.camera.getRect
 * @author    kidthales <kidthales@agogpixel.com>
 * @copyright 2023 kidthales
 * @license   {@link https://github.com/kidthales/dd-framework/blob/main/LICENSE.txt | MIT License}
 */

/**
 * Get camera viewport rectangle in world space coordinates; X & Y values
 * correspond to top left corner.
 *
 * @returns {import("@pgmmv/cc/rect").CCRect}
 */
module.exports = function () {
  var scene = Agtk.sceneInstances.getCurrent(),
    layer = scene.getLayerByIndex(0),
    cameraTargetPosition = scene.getCurrentCameraTargetPos(),
    cameraScale = scene.getCurrentCameraDisplayScale(),
    cameraScaledWidth = Math.floor(Agtk.settings.screenWidth / cameraScale.x),
    cameraScaledHeight = Math.floor(Agtk.settings.screenHeight / cameraScale.y),
    /** @type {number|undefined} */
    cameraLeft,
    /** @type {number|undefined} */
    cameraTop;

  if (cameraScaledWidth > layer.width) {
    cameraLeft = Math.floor((layer.width - cameraScaledWidth) / 2);
  } else {
    cameraLeft = cameraTargetPosition.x - Math.floor(cameraScaledWidth / 2);

    if (cameraLeft < 0) {
      cameraLeft = 0;
    } else if (cameraLeft > layer.width - cameraScaledWidth) {
      cameraLeft = layer.width - cameraScaledWidth;
    }
  }

  if (cameraScaledHeight > layer.height) {
    cameraTop = Math.floor((layer.height - cameraScaledHeight) / 2);
  } else {
    cameraTop = cameraTargetPosition.y - Math.floor(cameraScaledHeight / 2);

    if (cameraTop < 0) {
      cameraTop = 0;
    } else if (cameraTop > layer.height - cameraScaledHeight) {
      cameraTop = layer.height - cameraScaledHeight;
    }
  }

  return cc.rect(cameraLeft, cameraTop, cameraScaledWidth, cameraScaledHeight);
};
