/**
 * @module @dd/core/api/time/poll-with-interval
 */

/**
 * Poll until conditional satisfaction with specified interval & optional
 * timeout. Will call `onProceed` when condition is satisfied, `onTimeout` if
 * provided timeout is reached.
 *
 * @param conditional Condition callback.
 * @param onProceed Proceed callback.
 * @param onTimeout Timeout callback.
 * @param interval Interval in milliseconds.
 * @param timeout Timeout in milliseconds.
 * @returns {void}
 */
module.exports = function (
  /** @type {() => boolean} */
  conditional,
  /** @type {() => void} */
  onProceed,
  /** @type {(elapsed: number) => void} */
  onTimeout,
  /** @type {number} */
  interval,
  /** @type {number|undefined} */
  timeout
) {
  var startTime = +new Date(),
    elapsedTime = 0,
    // eslint-disable-next-line no-redeclare
    interval = interval <= 0 ? 1000 : interval,
    // eslint-disable-next-line no-redeclare
    timeout = typeof timeout !== 'number' || timeout < 0 ? 0 : timeout;

  function poll() {
    elapsedTime += +new Date() - startTime;

    if (conditional()) {
      onProceed();
      return;
    } else if (timeout && elapsedTime >= timeout) {
      onTimeout(elapsedTime);
      return;
    }

    setTimeout(poll, interval);
  }

  setTimeout(poll, 0);
};
