/**
 *
 */
export interface Locks {
  /**
   *
   */
  maxSharedLocks: number;

  /**
   *
   */
  sharedLockCount: number;

  /**
   *
   */
  isExclusiveLockActive: boolean;
}
