/**
 * Core plugin API object instance types module.
 *
 * @module    @dd/core/object-instance/types
 * @author    kidthales <kidthales@agogpixel.com>
 * @copyright 2023 kidthales
 * @license   {@link https://github.com/kidthales/dd-framework/blob/main/LICENSE.txt | MIT License}
 */
import type { AgtkObjectInstance } from '@pgmmv/agtk/object-instances/object-instance';
import type { ObjectLike } from '@dd/core/object/types';

/**
 *
 */
export type NamedObjectInstanceIdentifier = [ObjectLike, string];

/**
 *
 */
export type ObjectInstanceLike = NamedObjectInstanceIdentifier | number | AgtkObjectInstance;
