/**
 * Coordinate module.
 *
 * @module dd/core/coord
 */

/**
 *
 */
module.exports = {
  cameraPositionToWorld: require('./camera-position-to-world'),
  tilePositionToWorld: require('./tile-position-to-world'),
  tileXToWorld: require('./tile-x-to-world'),
  tileYToWorld: require('./tile-y-to-world'),
  worldPositionToCamera: require('./world-position-to-camera'),
  worldPositionToTile: require('./world-position-to-tile'),
  worldXToTile: require('./world-x-to-tile'),
  worldYToTile: require('./world-y-to-tile')
};
