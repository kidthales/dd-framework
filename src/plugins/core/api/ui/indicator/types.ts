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
