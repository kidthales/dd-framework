/**
 * Agtk plugin animation-only ID UI parameter interface module.
 *
 * @packageDocumentation
 */
import type { AgtkBaseResourceIdParameter } from './base-resource-id-parameter.interface';
import type { AgtkParameterType } from './parameter-type.enum';

/**
 * Agtk plugin animation-only ID UI parameter interface.
 */
export interface AgtkAnimOnlyIdParameter extends AgtkBaseResourceIdParameter {
  type: AgtkParameterType.AnimOnlyId;
}
