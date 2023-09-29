/**
 * Core plugin API coordinate module.
 *
 * @module    dd.core.coord
 * @author    kidthales <kidthales@agogpixel.com>
 * @copyright 2023 kidthales
 * @license   {@link https://github.com/kidthales/dd-framework/blob/main/LICENSE.txt | MIT License}
 */

/**
 * Exposes methods for working with spatial coordinates
 */
module.exports = {
  /**
   * {@linkcode "dd.core.coord.cameraPositionToWorld" | dd.core.coord.cameraPositionToWorld}
   */
  cameraPositionToWorld: require('./camera-position-to-world'),

  /**
   * {@linkcode "dd.core.coord.tilePositionToWorld" | dd.core.coord.tilePositionToWorld}
   */
  tilePositionToWorld: require('./tile-position-to-world'),

  /**
   * {@linkcode "dd.core.coord.tileXToWorld" | dd.core.coord.tileXToWorld}
   */
  tileXToWorld: require('./tile-x-to-world'),

  /**
   * {@linkcode "dd.core.coord.tileYToWorld" | dd.core.coord.tileYToWorld}
   */
  tileYToWorld: require('./tile-y-to-world'),

  /**
   * {@linkcode "dd.core.coord.worldPositionToCamera" | dd.core.coord.worldPositionToCamera}
   */
  worldPositionToCamera: require('./world-position-to-camera'),

  /**
   * {@linkcode "dd.core.coord.worldPositionToTile" | dd.core.coord.worldPositionToTile}
   */
  worldPositionToTile: require('./world-position-to-tile'),

  /**
   * {@linkcode "dd.core.coord.worldXToTile" | dd.core.coord.worldXToTile}
   */
  worldXToTile: require('./world-x-to-tile'),

  /**
   * {@linkcode "dd.core.coord.worldYToTile" | dd.core.coord.worldYToTile}
   */
  worldYToTile: require('./world-y-to-tile')
};
