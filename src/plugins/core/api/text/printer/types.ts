import type { EventEmitter } from '@dd/core/event/emitter/types';
import type { TextData, TextSprites } from '@dd/core/text/types';
import type { CCColor } from '@pgmmv/cc/color';
import type { CCLayer, CCLayerConstructor } from '@pgmmv/cc/layer';
import type { PartialDeep } from 'type-fest';

export enum PrinterState {
  Home,
  Printing,
  End,
  Clearing
}

export enum HorizontalTextAlignment {
  Left,
  Center,
  Right
}

export enum VerticalTextAlignment {
  Top,
  Center,
  Bottom
}

export interface TextAlignmentConfig {
  horizontal: HorizontalTextAlignment;
  vertical: VerticalTextAlignment;
}

export interface MarginConfig {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

export interface LayoutConfig {
  margin: MarginConfig;
  align: TextAlignmentConfig;
}

export interface PageConfig {
  text: TextData;
  align?: Partial<TextAlignmentConfig>;
  printSpeed?: number;
  clearSpeed?: number;
  color?: CCColor;
  opacity?: number;
}

export interface ComputedPageConfig {
  index: number;
  text: TextSprites;
  layout: LayoutConfig;
  printSpeed: number;
  clearSpeed: number;
  color?: CCColor;
  opacity?: number;
}

export interface JobConfig {
  pages: PageConfig[];
  layout?: PartialDeep<LayoutConfig>;
  printSpeed?: number;
  clearSpeed?: number;
  color?: CCColor;
  opacity?: number;
}

export interface ComputedJobConfig {
  pages: PageConfig[];
  layout: LayoutConfig;
  printSpeed: number;
  clearSpeed: number;
  color?: CCColor;
  opacity?: number;
}

export interface Printer extends CCLayer {
  eventEmitter: EventEmitter;
  _state: PrinterState;
  _job?: ComputedJobConfig;
  _currentPage?: ComputedPageConfig;
  _lineIndex: number;
  _letterIndex: number;
  _letterAccumulator: number;
  _clearIndex: number;
  _clearAccumulator: number;
  setJob: (job: JobConfig) => void;
  print: (pageIndex: number) => void;
  clear: () => void;
  getMargin: () => MarginConfig;
  getNumPages: () => number;
  getCurrentPageIndex: () => number;
  isHome: () => boolean;
  isPrinting: () => boolean;
  isEnd: () => boolean;
  isClearing: () => boolean;
  _updateHome: (dt: number) => void;
  _updatePrinting: (dt: number) => void;
  _updateEnd: (dt: number) => void;
  _updateClearing: (dt: number) => void;
  _transitionState: (state: PrinterState) => void;
  _logTransitionWarning: (from: PrinterState, to: PrinterState) => void;
  _cancel: () => void;
}

export interface PrinterConstructor extends CCLayerConstructor<Printer> {}
