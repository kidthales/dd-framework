/**
 * Create module.
 *
 * @module dd/core/event/emitter/create
 */

/**
 *
 */
module.exports = function () {
  /**
   * @type {Record<string, import("./types").EventListener[]}
   * @private
   */
  var _registry = {},
    /**
     * @private
     */
    _eventsCount = 0,
    /**
     * @param {string} event
     * @param {Function} fn
     * @param {unknown} ctx
     * @param {boolean|undefined} once
     * @return {void}
     */
    _addListener = function (
      /** @type {string} */
      event,
      /** @type {Function} */
      fn,
      /** @type {unknown} */
      ctx,
      /** @type {boolean|undefined} */
      once
    ) {
      if (!_registry[event]) {
        _registry[event] = [];
        ++_eventsCount;
      }

      _registry[event].push({ fn: fn, ctx: ctx || emitter, once: once });
    },
    /**
     * @param {string} event
     * @returns {void}
     */
    _clearEvent = function (
      /** @type {string} */
      event
    ) {
      if (_registry[event]) {
        --_eventsCount;
        delete _registry[event];
      }
    },
    /**
     *
     */
    emitter = {
      /**
       * @returns {string[]}
       */
      eventNames: function () {
        /** @type {string|undefined} */
        var name,
          /** @type {string[]} */
          names = [];

        for (name in _registry) {
          if (Object.prototype.hasOwnProperty.call(_registry, name)) {
            names.push(name);
          }
        }

        return names;
      },

      /**
       * @returns {number}
       */
      eventsCount: function () {
        return _eventsCount;
      },

      /**
       * @param {string} event
       * @returns {Function[]}
       */
      listeners: function (event) {
        return _registry[event]
          ? _registry[event].map(function (listener) {
              return listener.fn;
            })
          : [];
      },

      /**
       * @param {string} event
       * @returns {number}
       */
      listenerCount: function (event) {
        return _registry[event] ? _registry[event].length : 0;
      },

      /**
       * @param {string} event
       * @param {...any[]} args
       * @return {void}
       */
      emit: function (event) {
        /** @type {number|undefined} */
        var i,
          /** @type {any[]|undefined} */
          args,
          /** @type {import("./types").EventListener[]|undefined} */
          listeners;

        if (!_registry[event]) {
          return;
        }

        args = Array.prototype.slice.call(arguments, 1);
        listeners = [];

        for (i = 0; i < _registry[event].length; ++i) {
          _registry[event][i].fn.apply(_registry[event][i].ctx, args);

          if (!_registry[event][i].once) {
            listeners.push(_registry[event][i]);
          }
        }

        if (listeners.length) {
          _registry[event] = listeners;
        } else {
          _clearEvent(event);
        }
      },

      /**
       * @param {string} event
       * @param {Function} fn
       * @param {unknown} ctx
       * @returns {void}
       */
      on: function (event, fn, ctx) {
        _addListener(event, fn, ctx, false);
      },

      /**
       * @param {string} event
       * @param {Function} fn
       * @param {unknown} ctx
       * @returns {void}
       */
      addListener: function (event, fn, ctx) {
        emitter.on(event, fn, ctx);
      },

      /**
       * @param {string} event
       * @param {Function} fn
       * @param {unknown} ctx
       * @returns {void}
       */
      once: function (event, fn, ctx) {
        _addListener(event, fn, ctx, true);
      },

      /**
       * @param {string} event
       * @param {Function|undefined} fn
       * @param {unknown} ctx
       * @param {boolean|undefined} once
       * @returns {void}
       */
      off: function (event, fn, ctx, once) {
        /** @type {import("./types").EventListener[]|undefined} */
        var events,
          /** @type {import("./types").EventListener[]|undefined} */
          listeners,
          /** @type {number|undefined} */
          i;

        if (!_registry[event]) {
          return;
        }

        if (!fn) {
          _clearEvent(event);
          return;
        }

        listeners = _registry[event];
        events = [];

        for (i = 0; i < listeners.length; ++i) {
          if (listeners[i].fn !== fn || (once && !listeners[i].once) || (ctx && listeners[i].ctx !== ctx)) {
            events.push(listeners[i]);
          }
        }

        if (events.length) {
          _registry[event] = events;
        } else {
          _clearEvent(event);
        }
      },

      /**
       * @param {string} event
       * @param {Function|undefined} fn
       * @param {unknown} ctx
       * @param {boolean|undefined} once
       * @returns {void}
       */
      removeListener: function (event, fn, ctx, once) {
        emitter.off(event, fn, ctx, once);
      },

      /**
       * @param {string|undefined} event
       * @returns {void}
       */
      removeAllListeners: function (event) {
        if (event) {
          if (_registry[event]) {
            _clearEvent(event);
          }
        } else {
          _registry = {};
          _eventsCount = 0;
        }
      }
    };

  return emitter;
};
