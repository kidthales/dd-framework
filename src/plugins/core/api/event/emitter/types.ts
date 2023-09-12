import type create from './create';

export interface EventListener {
  fn: Function;
  ctx: unknown;
  once?: boolean;
}

export type EventEmitter = ReturnType<typeof create>;
