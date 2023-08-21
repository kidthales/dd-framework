/**
 * Agtk plugin voice ID UI parameter interface module.
 *
 * @packageDocumentation
 */
import type { AgtkBaseResourceIdParameter } from './base-resource-id-parameter.interface';
import type { AgtkParameterType } from './parameter-type.enum';

/**
 * Agtk plugin voice ID UI parameter interface.
 */
export interface AgtkVoiceIdParameter extends AgtkBaseResourceIdParameter {
  type: AgtkParameterType.VoiceId;
}
