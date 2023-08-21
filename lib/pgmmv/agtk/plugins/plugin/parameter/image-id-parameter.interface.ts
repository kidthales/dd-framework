/**
 * Agtk plugin image ID UI parameter interface module.
 *
 * @packageDocumentation
 */
import type { AgtkBaseResourceIdParameter } from './base-resource-id-parameter.interface';
import type { AgtkParameterType } from './parameter-type.enum';

/**
 * Agtk plugin image ID UI parameter interface.
 */
export interface AgtkImageIdParameter extends AgtkBaseResourceIdParameter {
  type: AgtkParameterType.ImageId;
}
