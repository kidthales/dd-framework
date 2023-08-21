import type { AgtkObjectInstance } from '@pgmmv/agtk/object-instances/object-instance';
import type { ObjectLike } from '@dd/core/api/object/types';

/**
 *
 */
export type NamedObjectInstanceIdentifier = [ObjectLike, string];

/**
 *
 */
export type ObjectInstanceLike = NamedObjectInstanceIdentifier | number | AgtkObjectInstance;
