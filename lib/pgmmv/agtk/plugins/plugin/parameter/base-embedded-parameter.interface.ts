/**
 * Agtk plugin base embedded UI parameter interface module.
 *
 * @packageDocumentation
 */
import type { AgtkBaseParameter } from './base-parameter.interface';
import type { AgtkParameterType } from './parameter-type.enum';

/**
 * Agtk plugin base embedded UI parameter interface.
 */
export interface AgtkBaseEmbeddedParameter extends AgtkBaseParameter {
  type: AgtkParameterType.Embedded | AgtkParameterType.EmbeddedEditable;
  sourceId: number;
  reference?: 'fontId' | 'text';
  width?: number;
  height?: number;
}
