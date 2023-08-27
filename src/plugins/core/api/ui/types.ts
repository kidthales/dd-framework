import type { CCEventManager } from '@pgmmv/cc/event-manager';

export enum OpenCloseState {
  Closed,
  Opening,
  Opened,
  Closing
}

export interface OpenClose {
  eventManager: CCEventManager;
  _openCloseState?: OpenCloseState;
  open: () => void;
  close: () => void;
  isOpened: () => boolean;
  isOpening: () => boolean;
  isClosed: () => boolean;
  isClosing: () => boolean;
  _transitionOpenCloseState: (state: OpenCloseState) => void;
}
