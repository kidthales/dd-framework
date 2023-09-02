/**
 * @module dd/core/text/printer/create-constructor
 */

/**
 * @private
 */
var _logApi = require('../../log'),
  /**
   * @private
   */
  _createTextSprites = require('../create-text-sprites'),
  /**
   * @private
   */
  _printerConstantsApi = require('./constants'),
  /**
   * @constant
   * @private
   */
  _stateConstants = {
    /**
     * @type {import("./types").PrinterState.Home}
     * @constant
     */
    home: 0,
    /**
     * @type {import("./types").PrinterState.Printing}
     * @constant
     */
    printing: 1,
    /**
     * @type {import("./types").PrinterState.End}
     * @constant
     */
    end: 2,
    /**
     * @type {import("./types").PrinterState.Clearing}
     * @constant
     */
    clearing: 3
  };

/**
 *
 * @returns {import("./types").PrinterConstructor}
 */
module.exports = function () {
  /** @type {import("./types").PrinterConstructor} */
  var Printer = cc.Layer.extend({
    eventManager: undefined,

    _state: undefined,
    _job: undefined,
    _currentPage: undefined,
    _lineIndex: 0,
    _letterIndex: 0,
    _letterAccumulator: 0,
    _clearIndex: 0,
    _clearAccumulator: 0,

    ctor: function () {
      /** @type {import('./types').Printer} */
      var self = this;

      self._super();

      self.eventManager = new cc.EventManager();

      self._state = _stateConstants.home;
    },

    setJob: function (
      /** @type {import("./types").JobConfig} */
      job
    ) {
      /** @type {import('./types').Printer} */
      var self = this;

      self._cancel();

      self._job = {
        pages: job.pages,
        layout: (function (
          /** @type {Partial<import('./types').LayoutConfig>} */
          layout
        ) {
          return {
            size: layout.size ? cc.size(layout.size) : undefined,
            margin: layout.margin
              ? {
                  top: layout.margin.top || 0,
                  bottom: layout.margin.bottom || 0,
                  left: layout.margin.left || 0,
                  right: layout.margin.right || 0
                }
              : { top: 0, bottom: 0, left: 0, right: 0 },
            align: layout.align
              ? {
                  horizontal: layout.align.horizontal || _printerConstantsApi.horizontalTextAlignment.left,
                  vertical: layout.align.vertical || _printerConstantsApi.verticalTextAlignment.top
                }
              : {
                  horizontal: _printerConstantsApi.horizontalTextAlignment.left,
                  vertical: _printerConstantsApi.verticalTextAlignment.top
                }
          };
        })(job.layout || {}),
        printSpeed: job.printSpeed !== undefined && job.printSpeed >= 0 ? job.printSpeed : Number.MAX_SAFE_INTEGER,
        clearSpeed: job.clearSpeed !== undefined && job.clearSpeed >= 0 ? job.clearSpeed : Number.MAX_SAFE_INTEGER,
        color: job.color || undefined,
        opacity: job.opacity !== undefined ? job.opacity : undefined
      };

      if (!self._job.layout.size) {
        // Auto-size page if not set; expensive.
        self._job.layout.size = job.pages
          .map(
            function (
              /** @type {import('./types').PageConfig} */
              config
            ) {
              return _createTextSprites(config.text);
            }
          )
          .reduce(
            function (
              /** @type {import('@pgmmv/cc/size').CCSize} */
              size,
              /** @type {import('@dd/core/api/text/types').TextSprites} */
              textSprites
            ) {
              if (textSprites.width > size.width) {
                size.width = textSprites.width;
              }

              if (textSprites.height > size.height) {
                size.height = textSprites.height;
              }

              return size;
            },
            cc.size(0, 0)
          );

        self._job.layout.size.width += self._job.layout.margin.left + self._job.layout.margin.right;
        self._job.layout.size.height += self._job.layout.margin.top + self._job.layout.margin.bottom;

        _logApi.warn(
          'Printer::setJob(): No page size set; computed size (with margin): ' +
            self._job.layout.size.width +
            'x' +
            self._job.layout.size.height +
            '.\nSet this explicitly to improve performance.'
        );
      }

      self.setContentSize(self._job.layout.size);
    },

    print: function (
      /** @type {number} */
      pageIndex
    ) {
      /** @type {import('./types').Printer} */
      var self = this,
        /** @type {import('./types').PageConfig|undefined} */
        pageConfig,
        /** @type {import('@pgmmv/cc/size').CCSize} */
        pageSize,
        /** @type {import('@pgmmv/cc/point').CCPoint} */
        pageAnchor,
        /** @type {number} */
        pageLeft,
        /** @type {number} */
        pageRight,
        /** @type {number} */
        pageTop,
        /** @type {import('@pgmmv/cc/layer').CCLayer} */
        lineLayer;

      if (!self._job) {
        return;
      }

      self._cancel();

      pageIndex = cc.clampf(pageIndex, 0, self.getNumPages() - 1);
      pageConfig = self._job.pages[pageIndex];

      // Compute page.
      self._currentPage = {
        index: pageIndex,
        text: _createTextSprites(pageConfig.text, true),
        layout: {
          size: cc.size(self._job.layout.size),
          margin: {
            top: self._job.layout.margin.top,
            bottom: self._job.layout.margin.bottom,
            left: self._job.layout.margin.left,
            right: self._job.layout.margin.right
          },
          align: {
            horizontal:
              pageConfig.align && pageConfig.align.horizontal !== undefined
                ? pageConfig.align.horizontal
                : self._job.layout.align.horizontal,
            vertical:
              pageConfig.align && pageConfig.align.vertical !== undefined
                ? pageConfig.align.vertical
                : self._job.layout.align.vertical
          }
        },
        printSpeed:
          pageConfig.printSpeed !== undefined && pageConfig.printSpeed >= 0
            ? pageConfig.printSpeed
            : self._job.printSpeed,
        clearSpeed:
          pageConfig.clearSpeed !== undefined && pageConfig.clearSpeed >= 0
            ? pageConfig.clearSpeed
            : self._job.clearSpeed,
        color: pageConfig.color || self._job.color || undefined,
        opacity:
          pageConfig.opacity !== undefined
            ? pageConfig.opacity
            : self._job.opacity !== undefined
            ? self._job.opacity
            : undefined
      };

      // Computed line y assumes page origin of (0,1) & line origin of (0,0).
      pageSize = self.getContentSize();
      pageAnchor = self.getAnchorPoint();
      pageLeft = -pageAnchor.x * pageSize.width;
      pageRight = (1 - pageAnchor.x) * pageSize.width;
      pageTop = (1 - pageAnchor.y) * pageSize.height;

      for (var i = 0; i < self._currentPage.text.length; ++i) {
        lineLayer = new cc.Layer();

        if (self._currentPage.color) {
          lineLayer.setCascadeColorEnabled(true);
          lineLayer.setColor(self._currentPage.color);
        }

        if (self._currentPage.opacity !== undefined) {
          lineLayer.setCascadeOpacityEnabled(true);
          lineLayer.setOpacity(self._currentPage.opacity);
        }

        lineLayer.setAnchorPoint(0, 0);
        lineLayer.setContentSize(self._currentPage.text[i].width, self._currentPage.text[i].height);

        switch (self._currentPage.layout.align.horizontal) {
          case _printerConstantsApi.horizontalTextAlignment.right:
            lineLayer.x = pageRight - self._currentPage.layout.margin.right - self._currentPage.text[i].width;
            break;
          case _printerConstantsApi.horizontalTextAlignment.center:
            lineLayer.x = pageLeft + (pageSize.width - self._currentPage.text[i].width) / 2;
            break;
          case _printerConstantsApi.horizontalTextAlignment.left:
          default:
            lineLayer.x = pageLeft + self._currentPage.layout.margin.left;
            break;
        }

        lineLayer.y = pageTop - self._currentPage.layout.margin.top + self._currentPage.text[i].y;

        self.addChild(lineLayer, undefined, i);
      }

      self._transitionState(_stateConstants.printing);
    },

    clear: function () {
      /** @type {import('./types').Printer} */
      var self = this;
      self._transitionState(_stateConstants.clearing);
    },

    getNumPages: function () {
      /** @type {import('./types').Printer} */
      var self = this;
      return self._job ? self._job.pages.length : 0;
    },

    getCurrentPageIndex: function () {
      /** @type {import('./types').Printer} */
      var self = this;
      return self._currentPage ? self._currentPage.index : -1;
    },

    isHome: function () {
      /** @type {import('./types').Printer} */
      var self = this;
      return self._state === _stateConstants.home;
    },

    isPrinting: function () {
      /** @type {import('./types').Printer} */
      var self = this;
      return self._state === _stateConstants.printing;
    },

    isEnd: function () {
      /** @type {import('./types').Printer} */
      var self = this;
      return self._state === _stateConstants.end;
    },

    isClearing: function () {
      /** @type {import('./types').Printer} */
      var self = this;
      return self._state === _stateConstants.clearing;
    },

    update: function (
      /** @type {number} */
      dt
    ) {
      /** @type {import('./types').Printer} */
      var self = this;

      switch (self._state) {
        case _stateConstants.home:
          self._updateHome(dt);

          break;

        case _stateConstants.printing:
          self._updatePrinting(dt);

          break;

        case _stateConstants.end:
          self._updateEnd(dt);

          break;

        case _stateConstants.clearing:
          self._updateClearing(dt);

          break;

        default:
          if (self._state !== -40037) {
            // Don't spam the runtime log.
            _logApi.error('Printer::update(): Invalid state: ' + self._state);
            self._state = -40037;
          }

          break;
      }
    },

    _updateHome: function () {},

    _updatePrinting: function (
      /** @type {number} */
      dt
    ) {
      /** @type {import('./types').Printer} */
      var self = this,
        /** @type {number} */
        letterDelta,
        /** @type {number} */
        clampedLetterDelta,
        /** @type {number} */
        ix,
        /** @type {import('@pgmmv/cc/layer').CCLayer} */
        lineLayer,
        /** @type {import('@dd/core/api/text/types').TextSpritesLine} */
        letters,
        /** @type {import('@dd/core/api/text/types').TextSprite[]} */
        printed = [];

      if (self._lineIndex >= self._currentPage.text.length) {
        self._transitionState(_stateConstants.end);
        return;
      }

      self._letterAccumulator += dt * self._currentPage.printSpeed;

      if (self._letterAccumulator < 1) {
        return;
      }

      letterDelta = Math.floor(self._letterAccumulator);
      self._letterAccumulator -= letterDelta;

      clampedLetterDelta = cc.clampf(letterDelta, 0, self._currentPage.text.numLetters);

      for (ix = 0; ix < clampedLetterDelta; ++ix) {
        if (self._letterIndex >= self._currentPage.text[self._lineIndex].length) {
          ++self._lineIndex;
          self._letterIndex = 0;
        }

        if (self._lineIndex >= self._currentPage.text.length) {
          break;
        }

        lineLayer = self.getChildByTag(self._lineIndex);
        letters = self._currentPage.text[self._lineIndex];

        lineLayer.addChild(letters[self._letterIndex].sprite, undefined, self._letterIndex);
        printed.push(letters[self._letterIndex].sprite);

        ++self._letterIndex;
      }

      if (printed.length) {
        self.eventManager.dispatchCustomEvent(_printerConstantsApi.eventName.printing, printed);
      }
    },

    _updateEnd: function () {},

    _updateClearing: function (
      /** @type {number} */
      dt
    ) {
      /** @type {import('./types').Printer} */
      var self = this,
        allLinesEmpty = true,
        /** @type {number} */
        clearDelta,
        /** @type {number} */
        i,
        /** @type {number} */
        j,
        /** @type {number} */
        k,
        /** @type {import('@pgmmv/cc/layer').CCLayer} */
        lineLayer,
        /** @type {import('@pgmmv/cc/sprite').CCSprite|import('@pgmmv/cc/label-ttf').CCLabelTTF} */
        letter;

      if (!self.childrenCount) {
        self._transitionState(_stateConstants.home);
        return;
      }

      self._clearAccumulator += dt * self._currentPage.clearSpeed;

      if (self._clearAccumulator < 1) {
        return;
      }

      clearDelta = Math.floor(self._clearAccumulator);
      self._clearAccumulator -= clearDelta;

      for (k = 0; k < clearDelta; ++k) {
        for (i = 0; i < self.childrenCount; ++i) {
          lineLayer = self.getChildByTag(i);

          if (lineLayer && lineLayer.childrenCount) {
            allLinesEmpty = false;

            for (j = 0; j < lineLayer.childrenCount; ++j) {
              letter = lineLayer.getChildByTag(self._clearIndex - i);

              if (letter) {
                letter.removeFromParent();
                letter.release();
              }
            }
          }
        }

        ++self._clearIndex;
      }

      if (allLinesEmpty) {
        self.removeAllChildren();
      } else {
        self.eventManager.dispatchCustomEvent(_printerConstantsApi.eventName.clearing);
      }
    },

    _transitionState: function (
      /** @type {import("./types").PrinterState} */
      state
    ) {
      /** @type {import('./types').Printer} */
      var self = this;

      switch (self._state) {
        case _stateConstants.home:
          switch (state) {
            case _stateConstants.printing:
              self._state = state;
              self.eventManager.dispatchCustomEvent(_printerConstantsApi.eventName.printStart);

              break;

            default:
              self._logTransitionWarning(_stateConstants.home, state);

              break;
          }

          break;

        case _stateConstants.printing:
          switch (state) {
            case _stateConstants.end:
              self._state = state;
              self.eventManager.dispatchCustomEvent(_printerConstantsApi.eventName.printFinish);

              break;

            default:
              self._logTransitionWarning(_stateConstants.printing, state);

              break;
          }

          break;

        case _stateConstants.end:
          switch (state) {
            case _stateConstants.clearing:
              self._state = state;
              self.eventManager.dispatchCustomEvent(_printerConstantsApi.eventName.clearStart);

              break;

            default:
              self._logTransitionWarning(_stateConstants.end, state);

              break;
          }

          break;

        case _stateConstants.clearing:
          switch (state) {
            case _stateConstants.home:
              self._state = state;
              self.eventManager.dispatchCustomEvent(_printerConstantsApi.eventName.clearFinish);

              break;

            default:
              self._logTransitionWarning(_stateConstants.clearing, state);

              break;
          }

          break;

        default:
          _logApi.warn("Printer::_transitionState(): Invalid printer state: '" + self._state + "'.");

          break;
      }
    },

    _logTransitionWarning: function (
      /** @type {import("./types").PrinterState} */
      from,
      /** @type {import("./types").PrinterState} */
      to
    ) {
      _logApi.warn("Printer::_transitionState(): Invalid printer state transition: '" + from + '->' + to + "'.");
    },

    _cancel: function () {
      /** @type {import('./types').Printer} */
      var self = this,
        lines = self.getChildren(),
        /** @type {import('@pgmmv/cc/node').CCNode[]|undefined} */
        letters,
        /** @type {number} */
        i,
        /** @type {number} */
        j,
        /** @type {import("./types").PrinterState} */
        _canceledState;

      for (i = 0; i < lines.length; ++i) {
        letters = lines[i].getChildren();

        for (j = 0; j < letters.length; ++j) {
          letters[j].removeFromParent();
          letters[j].release();
        }

        lines[i].removeFromParent();
      }

      // Go home immediately.
      _canceledState = self._state;
      self._state = _stateConstants.home;
      self._lineIndex = 0;
      self._letterIndex = 0;
      self._letterAccumulator = 0;
      self._clearIndex = 0;

      switch (_canceledState) {
        case _stateConstants.printing:
        case _stateConstants.clearing:
          self.eventManager.dispatchCustomEvent(_printerConstantsApi.eventName.cancel);

        // eslint-disable-next-line no-fallthrough
        case _stateConstants.end:
          delete self._currentPage;

        // eslint-disable-next-line no-fallthrough
        case _stateConstants.home:
          break;

        default:
          _logApi.warn("Printer::_cancel(): Invalid printer state canceled: '" + _canceledState + "'.");

          break;
      }
    }
  });

  return Printer;
};
