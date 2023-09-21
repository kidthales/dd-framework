/**
 * @module dd/common/plugin/params
 */

/**
 * @private
 */
var _pc = require('./constants'),
  /**
   * Create the base parameter object.
   *
   * @param {number} id
   * @param {string} name
   * @param {import("@pgmmv/agtk/plugins/plugin/parameter").AgtkParameterType} type
   * @param {unknown} defaultValue
   * @returns {import("@pgmmv/agtk/plugins/plugin/parameter/base-parameter.interface").AgtkBaseParameter} New base parameter object.
   * @private
   */
  _base = function (
    /** @type {number} */
    id,
    /** @type {string} */
    name,
    /** @type {import("@pgmmv/agtk/plugins/plugin/parameter").AgtkParameterType} */
    type,
    /** @type {unknown} */
    defaultValue
  ) {
    return {
      id: id,
      name: name,
      type: type,
      defaultValue: defaultValue
    };
  };

module.exports = {
  /**
   * Alias for a line break.
   *
   * @constant
   * @public
   */
  br: _base(-1, '', _pc.embedded),

  /**
   * Alias for a horizontal rule.
   *
   * @constant
   * @public
   */
  // Length: 37
  hr: _base(-1, '―――――――――――――――――――――――――――――――――――――', _pc.embedded),

  /**
   * Create string parameter object.
   *
   * @param {number} id
   * @param {string} name
   * @param {string|undefined} defaultValue
   * @returns {import("@pgmmv/agtk/plugins/plugin/parameter").AgtkStringParameter} New string parameter object.
   * @constant
   * @public
   */
  string: function (
    /** @type {number} */
    id,
    /** @type {string} */
    name,
    /** @type {string|undefined} */
    defaultValue
  ) {
    return _base(id, name, _pc.string, typeof defaultValue === 'string' ? defaultValue : '');
  },

  /**
   * Create multi-line string parameter object.
   *
   * @param {number} id
   * @param {string} name
   * @param {string|undefined} defaultValue
   * @returns {import("@pgmmv/agtk/plugins/plugin/parameter").AgtkMultiLineStringParameter} New multi-line string parameter object.
   * @constant
   * @public
   */
  stringMultiLine: function (
    /** @type {number} */
    id,
    /** @type {string} */
    name,
    /** @type {string|undefined} */
    defaultValue
  ) {
    return _base(id, name, _pc.stringMultiLine, typeof defaultValue === 'string' ? defaultValue : '');
  },

  /**
   * Create number parameter object.
   *
   * @param {number} id
   * @param {string} name
   * @param {number|undefined} defaultValue
   * @returns {import("@pgmmv/agtk/plugins/plugin/parameter").AgtkNumberParameter} New number parameter object.
   * @constant
   * @public
   */
  number: function (
    /** @type {number} */
    id,
    /** @type {string} */
    name,
    /** @type {number|undefined} */
    defaultValue,
    /** @type {{ decimals?: number; minimumValue?: number; maximumValue?: number; } | undefined} */
    options
  ) {
    /** @type {import("@pgmmv/agtk/plugins/plugin/parameter").AgtkNumberParameter} */
    var p = _base(id, name, _pc.number, typeof defaultValue === 'number' ? defaultValue : 0);

    if (options) {
      p.decimals = options.decimals;
      p.minimumValue = options.minimumValue;
      p.maximumValue = options.maximumValue;
    }

    return p;
  },

  /**
   * Create JSON parameter object.
   *
   * @param {number} id
   * @param {string} name
   * @param {import("type-fest").JsonValue|undefined} defaultValue
   * @returns {import("@pgmmv/agtk/plugins/plugin/parameter").AgtkJsonParameter} New JSON parameter object.
   * @constant
   * @public
   */
  json: function (
    /** @type {number} */
    id,
    /** @type {string} */
    name,
    /** @type {import("type-fest").JsonValue|undefined} */
    defaultValue
  ) {
    return _base(id, name, _pc.json, defaultValue === undefined ? null : defaultValue);
  },
  /**
   * Create image ID parameter object.
   *
   * @param {number} id
   * @param {string} name
   * @returns {import("@pgmmv/agtk/plugins/plugin/parameter").AgtkImageIdParameter} New image ID parameter object.
   * @constant
   * @public
   */
  imageId: function (
    /** @type {number} */
    id,
    /** @type {string} */
    name
  ) {
    return _base(id, name, _pc.imageId, -1);
  },

  /**
   * Create text ID parameter object.
   *
   * @param {number} id
   * @param {string} name
   * @returns {import("@pgmmv/agtk/plugins/plugin/parameter").AgtkTextIdParameter} New text ID parameter object.
   * @constant
   * @public
   */
  textId: function (
    /** @type {number} */
    id,
    /** @type {string} */
    name
  ) {
    return _base(id, name, _pc.textId, -1);
  },

  /**
   * Create scene ID parameter object.
   *
   * @param {number} id
   * @param {string} name
   * @returns {import("@pgmmv/agtk/plugins/plugin/parameter").AgtkSceneIdParameter} New scene ID parameter object.
   * @constant
   * @public
   */
  sceneId: function (
    /** @type {number} */
    id,
    /** @type {string} */
    name
  ) {
    return _base(id, name, _pc.sceneId, -1);
  },

  /**
   * Create tileset ID parameter object.
   *
   * @param {number} id
   * @param {string} name
   * @returns {import("@pgmmv/agtk/plugins/plugin/parameter").AgtkTilesetIdParameter} New tileset ID parameter object.
   * @constant
   * @public
   */
  tilesetId: function (
    /** @type {number} */
    id,
    /** @type {string} */
    name
  ) {
    return _base(id, name, _pc.tilesetId, -1);
  },

  /**
   * Create animation ID parameter object.
   *
   * @param {number} id
   * @param {string} name
   * @returns {import("@pgmmv/agtk/plugins/plugin/parameter").AgtkAnimationIdParameter} New animation ID parameter object.
   * @constant
   * @public
   */
  animationId: function (
    /** @type {number} */
    id,
    /** @type {string} */
    name
  ) {
    return _base(id, name, _pc.animationId, -1);
  },

  /**
   * Create object ID parameter object.
   *
   * @param {number} id
   * @param {string} name
   * @returns {import("@pgmmv/agtk/plugins/plugin/parameter").AgtkObjectIdParameter} New object ID parameter object.
   * @constant
   * @public
   */
  objectId: function (
    /** @type {number} */
    id,
    /** @type {string} */
    name
  ) {
    return _base(id, name, _pc.objectId, -1);
  },

  /**
   * Create font ID parameter object.
   *
   * @param {number} id
   * @param {string} name
   * @returns {import("@pgmmv/agtk/plugins/plugin/parameter").AgtkFontIdParameter} New font ID parameter object.
   * @constant
   * @public
   */
  fontId: function (
    /** @type {number} */
    id,
    /** @type {string} */
    name
  ) {
    return _base(id, name, _pc.fontId, -1);
  },

  /**
   * Create movie ID parameter object.
   *
   * @param {number} id
   * @param {string} name
   * @returns {import("@pgmmv/agtk/plugins/plugin/parameter").AgtkMovieIdParameter} New movie ID parameter object.
   * @constant
   * @public
   */
  movieId: function (
    /** @type {number} */
    id,
    /** @type {string} */
    name
  ) {
    return _base(id, name, _pc.movieId, -1);
  },

  /**
   * Create bgm ID parameter object.
   *
   * @param {number} id
   * @param {string} name
   * @returns {import("@pgmmv/agtk/plugins/plugin/parameter").AgtkBgmIdParameter} New bgm ID parameter object.
   * @constant
   * @public
   */
  bgmId: function (
    /** @type {number} */
    id,
    /** @type {string} */
    name
  ) {
    return _base(id, name, _pc.bgmId, -1);
  },

  /**
   * Create se ID parameter object.
   *
   * @param {number} id
   * @param {string} name
   * @returns {import("@pgmmv/agtk/plugins/plugin/parameter").AgtkSeIdParameter} New se ID parameter object.
   * @constant
   * @public
   */
  seId: function (
    /** @type {number} */
    id,
    /** @type {string} */
    name
  ) {
    return _base(id, name, _pc.seId, -1);
  },

  /**
   * Create voice ID parameter object.
   *
   * @param {number} id
   * @param {string} name
   * @returns {import("@pgmmv/agtk/plugins/plugin/parameter").AgtkVoiceIdParameter} New voice ID parameter object.
   * @constant
   * @public
   */
  voiceId: function (
    /** @type {number} */
    id,
    /** @type {string} */
    name
  ) {
    return _base(id, name, _pc.voiceId, -1);
  },

  /**
   * Create variable ID parameter object.
   *
   * @param {number} id
   * @param {string} name
   * @param {number} referenceId
   * @param {boolean|undefined} withNewButton
   * @returns {import("@pgmmv/agtk/plugins/plugin/parameter").AgtkVariableIdParameter} New variable ID parameter object.
   * @constant
   * @public
   */
  variableId: function (
    /** @type {number} */
    id,
    /** @type {string} */
    name,
    /** @type {number} */
    referenceId,
    /** @type {boolean|undefined} */
    withNewButton
  ) {
    /** @type {import("@pgmmv/agtk/plugins/plugin/parameter").AgtkVariableIdParameter} */
    var p = _base(id, name, _pc.variableId, -1);

    p.referenceId = referenceId;
    p.withNewButton = withNewButton;

    return p;
  },

  /**
   * Create switch ID parameter object.
   *
   * @param {number} id
   * @param {string} name
   * @param {number} referenceId
   * @param {boolean|undefined} withNewButton
   * @returns {import("@pgmmv/agtk/plugins/plugin/parameter").AgtkSwitchIdParameter} New switch ID parameter object.
   * @constant
   * @public
   */
  switchId: function (
    /** @type {number} */
    id,
    /** @type {string} */
    name,
    /** @type {number} */
    referenceId,
    /** @type {boolean|undefined} */
    withNewButton
  ) {
    /** @type {import("@pgmmv/agtk/plugins/plugin/parameter").AgtkSwitchIdParameter} */
    var p = _base(id, name, _pc.switchId, -1);

    p.referenceId = referenceId;
    p.withNewButton = withNewButton;

    return p;
  },

  /**
   * Create anim-only ID parameter object.
   *
   * @param {number} id
   * @param {string} name
   * @returns {import("@pgmmv/agtk/plugins/plugin/parameter").AgtkAnimOnlyIdParameter} New anim-only ID parameter object.
   * @constant
   * @public
   */
  animOnlyId: function (
    /** @type {number} */
    id,
    /** @type {string} */
    name
  ) {
    return _base(id, name, _pc.animOnlyId, -1);
  },

  /**
   * Create portal ID parameter object.
   *
   * @param {number} id
   * @param {string} name
   * @returns {import("@pgmmv/agtk/plugins/plugin/parameter").AgtkPortalIdParameter} New portal ID parameter object.
   * @constant
   * @public
   */
  portalId: function (
    /** @type {number} */
    id,
    /** @type {string} */
    name
  ) {
    return _base(id, name, _pc.portalId, -1);
  },

  /**
   * Create custom ID parameter object.
   *
   * @param {number} id
   * @param {string} name
   * @param {import("@pgmmv/agtk/plugins/plugin/parameter").AgtkCustomIdParameterParameter[]} customParam
   * @param {number|undefined} defaultValue
   * @returns {import("@pgmmv/agtk/plugins/plugin/parameter").AgtkCustomIdParameter} New custom ID parameter object.
   * @constant
   * @public
   */
  customId: function (
    /** @type {number} */
    id,
    /** @type {string} */
    name,
    /** @type {import("@pgmmv/agtk/plugins/plugin/parameter").AgtkCustomIdParameterParameter[]} */
    customParam,
    /** @type {number|undefined} */
    defaultValue
  ) {
    /** @type {import("@pgmmv/agtk/plugins/plugin/parameter").AgtkCustomIdParameter} */
    var p = _base(id, name, _pc.customId, defaultValue === undefined ? -1 : defaultValue);

    p.customParam = customParam;

    return p;
  },

  /**
   * Create embedded parameter object.
   *
   * @param {number} id
   * @param {string} name
   * @param {number} sourceId
   * @param {number} width
   * @param {number} height
   * @param {import("@pgmmv/agtk/plugins/plugin/parameter").AgtkEmbeddedParameter['reference']} reference
   * @returns {import("@pgmmv/agtk/plugins/plugin/parameter").AgtkEmbeddedParameter} New embedded parameter object.
   * @constant
   * @public
   */
  embedded: function (
    /** @type {number} */
    id,
    /** @type {string} */
    name,
    /** @type {number} */
    sourceId,
    /** @type {number} */
    width,
    /** @type {number} */
    height,
    /** @type {import("@pgmmv/agtk/plugins/plugin/parameter").AgtkEmbeddedParameter['reference']} */
    reference
  ) {
    /** @type {import("@pgmmv/agtk/plugins/plugin/parameter").AgtkEmbeddedParameter} */
    var p = _base(id, name, _pc.embedded);

    p.sourceId = sourceId;
    p.width = width;
    p.height = height;
    p.reference = reference;

    return p;
  },

  /**
   * Create embedded editable parameter object.
   *
   * @param {number} id
   * @param {string} name
   * @param {number} sourceId
   * @param {number} width
   * @param {number} height
   * @param {import("@pgmmv/agtk/plugins/plugin/parameter").AgtkEmbeddedEditableParameter['reference']} reference
   * @returns {import("@pgmmv/agtk/plugins/plugin/parameter").AgtkEmbeddedEditableParameter} New embedded editable parameter object.
   * @constant
   * @public
   */
  embeddedEditable: function (
    /** @type {number} */
    id,
    /** @type {string} */
    name,
    /** @type {number} */
    sourceId,
    /** @type {number} */
    width,
    /** @type {number} */
    height,
    /** @type {import("@pgmmv/agtk/plugins/plugin/parameter").AgtkEmbeddedEditableParameter['reference']} */
    reference
  ) {
    /** @type {import("@pgmmv/agtk/plugins/plugin/parameter").AgtkEmbeddedEditableParameter} */
    var p = _base(id, name, _pc.embeddedEditable);

    p.sourceId = sourceId;
    p.width = width;
    p.height = height;
    p.reference = reference;

    return p;
  },

  /**
   * Create switch/variable object ID parameter object.
   *
   * @param {number} id
   * @param {string} name
   * @param {import("@pgmmv/agtk/plugins/plugin/parameter").AgtkSwitchVariableObjectIdParameter['option']} option
   * @returns {import("@pgmmv/agtk/plugins/plugin/parameter").AgtkSwitchVariableObjectIdParameter} New switch/variable object ID parameter object.
   * @constant
   * @public
   */
  switchVariableObjectId: function (
    /** @type {number} */
    id,
    /** @type {string} */
    name,
    /** @type {import("@pgmmv/agtk/plugins/plugin/parameter").AgtkSwitchVariableObjectIdParameter['option']} */
    option
  ) {
    /** @type {import("@pgmmv/agtk/plugins/plugin/parameter").AgtkSwitchVariableObjectIdParameter} */
    var p = _base(id, name, _pc.switchVariableObjectId, -1);

    p.option = option;

    return p;
  },

  /**
   * Create database ID parameter object.
   *
   * @param {number} id
   * @param {string} name
   * @returns {import("@pgmmv/agtk/plugins/plugin/parameter").AgtkDatabaseIdParameter} New database ID parameter object.
   * @constant
   * @public
   */
  databaseId: function (
    /** @type {number} */
    id,
    /** @type {string} */
    name
  ) {
    return _base(id, name, _pc.databaseId, -1);
  }
};
