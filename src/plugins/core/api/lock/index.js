/**
 * Core plugin API lock module.
 *
 * @module    dd.core.lock
 * @author    kidthales <kidthales@agogpixel.com>
 * @copyright 2023 kidthales
 * @license   {@link https://github.com/kidthales/dd-framework/blob/main/LICENSE.txt | MIT License}
 */

/**
 * @type {Record<string|number, import("./types").Locks>}
 * @private
 */
var _vault = {};

/**
 * Exposes methods for working with the resource locks.
 */
var lockApi = (module.exports = {
  /**
   * @param {string|number} key
   * @returns {(() => void)|undefined}
   */
  acquireExclusiveLock: function (key) {
    /** @type {import("./types").Locks} */
    var locks;

    if (!lockApi.hasLocks(key)) {
      return;
    }

    locks = _vault[key];

    if (locks.isExclusiveLockActive || locks.sharedLockCount > 0) {
      return;
    }

    locks.isExclusiveLockActive = true;

    return function () {
      locks.isExclusiveLockActive = false;
    };
  },

  /**
   * @param {string|number} key
   * @returns {(() => void)|undefined}
   */
  acquireSharedLock: function (key) {
    /** @type {import("./types").Locks} */
    var locks;

    if (!lockApi.hasLocks(key)) {
      return;
    }

    locks = _vault[key];

    if (locks.isExclusiveLockActive || locks.sharedLockCount >= locks.maxSharedLocks) {
      return;
    }

    ++locks.sharedLockCount;

    return function () {
      --locks.sharedLockCount;
    };
  },

  /**
   * @param {string|number} key
   * @param {number|undefined} maxSharedLocks
   * @returns {boolean}
   */
  createLocks: function (key, maxSharedLocks) {
    if (lockApi.hasLocks(key)) {
      return false;
    }

    _vault[key] = {
      maxSharedLocks: maxSharedLocks && maxSharedLocks > 1 ? maxSharedLocks : 2,
      sharedLockCount: 0,
      isExclusiveLockActive: false
    };

    return true;
  },

  /**
   * @param {string|number} key
   * @returns {void}
   */
  destroyLocks: function (key) {
    delete _vault[key];
  },

  /**
   * @param {string|number} key
   * @returns {boolean}
   */
  hasLocks: function (key) {
    return !!_vault[key];
  }
});
