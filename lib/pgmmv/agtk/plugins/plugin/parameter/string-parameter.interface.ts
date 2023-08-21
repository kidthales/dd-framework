/**
 * Agtk plugin string UI parameter interface module.
 *
 * @packageDocumentation
 */
import type { AgtkBaseStringParameter } from './base-string-parameter.interface';
import type { AgtkParameterType } from './parameter-type.enum';

/**
 * Agtk plugin string UI parameter interface.
 */
export interface AgtkStringParameter extends AgtkBaseStringParameter {
  type: AgtkParameterType.String;
}
