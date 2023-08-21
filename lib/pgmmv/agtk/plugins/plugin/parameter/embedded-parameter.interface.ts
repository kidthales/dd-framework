/**
 * Agtk plugin embedded UI parameter interface module.
 *
 * @packageDocumentation
 */
import type { AgtkBaseEmbeddedParameter } from './base-embedded-parameter.interface';
import type { AgtkParameterType } from './parameter-type.enum';

/**
 * Agtk plugin embedded UI parameter interface.
 */
export interface AgtkEmbeddedParameter extends AgtkBaseEmbeddedParameter {
  type: AgtkParameterType.Embedded;
}
