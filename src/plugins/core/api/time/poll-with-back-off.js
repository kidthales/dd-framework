/**
 * Poll with back off module.
 *
 * @module dd/core/time/poll-with-back-off
 */

/**
 * Poll for conditional satisfaction with exponential back-off.
 *
 * @param {() => boolean} conditional Condition callback.
 * @param {() => void} onProceed Proceed callback.
 * @param {(elapsed: number) => void} onTimeout Timeout callback.
 * @param {number} initialInterval Initial interval in milliseconds.
 * @param {number} retries Number of attempts (default is 3).
 * @returns {void}
 */
module.exports = function (conditional, onProceed, onTimeout, initialInterval, retries) {
  var startTime = +new Date(),
    elapsedTime = 0,
    numRetries = 0,
    maxRetries = typeof retries !== 'number' || retries <= 0 ? 3 : retries,
    // eslint-disable-next-line no-redeclare
    initialInterval = initialInterval <= 0 ? 1000 : initialInterval;

  function poll() {
    elapsedTime += +new Date() - startTime;

    if (conditional()) {
      onProceed();
      return;
    } else if (numRetries >= maxRetries) {
      onTimeout(elapsedTime);
      return;
    }

    setTimeout(poll, initialInterval * Math.pow(2, numRetries++));
  }

  setTimeout(poll, 0);
};
