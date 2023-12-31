/**
 * Core plugin API user interface text printer create constructor module.
 *
 * @module    dd.core.ui.text.printer.createConstructor
 * @author    kidthales <kidthales@agogpixel.com>
 * @copyright 2023 kidthales
 * @license   {@link https://github.com/kidthales/dd-framework/blob/main/LICENSE.txt | MIT License}
 */

/**
 * @private
 */
var _logApi = require('../../../log'),
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
  },
  /**
   * @type {Record<string, import('@pgmmv/cc/size').CCSize|undefined>}
   * @static
   * @private
   */
  _pageSizeCache = {};

/**
 * @returns {import("./types").PrinterConstructor}
 */
module.exports = function () {
  /** @type {import("./types").PrinterConstructor} */
  var Printer = cc.Layer.extend({
    eventEmitter: undefined,

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

      self.eventEmitter = require('../../../event/emitter/create')();

      self.ignoreAnchorPointForPosition(false);
      self.setContentSize(0, 0);

      self._state = _stateConstants.home;
    },

    setJob: function (
      /** @type {import("./types").JobConfig} */
      job
    ) {
      /** @type {import('./types').Printer} */
      var self = this,
        /** @type {number[]} */
        textIds = [],
        /** @type {number[]} */
        fontIds = [],
        /** @type {string} */
        key,
        /** @type {import('@pgmmv/cc/size').CCSize} */
        pageSize;

      self.setContentSize(0, 0);
      self._cancel();

      self._job = {
        pages: job.pages.filter(function (config) {
          if (!config.text.font) {
            return false;
          }

          textIds.push(config.text.textId);
          fontIds.push(config.text.font.fontId);

          return true;
        }),
        layout: (function (
          /** @type {Partial<import('./types').LayoutConfig>} */
          layout
        ) {
          return {
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

      key = textIds.sort().join(',') + '#' + fontIds.sort().join(',');

      // Auto-size page.
      if (_pageSizeCache[key]) {
        pageSize = cc.size(_pageSizeCache[key].width, _pageSizeCache[key].height);
      } else {
        _pageSizeCache[key] = self._job.pages
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
              /** @type {import('@dd/core/ui/text/types').TextSprites} */
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
        pageSize = cc.size(_pageSizeCache[key].width, _pageSizeCache[key].height);
      }

      pageSize.width += self._job.layout.margin.left + self._job.layout.margin.right;
      pageSize.height += self._job.layout.margin.top + self._job.layout.margin.bottom;

      self.setContentSize(pageSize);
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
        /** @type {import('@pgmmv/cc/layer').CCLayer} */
        lineLayer,
        /** @type {number} */
        i;

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

      pageSize = self.getContentSize();

      for (i = 0; i < self._currentPage.text.length; ++i) {
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
            lineLayer.x = pageSize.width - self._currentPage.layout.margin.right - self._currentPage.text[i].width;
            break;
          case _printerConstantsApi.horizontalTextAlignment.center:
            lineLayer.x = (pageSize.width - self._currentPage.text[i].width) / 2;
            break;
          case _printerConstantsApi.horizontalTextAlignment.left:
          default:
            lineLayer.x = self._currentPage.layout.margin.left;
            break;
        }

        lineLayer.y = pageSize.height - self._currentPage.layout.margin.top + self._currentPage.text[i].y; // Text y is a negative offset.

        lineLayer.setTag(i);
        self.addChild(lineLayer);
      }

      self._transitionState(_stateConstants.printing);
    },

    clear: function () {
      /** @type {import('./types').Printer} */
      var self = this;
      self._transitionState(_stateConstants.clearing);
    },

    getMargin: function () {
      /** @type {import('./types').Printer} */
      var self = this;
      return {
        left: self._job ? self._job.layout.margin.left : 0,
        right: self._job ? self._job.layout.margin.right : 0,
        top: self._job ? self._job.layout.margin.top : 0,
        bottom: self._job ? self._job.layout.margin.bottom : 0
      };
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
        /** @type {import('@dd/core/ui/text/types').TextSpritesLine} */
        letters,
        /** @type {import('@dd/core/ui/text/types').TextSprite[]} */
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

      if (self._letterAccumulator < 0) {
        self._letterAccumulator = 0;
      }

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

        switch (self._currentPage.layout.align.vertical) {
          case _printerConstantsApi.verticalTextAlignment.bottom:
            letters[self._letterIndex].sprite.y = 0;
            break;
          case _printerConstantsApi.verticalTextAlignment.center:
            letters[self._letterIndex].sprite.y = (lineLayer.height - letters[self._letterIndex].sprite.height) / 2;
            break;
          case _printerConstantsApi.verticalTextAlignment.top:
          default:
            letters[self._letterIndex].sprite.y = lineLayer.height - letters[self._letterIndex].sprite.height;
            break;
        }

        letters[self._letterIndex].sprite.setTag(self._letterIndex);
        lineLayer.addChild(letters[self._letterIndex].sprite);

        printed.push(letters[self._letterIndex].sprite);
        ++self._letterIndex;
      }

      if (printed.length) {
        self.eventEmitter.emit(_printerConstantsApi.eventName.printing, printed);
      }
    },

    _updateEnd: function () {},

    _updateClearing: function (
      /** @type {number} */
      dt
    ) {
      /** @type {import('./types').Printer} */
      var self = this,
        /** @type {boolean} */
        allLinesEmpty,
        /** @type {number} */
        clearDelta,
        /** @type {number} */
        i,
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

      if (self._clearAccumulator < 0) {
        self._clearAccumulator = 0;
      }

      for (k = 0; k < clearDelta; ++k) {
        allLinesEmpty = true;

        for (i = 0; i < self.childrenCount; ++i) {
          lineLayer = self.getChildByTag(i);

          if (lineLayer && lineLayer.childrenCount) {
            allLinesEmpty = false;

            letter = lineLayer.getChildByTag(self._clearIndex - i);

            if (letter) {
              letter.removeFromParent();
              letter.release();
            }
          }
        }

        if (allLinesEmpty) {
          break;
        }

        ++self._clearIndex;
      }

      if (allLinesEmpty) {
        self.removeAllChildren();
      } else {
        self.eventEmitter.emit(_printerConstantsApi.eventName.clearing);
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
              self.eventEmitter.emit(_printerConstantsApi.eventName.printStart);

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
              self.eventEmitter.emit(_printerConstantsApi.eventName.printFinish);

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
              self.eventEmitter.emit(_printerConstantsApi.eventName.clearStart);

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
              self.eventEmitter.emit(_printerConstantsApi.eventName.clearFinish);

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
          self.eventEmitter.emit(_printerConstantsApi.eventName.cancel);

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
