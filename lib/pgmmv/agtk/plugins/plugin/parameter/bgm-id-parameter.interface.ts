/**
 * Agtk plugin background music ID UI parameter interface module.
 *
 * @packageDocumentation
 */
import type { AgtkBaseResourceIdParameter } from './base-resource-id-parameter.interface';
import type { AgtkParameterType } from './parameter-type.enum';

/**
 * Agtk plugin background music ID UI parameter interface.
 */
export interface AgtkBgmIdParameter extends AgtkBaseResourceIdParameter {
  type: AgtkParameterType.BgmId;
}
