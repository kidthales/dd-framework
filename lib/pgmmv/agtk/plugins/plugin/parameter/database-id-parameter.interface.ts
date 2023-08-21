/**
 * Agtk plugin database ID UI parameter interface module.
 *
 * @packageDocumentation
 */
import type { AgtkBaseResourceIdParameter } from './base-resource-id-parameter.interface';
import type { AgtkParameterType } from './parameter-type.enum';

/**
 * Agtk plugin database ID UI parameter interface.
 */
export interface AgtkDatabaseIdParameter extends AgtkBaseResourceIdParameter {
  type: AgtkParameterType.DatabaseId;
}
