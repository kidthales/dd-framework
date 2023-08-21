/**
 * @module @dd/core/api/lock
 */

/**
 * @type {Record<string|number, import("./types").Locks>}
 * @private
 */
var _vault = {};

var lockApi = (module.exports = {
  /**
   *
   * @param {string|number} key
   * @returns {(() => void)|undefined}
   */
  acquireExclusiveLock: function (
    /** @type {string|number} */
    key
  ) {
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
   *
   * @param {string|number} key
   * @returns {(() => void)|undefined}
   */
  acquireSharedLock: function (
    /** @type {string|number} */
    key
  ) {
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
   *
   * @param {string|number} key
   * @param {number|undefined} maxSharedLocks
   * @returns {boolean}
   */
  createLocks: function (
    /** @type {string|number} */
    key,
    /** @type {number|undefined} */
    maxSharedLocks
  ) {
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
   *
   * @param {string|number} key
   * @returns {void}
   */
  destroyLocks: function (
    /** @type {string|number} */
    key
  ) {
    delete _vault[key];
  },

  /**
   *
   * @param {string|number} key
   * @returns {boolean}
   */
  hasLocks: function (
    /** @type {string|number} */
    key
  ) {
    return !!_vault[key];
  }
});
