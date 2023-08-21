/**
 * Agtk plugin switch/variable object ID UI parameter interface module.
 *
 * @packageDocumentation
 */
import type { AgtkBaseResourceIdParameter } from './base-resource-id-parameter.interface';
import type { AgtkParameterType } from './parameter-type.enum';

/**
 * Agtk plugin switch/variable object ID UI parameter interface.
 */
export interface AgtkSwitchVariableObjectIdParameter extends AgtkBaseResourceIdParameter {
  type: AgtkParameterType.SwitchVariableObjectId;
  option: ('SelfObject' | 'LockedObject' | 'ParentObject')[];
}
