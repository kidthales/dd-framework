/**
 * Agtk UI parameter type module.
 *
 * @packageDocumentation
 */
import type { AgtkAnimOnlyIdParameter } from './anim-only-id-parameter.interface';
import type { AgtkAnimationIdParameter } from './animation-id-parameter.interface';
import type { AgtkBgmIdParameter } from './bgm-id-parameter.interface';
import type { AgtkCustomIdParameter } from './custom-id-parameter';
import type { AgtkDatabaseIdParameter } from './database-id-parameter.interface';
import type { AgtkEmbeddedEditableParameter } from './embedded-editable-parameter.interface';
import type { AgtkEmbeddedParameter } from './embedded-parameter.interface';
import type { AgtkFontIdParameter } from './font-id-parameter.interface';
import type { AgtkImageIdParameter } from './image-id-parameter.interface';
import type { AgtkJsonParameter } from './json-parameter.interface';
import type { AgtkMovieIdParameter } from './movie-id-parameter.interface';
import type { AgtkMultiLineStringParameter } from './multi-line-string-parameter.interface';
import type { AgtkNumberParameter } from './number-parameter.interface';
import type { AgtkObjectIdParameter } from './object-id-parameter.interface';
import type { AgtkPortalIdParameter } from './portal-id-parameter.interface';
import type { AgtkSceneIdParameter } from './scene-id-parameter.interface';
import type { AgtkSeIdParameter } from './se-id-parameter.interface';
import type { AgtkStringParameter } from './string-parameter.interface';
import type { AgtkSwitchIdParameter } from './switch-id-parameter.interface';
import type { AgtkSwitchVariableObjectIdParameter } from './switch-variable-object-id-parameter.interface';
import type { AgtkTextIdParameter } from './text-id-parameter.interface';
import type { AgtkTilesetIdParameter } from './tileset-id-parameter.interface';
import type { AgtkVariableIdParameter } from './variable-id-parameter.interface';
import type { AgtkVoiceIdParameter } from './voice-id-parameter.interface';

/**
 * Agtk UI parameter type.
 */
export type AgtkParameter =
  | AgtkAnimOnlyIdParameter
  | AgtkAnimationIdParameter
  | AgtkBgmIdParameter
  | AgtkCustomIdParameter
  | AgtkDatabaseIdParameter
  | AgtkEmbeddedEditableParameter
  | AgtkEmbeddedParameter
  | AgtkFontIdParameter
  | AgtkImageIdParameter
  | AgtkJsonParameter
  | AgtkMovieIdParameter
  | AgtkMultiLineStringParameter
  | AgtkNumberParameter
  | AgtkObjectIdParameter
  | AgtkPortalIdParameter
  | AgtkSceneIdParameter
  | AgtkSeIdParameter
  | AgtkStringParameter
  | AgtkSwitchIdParameter
  | AgtkSwitchVariableObjectIdParameter
  | AgtkTextIdParameter
  | AgtkTilesetIdParameter
  | AgtkVariableIdParameter
  | AgtkVoiceIdParameter;
