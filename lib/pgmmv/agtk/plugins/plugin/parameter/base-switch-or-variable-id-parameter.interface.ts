/**
 * Agtk plugin base switch or variable ID UI parameter interface module.
 *
 * @packageDocumentation
 */
import type { AgtkBaseResourceIdParameter } from './base-resource-id-parameter.interface';
import type { AgtkParameterType } from './parameter-type.enum';

/**
 * Agtk plugin base switch or variable ID UI parameter interface.
 */
export interface AgtkBaseSwitchOrVariableIdParameter extends AgtkBaseResourceIdParameter {
  type: AgtkParameterType.SwitchId | AgtkParameterType.VariableId;
  referenceId: string;
  withNewButton?: boolean;
}
