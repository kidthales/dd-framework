/**
 * Core plugin API lock types module.
 *
 * @module    @dd/core/lock/types
 * @author    kidthales <kidthales@agogpixel.com>
 * @copyright 2023 kidthales
 * @license   {@link https://github.com/kidthales/dd-framework/blob/main/LICENSE.txt | MIT License}
 */

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
