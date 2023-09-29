/**
 * Core plugin API user interface font types module.
 *
 * @module    @dd/core/ui/font/types
 * @author    kidthales <kidthales@agogpixel.com>
 * @copyright 2023 kidthales
 * @license   {@link https://github.com/kidthales/dd-framework/blob/main/LICENSE.txt | MIT License}
 */
import type { CCTexture2D } from '@pgmmv/cc/texture-2d';

/**
 *
 */
interface BaseFontData {
  /**
   *
   */
  fontId: number;

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
