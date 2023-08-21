/**
 * Agtk plugin portal ID UI parameter interface module.
 *
 * @packageDocumentation
 */
import type { AgtkBaseResourceIdParameter } from './base-resource-id-parameter.interface';
import type { AgtkParameterType } from './parameter-type.enum';

/**
 * Agtk plugin portal ID UI parameter interface.
 */
export interface AgtkPortalIdParameter extends AgtkBaseResourceIdParameter {
  type: AgtkParameterType.PortalId;
}
