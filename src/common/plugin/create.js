/**
 * Create module.
 *
 * @module dd/common/plugin/create
 */

/**
 * @param {string} identifier Must be unique within the framework namespace.
 * @param {import('./types').Config} config
 * @param {import('./types').Internal|undefined} internal
 * @returns {import("@pgmmv/agtk/plugins/plugin").AgtkPlugin<import("type-fest").JsonObject>}
 */
module.exports = function (identifier, config, internal) {
  /**
   * @private
   */
  var _localeApi = require('../locale'),
    /**
     * @private
     */
    _depsApi = require('./deps'),
    /**
     * @private
     */
    _eventsApi = require('./events'),
    /**
     * @private
     */
    _dataApi = require('./data'),
    /**
     * @private
     */
    _pluginConstants = require('./constants'),
    /**
     * @private
     */
    _paramConstants = require('./params/constants'),
    /**
     * @private
     */
    _pluginCategoryConstants = _pluginConstants.categories,
    /**
     * @private
     */
    _pluginLocaleConstants = _pluginConstants.locale,
    /**
     * @private
     */
    _ns = _pluginConstants.frameworkNamespace,
    /**
     * @type {import("@pgmmv/agtk/plugins/plugin/parameter").AgtkParameter[]|undefined}
     * @private
     */
    _parameters,
    /**
     * @type {import("@pgmmv/agtk/plugins/plugin").AgtkActionCommand[]|undefined}
     * @private
     */
    _actionCommands,
    /**
     * @type {import("@pgmmv/agtk/plugins/plugin").AgtkLinkCondition[]|undefined}
     * @private
     */
    _linkConditions,
    /**
     * @returns {boolean}
     * @private
     */
    _inEditor = function () {
      return !Agtk || typeof Agtk.log !== 'function';
    },
    /**
     * @param {import('type-fest').JsonObject|undefined} data
     * @returns {void}
     * @private
     */
    _initialize = function (
      /** @type {import('type-fest').JsonObject|undefined} */
      data
    ) {
      if (config.api) {
        if (!window[_ns]) {
          window[_ns] = {};
        }

        window[_ns][identifier] = config.api;
      }

      if (internal.onInitialize) {
        internal.onInitialize(data);
      }

      _eventsApi.dispatchPluginInitializedEvent(identifier);
    },
    /**
     * @param {import("@pgmmv/agtk/plugins/plugin").AgtkParameterValue[]} paramValue
     * @param {import("@pgmmv/agtk/plugins/plugin/parameter").AgtkParameter[]} defaults
     * @returns {Record<number, import('type-fest').JsonValue>}
     * @private
     */
    _normalizeParamValue = function (
      /** @type {import("@pgmmv/agtk/plugins/plugin").AgtkParameterValue[]} */
      paramValue,
      /** @type {import("@pgmmv/agtk/plugins/plugin/parameter").AgtkParameter[]} */
      defaults
    ) {
      /** @type {Record<number, import('type-fest').JsonValue>} */
      var normalized = {},
        len = defaults.length,
        /** @type {number} */
        i,
        /** @type {import("@pgmmv/agtk/plugins/plugin/parameter").AgtkParameter} */
        p;

      for (i = 0; i < len; ++i) {
        p = defaults[i];
        normalized[p.id] = p.type === _paramConstants.json ? JSON.stringify(p.defaultValue) : p.defaultValue;
      }

      len = paramValue.length;

      for (i = 0; i < len; ++i) {
        p = paramValue[i];
        normalized[p.id] = p.value;
      }

      return normalized;
    },
    /**
     * @param {import('@pgmmv/agtk/plugins/plugin/parameter').AgtkParameter[]} param
     * @returns {import('@pgmmv/agtk/plugins/plugin/parameter').AgtkParameter[]}
     * @private
     */
    _localizeParam = function (
      /** @type {import('@pgmmv/agtk/plugins/plugin/parameter').AgtkParameter[]} */
      param
    ) {
      var paramLen = param.length,
        /** @type {number} */
        i,
        /** @type {import("@pgmmv/agtk/plugins/plugin/parameter").AgtkCustomIdParameterParameter[]} */
        customParam,
        /** @type {number} */
        customParamLen,
        /** @type {number} */
        j;

      for (i = 0; i < paramLen; ++i) {
        param[i].name = _localeApi.resolveKey(param[i].name);

        switch (param[i].type) {
          case _paramConstants.string:
          case _paramConstants.stringMultiLine:
            param[i].defaultValue = _localeApi.resolveKey(param[i].defaultValue);
            break;

          case _paramConstants.customId:
            customParam = param[i].customParam;
            customParamLen = customParam.length;

            for (j = 0; j < customParamLen; ++j) {
              customParam[j].name = _localeApi.resolveKey(customParam[j].name);
            }

            break;

          default:
            break;
        }
      }

      return param;
    },
    /**
     * @param {import("./types").ActionCommandConfig | import("./types").LinkConditionConfig} commandOrCondition
     * @returns {import('@pgmmv/agtk/plugins/plugin/parameter').AgtkParameter[]}
     * @private
     */
    _localizeCommandOrConditionConfigParam = function (
      /** @type {import("./types").ActionCommandConfig | import("./types").LinkConditionConfig} */
      commandOrConditionConfig
    ) {
      if (commandOrConditionConfig.parameters && commandOrConditionConfig.parameters.entries.length) {
        return _localizeParam(commandOrConditionConfig.parameters.entries);
      }

      return [];
    },
    /**
     * @param {import("./types").ActionCommandConfig} actionCommandConfig
     * @param {number} index
     * @returns {import("@pgmmv/agtk/plugins/plugin").AgtkActionCommand}
     * @private
     */
    _createActionCommand = function (
      /** @type {import("./types").ActionCommandConfig} */
      actionCommandConfig,
      /** @type {number} */
      index
    ) {
      return {
        id: index + 1,
        name: _localeApi.resolveKey(actionCommandConfig.name),
        description: _localeApi.resolveKey(actionCommandConfig.description),
        parameter: _localizeCommandOrConditionConfigParam(actionCommandConfig)
      };
    },
    /**
     * @param {import("./types").LinkConditionConfig} linkConditionConfig
     * @param {number} index
     * @returns {import("@pgmmv/agtk/plugins/plugin").AgtkLinkCondition}
     * @private
     */
    _createLinkCondition = function (
      /** @type {import("./types").LinkConditionConfig} */
      linkConditionConfig,
      /** @type {number} */
      index
    ) {
      return {
        id: index + 1,
        name: _localeApi.resolveKey(linkConditionConfig.name),
        description: _localeApi.resolveKey(linkConditionConfig.description),
        parameter: _localizeCommandOrConditionConfigParam(linkConditionConfig)
      };
    },
    /**
     * @type {import("@pgmmv/agtk/plugins/plugin").AgtkPlugin<import("type-fest").JsonObject>}
     */
    plugin = {
      setLocale: function (locale) {
        _localeApi.setCode(locale);
      },

      getInfo: function (category) {
        switch (category) {
          case _pluginCategoryConstants.name:
            return _localeApi.resolveKey(_pluginLocaleConstants.name);

          case _pluginCategoryConstants.description:
            return _localeApi.resolveKey(_pluginLocaleConstants.description);

          case _pluginCategoryConstants.author:
            return _localeApi.resolveKey(_pluginLocaleConstants.author);

          case _pluginCategoryConstants.help:
            return _localeApi.resolveKey(_pluginLocaleConstants.help);

          case _pluginCategoryConstants.parameter:
            if (_parameters) {
              return _parameters;
            }

            if (!config.parameters || !config.parameters.entries.length) {
              return (_parameters = []);
            }

            return (_parameters = _localizeParam(config.parameters.entries));

          case _pluginCategoryConstants.internal:
            return _dataApi.getData() || {};

          case _pluginCategoryConstants.actionCommand:
            if (_actionCommands) {
              return _actionCommands;
            }

            if (!config.actionCommands) {
              return (_actionCommands = []);
            }

            return (_actionCommands = config.actionCommands.map(_createActionCommand));

          case _pluginCategoryConstants.linkCondition:
            if (_linkConditions) {
              return _linkConditions;
            }

            if (!config.linkConditions) {
              return (_linkConditions = []);
            }

            return (_linkConditions = config.linkConditions.map(_createLinkCondition));

          case _pluginCategoryConstants.autoTile:
            // Good luck.
            break;

          default:
            break;
        }
      },

      initialize: function (data) {
        /** @type {import("@pgmmv/cc/event-listener").CCEventListener|undefined} */
        var listener;

        if (_inEditor()) {
          return;
        }

        if (!Array.isArray(config.dependencies) || !config.dependencies.length) {
          _initialize(data);
          return;
        }

        _depsApi.setDependencies(config.dependencies);

        if (!_depsApi.isMissingDependencies()) {
          _initialize(data);
          return;
        }

        listener = _eventsApi.addPluginInitializedEventListener(
          function (
            /** @type {import("@pgmmv/cc/event-custom").CCEventCustom} */
            ev
          ) {
            var id = ev.getUserData();

            _depsApi.onDependencyInitialized(id);

            if (!_depsApi.isMissingDependencies()) {
              cc.eventManager.removeListener(listener);
              _initialize(data);
            }
          }
        );
      },

      finalize: function () {
        if (_inEditor()) {
          return;
        }

        if (window[_ns] && window[_ns][identifier]) {
          delete window[_ns][identifier];
        }

        if (internal.onFinalize) {
          internal.onFinalize();
        }
      },

      setParamValue: function (paramValue) {
        if (_inEditor() || !internal.onSetParamValue) {
          return;
        }

        internal.onSetParamValue(_normalizeParamValue(paramValue, plugin.getInfo(_pluginCategoryConstants.parameter)));
      },

      setInternal: function (data) {
        data = data || {};
        internal.data = data;
        _dataApi.setData(data);
      },

      call: function () {
        // Good luck.
      },

      execActionCommand: function (
        actionCommandIndex,
        parameter,
        objectId,
        instanceId,
        actionId,
        commandId,
        commonActionStatus,
        sceneId
      ) {
        var actionCommandConfig = config.actionCommands[actionCommandIndex],
          /** @type {import('@pgmmv/agtk/plugins/plugin').AgtkActionCommand} */
          actionCommand = plugin.getInfo(_pluginCategoryConstants.actionCommand)[actionCommandIndex];

        return actionCommandConfig.handler({
          index: actionCommandIndex,
          param: _normalizeParamValue(parameter, actionCommand.parameter),
          objectId: objectId,
          instanceId: instanceId,
          actionId: actionId,
          commandId: commandId,
          commonActionStatus: commonActionStatus,
          sceneId: sceneId
        });
      },

      execLinkCondition: function (
        linkConditionIndex,
        parameter,
        objectId,
        instanceId,
        actionLinkId,
        commonActionStatus
      ) {
        var linkConditionConfig = config.linkConditions[linkConditionIndex],
          /** @type {import('@pgmmv/agtk/plugins/plugin').AgtkLinkCondition} */
          linkCondition = plugin.getInfo(_pluginCategoryConstants.linkCondition)[linkConditionIndex];

        return linkConditionConfig.handler({
          index: linkConditionIndex,
          param: _normalizeParamValue(parameter, linkCondition.parameter),
          objectId: objectId,
          instanceId: instanceId,
          actionLinkId: actionLinkId,
          commonActionStatus: commonActionStatus
        });
      }
    };

  _localeApi.setData(config.locale || {});

  internal = typeof internal === 'object' && internal !== null && !Array.isArray(internal) ? internal : {};
  plugin.setInternal(internal.data);

  return plugin;
};
