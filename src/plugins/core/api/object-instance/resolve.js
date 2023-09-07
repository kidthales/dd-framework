/**
 * Resolve module.
 *
 * @module dd/core/object-instance/resolve
 */

/**
 * Resolve to an object instance.
 *
 * @param {import("./types").ObjectInstanceLike} objectInstanceLike
 * @returns {import("@pgmmv/agtk/object-instances/object-instance").AgtkObjectInstance|undefined}
 */
module.exports = function (objectInstanceLike) {
  /** @type {number|undefined} */
  var instanceId,
    /** @type {import("../object/types").ObjectLike|undefined} */
    objectLike,
    /** @type {string|undefined} */
    instanceName;

  if (typeof objectInstanceLike === 'number') {
    instanceId = objectInstanceLike;
  } else if (Array.isArray(objectInstanceLike)) {
    if (objectInstanceLike.length >= 2) {
      objectLike = objectInstanceLike[0];
      instanceName = objectInstanceLike[1];

      if (typeof objectLike === 'number') {
        instanceId = Agtk.objectInstances.getIdByName(objectLike, instanceName);
      } else if (typeof objectLike === 'string') {
        objectLike = Agtk.objects.getIdByName(objectLike);

        if (objectLike !== Agtk.constants.actionCommands.UnsetObject) {
          instanceId = Agtk.objectInstances.getIdByName(objectLike, instanceName);
        }
      } else if (objectLike && typeof objectLike.id === 'number') {
        instanceId = Agtk.objectInstances.getIdByName(objectLike.id, instanceName);
      }
    }
  } else if (objectInstanceLike && typeof objectInstanceLike.id === 'number') {
    return objectInstanceLike;
  }

  if (instanceId !== undefined && instanceId !== Agtk.constants.actionCommands.UnsetObject) {
    return Agtk.objectInstances.get(instanceId) || undefined;
  }
};
