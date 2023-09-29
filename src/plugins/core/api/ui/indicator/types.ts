/**
 * Core plugin API user interface indicator types module.
 *
 * @module    @dd/core/ui/indicator/types
 * @author    kidthales <kidthales@agogpixel.com>
 * @copyright 2023 kidthales
 * @license   {@link https://github.com/kidthales/dd-framework/blob/main/LICENSE.txt | MIT License}
 */
import type { CCColor } from '@pgmmv/cc/color';
import type { CCNode, CCNodeConstructor } from '@pgmmv/cc/node';
import type { CCSize } from '@pgmmv/cc/size';

export interface IndicatorConfig {
  contentSize: CCSize;
  color?: CCColor;
  opacity?: number;
}

export interface Indicator extends CCNode {}

export interface IndicatorConstructor extends CCNodeConstructor<Indicator, [IndicatorConfig]> {}
