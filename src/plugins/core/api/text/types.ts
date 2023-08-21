import type { CCLabelTTF } from '@pgmmv/cc/label-ttf';
import type { CCSprite } from '@pgmmv/cc/sprite';

import type { FontData } from '@dd/core/api/font/types';

/**
 *
 */
export interface TextData {
  /**
   *
   */
  message: string;

  /**
   *
   */
  font?: FontData;

  /**
   *
   */
  letterSpacing: number;

  /**
   *
   */
  lineSpacing: number;
}

/**
 * Properties common to all parsed tag types.
 */
interface BaseParsedTextTag {
  /**
   * Position index of the start of a tag within a string.
   */
  head: number;

  /**
   * Specifies the type of tag.
   */
  tagName?: 'C' | 'S';
}

/**
 * Parsed color tag data.
 */
export interface ParsedColorTextTag extends BaseParsedTextTag {
  /**
   * This is a color tag.
   */
  tagName: 'C';

  /**
   * 3-tuple representing RGB color channel data.
   */
  param: [number, number, number];
}

/**
 * Parsed font size data.
 */
export interface ParsedSizeTextTag extends BaseParsedTextTag {
  /**
   * This is a size tag.
   */
  tagName: 'S';

  /**
   * A scalar value representing the absolute size.
   */
  param: number;
}

/**
 * Union type of parsed text tag function results.
 */
export type ParsedTextTag = ParsedColorTextTag | ParsedSizeTextTag;

/**
 *
 */
export interface TextTagParserContext {
  /**
   *
   */
  currentSize: number;

  /**
   *
   */
  defaultColor: [number, number, number];

  /**
   *
   */
  defaultSize: number;
}

/**
 *
 */
export interface TextSprite {
  /**
   *
   */
  endX: number;

  /**
   *
   */
  sprite: CCSprite | CCLabelTTF;
}

/**
 *
 */
export type TextSpritesLine = TextSprite[] & {
  /**
   *
   */
  y: number;

  /**
   *
   */
  width: number;

  /**
   *
   */
  height: number;
};

/**
 *
 */
export type TextSprites = TextSpritesLine[] & {
  /**
   *
   */
  width: number;

  /**
   *
   */
  height: number;

  /**
   *
   */
  numLetters: number;
};
