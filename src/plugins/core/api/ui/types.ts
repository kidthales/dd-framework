/**
 *
 */
export interface Container {
  /**
   *
   */
  open: () => void;

  /**
   *
   */
  close: () => void;

  /**
   *
   */
  isOpened: () => boolean;

  /**
   *
   */
  isOpening: () => boolean;

  /**
   *
   */
  isClosed: () => boolean;

  /**
   *
   */
  isClosing: () => boolean;
}
