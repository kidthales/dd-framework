/**
 * Agtk plugin multi-line string UI parameter interface module.
 *
 * @packageDocumentation
 */
import type { AgtkBaseStringParameter } from './base-string-parameter.interface';
import type { AgtkParameterType } from './parameter-type.enum';

/**
 * Agtk plugin multi-line string UI parameter interface.
 */
export interface AgtkMultiLineStringParameter extends AgtkBaseStringParameter {
  type: AgtkParameterType.MultiLineString;
}
