/**
 * Agtk plugin embedded editable UI parameter interface module.
 *
 * @packageDocumentation
 */
import type { AgtkBaseEmbeddedParameter } from './base-embedded-parameter.interface';
import type { AgtkParameterType } from './parameter-type.enum';

/**
 * Agtk plugin embedded editable UI parameter interface.
 */
export interface AgtkEmbeddedEditableParameter extends AgtkBaseEmbeddedParameter {
  type: AgtkParameterType.EmbeddedEditable;
  reference: 'fontId' | 'text';
}
