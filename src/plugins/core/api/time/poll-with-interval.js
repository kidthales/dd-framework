/**
 * Poll with interval module.
 *
 * @module dd/core/time/poll-with-interval
 */

/**
 * Poll until conditional satisfaction with specified interval & optional
 * timeout. Will call `onProceed` when condition is satisfied, `onTimeout` if
 * provided timeout is reached.
 *
 * @param {() => boolean} conditional Condition callback.
 * @param {() => void} onProceed Proceed callback.
 * @param {(elapsed: number) => void} onTimeout Timeout callback.
 * @param {number} interval Interval in milliseconds.
 * @param {number|undefined} timeout Timeout in milliseconds.
 * @returns {void}
 */
module.exports = function (conditional, onProceed, onTimeout, interval, timeout) {
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
