/**
 * Agtk plugin sound effect ID UI parameter interface module.
 *
 * @packageDocumentation
 */
import type { AgtkBaseResourceIdParameter } from './base-resource-id-parameter.interface';
import type { AgtkParameterType } from './parameter-type.enum';

/**
 * Agtk plugin sound effect ID UI parameter interface.
 */
export interface AgtkSeIdParameter extends AgtkBaseResourceIdParameter {
  type: AgtkParameterType.SeId;
}
