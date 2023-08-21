/**
 * Agtk plugin font ID UI parameter interface module.
 *
 * @packageDocumentation
 */
import type { AgtkBaseResourceIdParameter } from './base-resource-id-parameter.interface';
import type { AgtkParameterType } from './parameter-type.enum';

/**
 * Agtk plugin font ID UI parameter interface.
 */
export interface AgtkFontIdParameter extends AgtkBaseResourceIdParameter {
  type: AgtkParameterType.FontId;
}
