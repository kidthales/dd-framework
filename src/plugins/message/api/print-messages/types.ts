import type { FontData } from '@dd/core/font/types';
import type { JobConfig, TextAlignmentConfig } from '@dd/core/text/printer/types';
import type { AgtkSwitch as AgtkObjectInstanceSwitch } from '@pgmmv/agtk/object-instances/object-instance/switches/switch';
import type { AgtkSwitch as AgtkCommonSwitch } from '@pgmmv/agtk/switches/switch';
import type { CCPoint } from '@pgmmv/cc/point';
import type { CCRect } from '@pgmmv/cc/rect';

export enum HorizontalPosition {
  Left,
  Center,
  Right
}

export enum VerticalPosition {
  Top,
  Center,
  Bottom
}

export interface MessageConfig {
  id: number;
  align?: Partial<TextAlignmentConfig>;
  printSpeed?: number;
  clearSpeed?: number;
  color?: [number, number, number];
  opacity?: number;
}

export type MessageUnion = number | MessageConfig;

export interface CustomIndicator {
  imageId: number;
  frame: CCRect;
}

export interface PrintMessagesConfig extends Omit<JobConfig, 'pages'> {
  messages: MessageUnion[];
  overrideFont?: FontData;
  printingSfxId?: number;
  indicator?: CustomIndicator;
  scale?: CCPoint;
}

export interface RelativePosition {
  horizontal?: HorizontalPosition;
  vertical?: VerticalPosition;
  offset?: CCPoint;
}

export interface Interactive {
  okSwitch: AgtkObjectInstanceSwitch | AgtkCommonSwitch;
  cancelSwitch?: AgtkObjectInstanceSwitch | AgtkCommonSwitch;
  canExpedite?: boolean;
}
