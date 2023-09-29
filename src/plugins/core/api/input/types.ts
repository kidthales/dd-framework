/**
 * Core plugin API input types module.
 *
 * @module    @dd/core/input/types
 * @author    kidthales <kidthales@agogpixel.com>
 * @copyright 2023 kidthales
 * @license   {@link https://github.com/kidthales/dd-framework/blob/main/LICENSE.txt | MIT License}
 */

/**
 *
 */
export interface ControllerState {
  /**
   *
   */
  pressed: number;

  /**
   *
   */
  frameCounts: Record<number, number>;
}
