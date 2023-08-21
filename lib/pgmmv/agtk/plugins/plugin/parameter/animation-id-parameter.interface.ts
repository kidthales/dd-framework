/**
 * Agtk plugin animation ID UI parameter interface module.
 *
 * @packageDocumentation
 */
import type { AgtkBaseResourceIdParameter } from './base-resource-id-parameter.interface';
import type { AgtkParameterType } from './parameter-type.enum';

/**
 * Agtk plugin animation ID UI parameter interface.
 */
export interface AgtkAnimationIdParameter extends AgtkBaseResourceIdParameter {
  type: AgtkParameterType.AnimationId;
}
