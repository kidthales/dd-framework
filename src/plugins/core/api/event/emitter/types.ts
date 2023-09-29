/**
 * Core plugin API event emitter types module.
 *
 * @module    @dd/core/event/emitter/types
 * @author    kidthales <kidthales@agogpixel.com>
 * @copyright 2023 kidthales
 * @license   {@link https://github.com/kidthales/dd-framework/blob/main/LICENSE.txt | MIT License}
 */
import type create from './create';

export interface EventListener {
  fn: Function;
  ctx: unknown;
  once?: boolean;
}

export type EventEmitter = ReturnType<typeof create>;
