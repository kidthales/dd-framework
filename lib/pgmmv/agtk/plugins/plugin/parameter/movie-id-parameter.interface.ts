/**
 * Agtk plugin movie ID UI parameter interface module.
 *
 * @packageDocumentation
 */
import type { AgtkBaseResourceIdParameter } from './base-resource-id-parameter.interface';
import type { AgtkParameterType } from './parameter-type.enum';

/**
 * Agtk plugin movie ID UI parameter interface.
 */
export interface AgtkMovieIdParameter extends AgtkBaseResourceIdParameter {
  type: AgtkParameterType.MovieId;
}
