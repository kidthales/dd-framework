/**
 * Core plugin API user interface types module.
 *
 * @module    @dd/core/ui/types
 * @author    kidthales <kidthales@agogpixel.com>
 * @copyright 2023 kidthales
 * @license   {@link https://github.com/kidthales/dd-framework/blob/main/LICENSE.txt | MIT License}
 */
import type { EventEmitter } from '@dd/core/event/emitter/types';

export enum OpenCloseState {
  Closed,
  Opening,
  Opened,
  Closing
}

export interface OpenClose {
  eventEmitter: EventEmitter;
  _openCloseState?: OpenCloseState;
  open: () => void;
  close: () => void;
  isOpened: () => boolean;
  isOpening: () => boolean;
  isClosed: () => boolean;
  isClosing: () => boolean;
  _transitionOpenCloseState: (state: OpenCloseState) => void;
  _logOpenCloseTransitionWarning: (from: OpenCloseState, to: OpenCloseState) => void;
}
