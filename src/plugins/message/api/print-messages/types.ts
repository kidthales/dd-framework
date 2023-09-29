/**
 * Message plugin API print messages types module.
 *
 * @module    @dd/message/print-messages/types
 * @author    kidthales <kidthales@agogpixel.com>
 * @copyright 2023 kidthales
 * @license   {@link https://github.com/kidthales/dd-framework/blob/main/LICENSE.txt | MIT License}
 */
import type { FontData } from 'src/plugins/core/api/ui/font/types';
import type { JobConfig, TextAlignmentConfig } from '@dd/core/ui/text/printer/types';
import type { BasePanelConfig, GraphicsPanelConfig, ImagePanelConfig } from '@dd/core/ui/panel/types';
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

export type BaseBackgroundConfig = Omit<BasePanelConfig, 'size' | 'startClosed'> & { opacity: number };

export type GraphicsBackgroundConfig = BaseBackgroundConfig & Omit<GraphicsPanelConfig, 'size' | 'startClosed'>;

export type ImageBackgroundConfig = BaseBackgroundConfig &
  Omit<ImagePanelConfig, 'size' | 'startClosed' | 'texture' | 'textureFrame'> & { imageId: number; imageFrame: CCRect };

export type BackgroundConfigUnion = GraphicsBackgroundConfig | ImageBackgroundConfig;

export interface PrintMessagesConfig extends Omit<JobConfig, 'pages'> {
  messages: MessageUnion[];
  overrideFont?: FontData;
  printingSfxId?: number;
  indicator?: CustomIndicator;
  scale?: CCPoint;
  background?: BackgroundConfigUnion;
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
