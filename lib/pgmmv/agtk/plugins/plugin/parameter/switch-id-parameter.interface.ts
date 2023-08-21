/**
 * Agtk plugin switch ID UI parameter interface module.
 *
 * @packageDocumentation
 */
import type { AgtkBaseSwitchOrVariableIdParameter } from './base-switch-or-variable-id-parameter.interface';
import type { AgtkParameterType } from './parameter-type.enum';

/**
 * Agtk plugin switch ID UI parameter interface.
 */
export interface AgtkSwitchIdParameter extends AgtkBaseSwitchOrVariableIdParameter {
  type: AgtkParameterType.SwitchId;
}
