/**
 * Agtk plugin variable ID UI parameter interface module.
 *
 * @packageDocumentation
 */
import type { AgtkBaseSwitchOrVariableIdParameter } from './base-switch-or-variable-id-parameter.interface';
import type { AgtkParameterType } from './parameter-type.enum';

/**
 * Agtk plugin variable ID UI parameter interface.
 */
export interface AgtkVariableIdParameter extends AgtkBaseSwitchOrVariableIdParameter {
  type: AgtkParameterType.VariableId;
}
