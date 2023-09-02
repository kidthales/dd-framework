import type { TextData, TextSprites } from '@dd/core/api/text/types';
import type { CCColor } from '@pgmmv/cc/color';
import type { CCEventManager } from '@pgmmv/cc/event-manager';
import type { CCLayer, CCLayerConstructor } from '@pgmmv/cc/layer';
import type { CCSize } from '@pgmmv/cc/size';

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

export interface PageConfig {
  text: TextData;
  align?: Partial<TextAlignmentConfig>;
  printSpeed?: number;
  clearSpeed?: number;
  color?: CCColor;
  opacity?: number;
}

export interface LayoutConfig {
  size?: CCSize;
  margin: { top: number; bottom: number; left: number; right: number };
  align: TextAlignmentConfig;
}

export interface JobConfig {
  pages: PageConfig[];
  layout?: Partial<LayoutConfig>;
  printSpeed?: number;
  clearSpeed?: number;
  color?: CCColor;
  opacity?: number;
}

export enum PrinterState {
  Home,
  Printing,
  End,
  Clearing
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

export interface Printer extends CCLayer {
  eventManager: CCEventManager;
  _state: PrinterState;
  _job?: JobConfig;
  _currentPage?: ComputedPageConfig;
  _lineIndex: number;
  _letterIndex: number;
  _letterAccumulator: number;
  _clearIndex: number;
  _clearAccumulator: number;
  setJob: (job: JobConfig) => void;
  print: (pageIndex: number) => void;
  clear: () => void;
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
