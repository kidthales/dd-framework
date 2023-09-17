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
