/**
 * Core plugin API object types module.
 *
 * @module    @dd/core/object/types
 * @author    kidthales <kidthales@agogpixel.com>
 * @copyright 2023 kidthales
 * @license   {@link https://github.com/kidthales/dd-framework/blob/main/LICENSE.txt | MIT License}
 */
import type { AgtkObject } from '@pgmmv/agtk/objects/object';

/**
 *
 */
export type ObjectLike = string | number | AgtkObject;
