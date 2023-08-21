/**
 * Agtk plugin text ID UI parameter interface module.
 *
 * @packageDocumentation
 */
import type { AgtkBaseResourceIdParameter } from './base-resource-id-parameter.interface';
import type { AgtkParameterType } from './parameter-type.enum';

/**
 * Agtk plugin text ID UI parameter interface.
 */
export interface AgtkTextIdParameter extends AgtkBaseResourceIdParameter {
  type: AgtkParameterType.TextId;
}
