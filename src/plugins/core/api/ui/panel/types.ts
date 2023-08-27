import type { OpenClose } from '@dd/core/api/ui/types';
import type { CCColor } from '@pgmmv/cc/color';
import { CCDrawNode, CCDrawNodeConstructor } from '@pgmmv/cc/draw-node';
import { CCNode } from '@pgmmv/cc/node';
import type { CCPoint } from '@pgmmv/cc/point';
import type { CCRect } from '@pgmmv/cc/rect';
import { CCScale9Sprite, CCScale9SpriteConstructor } from '@pgmmv/cc/scale-9-sprite';
import type { CCSize } from '@pgmmv/cc/size';
import type { CCTexture2D } from '@pgmmv/cc/texture-2d';

export type PanelRenderType = 'graphics' | 'image';

export interface BasePanelConfig {
  renderType: PanelRenderType;
  size: CCSize;
  openCloseDelta: CCPoint;
  startClosed: boolean;
}

export interface GraphicsPanelConfig extends BasePanelConfig {
  renderType: 'graphics';
  backgroundColor: CCColor;
  borderColor: CCColor;
  borderThickness: number;
}

export interface ImagePanelConfig extends BasePanelConfig {
  renderType: 'image';
  texture: CCTexture2D;
  textureFrame: CCRect;
  capInsetRect: CCRect;
}

export type PanelConfigUnion = GraphicsPanelConfig | ImagePanelConfig;

export interface Panel<T extends PanelConfigUnion = PanelConfigUnion> extends OpenClose, Pick<CCNode, 'update'> {
  _config: T;
  _openCloseInterpolationState: CCPoint;
  _updateClosed: (dt: number) => void;
  _updateOpening: (dt: number) => void;
  _updateOpened: (dt: number) => void;
  _updateClosing: (dt: number) => void;
  _updateOpenCloseInterpolationState: (dt: number, direction: 1 | -1) => void;
  _postUpdateOpenCloseInterpolationState: (direction: 1 | -1) => void;
}

export interface ImagePanel extends CCScale9Sprite, Panel<ImagePanelConfig> {}

export interface ImagePanelConstructor extends CCScale9SpriteConstructor<ImagePanel, [ImagePanelConfig]> {}

export interface GraphicsPanel extends CCDrawNode, Panel<GraphicsPanelConfig> {}

export interface GraphicsPanelConstructor extends CCDrawNodeConstructor<GraphicsPanel, [GraphicsPanelConfig]> {}

export type PanelUnion = ImagePanel | GraphicsPanel;
