/**
 * Agtk plugin tileset ID UI parameter interface module.
 *
 * @packageDocumentation
 */
import type { AgtkBaseResourceIdParameter } from './base-resource-id-parameter.interface';
import type { AgtkParameterType } from './parameter-type.enum';

/**
 * Agtk plugin tileset ID UI parameter interface.
 */
export interface AgtkTilesetIdParameter extends AgtkBaseResourceIdParameter {
  type: AgtkParameterType.TilesetId;
}
