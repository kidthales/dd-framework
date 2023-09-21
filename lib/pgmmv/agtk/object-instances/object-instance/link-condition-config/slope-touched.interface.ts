/**
 * Agtk object instance slope touched link condition configuration interface
 * module.
 *
 * @packageDocumentation
 */
import type { AgtkSlopeTouched as AgtkSlopeTouchedConstant } from '../../../constants/link-condition/slope-touched';

/**
 * Agtk slope touched direction type type.
 *
 * @internal
 */
export type AgtkSlopeTouchedDirectionType =
  | AgtkSlopeTouchedConstant['DirectionUpper']
  | AgtkSlopeTouchedConstant['DirectionLower']
  | AgtkSlopeTouchedConstant['DirectionAny'];

/**
 * Agtk slope touched downward type type.
 *
 * @internal
 */
export type AgtkSlopeTouchedDownwardType =
  | AgtkSlopeTouchedConstant['DownwardLeft']
  | AgtkSlopeTouchedConstant['DownwardRight']
  | AgtkSlopeTouchedConstant['DownwardNone'];

/**
 * Agtk object instance slope touched link condition configuration interface.
 */
export interface AgtkSlopeTouched {
  /**
   * Value 0 - 2.
   *  - 0 = From Top
   *  - 1 = From Bottom
   *  - 2 = Don't Set
   */
  directionType: AgtkSlopeTouchedDirectionType;

  /**
   * Value 0 - 2.
   *  - 0 = Sloping Left
   *  - 1 = Sloping Right
   *  - 2 = Don't Set
   */
  downwardType: AgtkSlopeTouchedDownwardType;
}
