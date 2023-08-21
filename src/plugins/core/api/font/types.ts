import type { CCTexture2D } from '@pgmmv/cc/texture-2d';

/**
 *
 */
interface BaseFontData {
  /**
   *
   */
  type: 'bitmap' | 'ttf';
}

/**
 *
 */
export interface BitmapFontData extends BaseFontData {
  /**
   *
   */
  type: 'bitmap';

  /**
   *
   */
  fixedWidth: boolean;

  /**
   *
   */
  hankakuWidth: number;

  /**
   *
   */
  layoutLineList: string[];

  /**
   *
   */
  letterHeight: number;

  /**
   *
   */
  letterWidth: number;

  /**
   *
   */
  texture: CCTexture2D;

  /**
   *
   */
  zenkakuWidth: number;
}

/**
 *
 */
export interface TrueTypeFontData extends BaseFontData {
  /**
   *
   */
  type: 'ttf';

  /**
   *
   */
  aliasThreshold: number;

  /**
   *
   */
  filename: string;

  /**
   *
   */
  letterHeight: number;

  /**
   *
   */
  size: number;
}

/**
 *
 */
export type FontData = BitmapFontData | TrueTypeFontData;
