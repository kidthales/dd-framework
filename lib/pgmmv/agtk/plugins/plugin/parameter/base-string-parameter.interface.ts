/**
 * Agtk plugin base string UI parameter interface module.
 *
 * @packageDocumentation
 */
import type { AgtkBaseParameter } from './base-parameter.interface';
import type { AgtkParameterType } from './parameter-type.enum';

/**
 * Agtk plugin base string UI parameter interface.
 */
export interface AgtkBaseStringParameter extends AgtkBaseParameter {
  type: AgtkParameterType.String | AgtkParameterType.MultiLineString;
  defaultValue: string;
}
