/**
 * Core plugin API utility types module.
 *
 * @module    @dd/core/util/types
 * @author    kidthales <kidthales@agogpixel.com>
 * @copyright 2023 kidthales
 * @license   {@link https://github.com/kidthales/dd-framework/blob/main/LICENSE.txt | MIT License}
 */
import type { AgtkSwitchVariableObjects } from '@pgmmv/agtk/constants/switch-variable-objects';
import type { ObjectInstanceLike } from '@dd/core/object-instance/types';
import type { AgtkImage } from '@pgmmv/agtk/images/image';

/**
 *
 */
export type SwitchVariableSource = AgtkSwitchVariableObjects['ProjectCommon'] | ObjectInstanceLike;

/**
 *
 */
export type TextureSource = string | number | AgtkImage;
