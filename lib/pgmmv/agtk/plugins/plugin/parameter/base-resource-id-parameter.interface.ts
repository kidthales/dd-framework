/**
 * Agtk plugin base resource ID UI parameter interface module.
 *
 * @packageDocumentation
 */
import type { AgtkBaseParameter } from './base-parameter.interface';
import type { AgtkParameterType } from './parameter-type.enum';

/**
 * Agtk plugin base resource ID UI parameter interface.
 */
export interface AgtkBaseResourceIdParameter extends AgtkBaseParameter {
  type:
    | AgtkParameterType.ImageId
    | AgtkParameterType.TextId
    | AgtkParameterType.SceneId
    | AgtkParameterType.TilesetId
    | AgtkParameterType.AnimationId
    | AgtkParameterType.ObjectId
    | AgtkParameterType.FontId
    | AgtkParameterType.MovieId
    | AgtkParameterType.BgmId
    | AgtkParameterType.SeId
    | AgtkParameterType.VoiceId
    | AgtkParameterType.AnimOnlyId
    | AgtkParameterType.PortalId
    | AgtkParameterType.DatabaseId
    | AgtkParameterType.SwitchId
    | AgtkParameterType.VariableId
    | AgtkParameterType.SwitchVariableObjectId;
  defaultValue: -1;
}
