const { renderFile } = require('ejs');

/** @type {import('./types').Config} */
const config = require('./package.json')['plugins-md'];

/** @type {Record<string, import('@pgmmv/agtk/plugins/plugin').AgtkPlugin>} */
const plugins = require('../../dist/package');

/** @type {Record<keyof import('./types').Config['locale']['configs'][string]['data'], ((content: string) => string)[]>} */
const localeFilters = {
  readmeTitle: [eolToSpace, trim, escapeMd],
  author: [eolToSpace, trim, escapeInlineBacktick],
  help: [eolToSpace, trim, escapeMd],
  parameters: [eolToSpace, trim, escapeMd],
  actionCommands: [eolToSpace, trim, escapeMd],
  linkConditions: [eolToSpace, trim, escapeMd],
  default: [eolToSpace, trim, escapeMd],
  decimals: [eolToSpace, trim, escapeMd],
  minimum: [eolToSpace, trim, escapeMd],
  maximum: [eolToSpace, trim, escapeMd],
  references: [eolToSpace, trim, escapeMd],
  withNewButton: [eolToSpace, trim, escapeMd],
  true: [eolToSpace, trim, escapeMd],
  false: [eolToSpace, trim, escapeMd]
};

function main() {
  const argv = require('minimist')(process.argv.slice(2), config.argv);

  /** @type {string} */
  const locale = argv.locale || config.locale.default;
  const localeConfig = config.locale.configs[locale];

  if (!localeConfig) {
    throw new Error(`Invalid locale: '${locale}`);
  }

  const out = argv.out ? require('path').resolve(argv.out + localeConfig.outSuffix) : undefined;

  if (out && argv.clean) {
    require('shelljs').rm('-rf', out);
  }

  require('shelljs').mkdir('-p', out);

  /** @type {import('./types').Config['locale']['configs'][string]['data']} */
  const localeData = {};
  for (const key in localeConfig.data) {
    localeData[key] = pipe(localeConfig.data[key], ...(localeFilters[key] || []));
  }

  /** @type {import('./types').ReadmeData} */
  const readmeData = { locale: localeData, plugins: [] };

  for (const key in plugins) {
    const plugin = plugins[key];
    const filename = `${key}.md`;

    plugin.setLocale(locale);

    const pluginPageData = parsePlugin(plugin, localeData);

    readmeData.plugins.push({ name: pluginPageData.name, href: `./${filename}` });

    renderFile(
      `${__dirname}/views/plugin-page.ejs`,
      { locale: localeData, plugin: pluginPageData },
      { cache: true },
      function (err, str) {
        if (err) {
          throw err;
        }

        if (!out) {
          require('shelljs').echo('-n', str);
          return;
        }

        require('shelljs')
          .ShellString(str)
          .to(require('path').normalize(`${out}/${filename}`));
      }
    );
  }

  renderFile(`${__dirname}/views/README.ejs`, readmeData, { cache: true }, function (err, str) {
    if (err) {
      throw err;
    }

    if (!out) {
      require('shelljs').echo('-n', str);
      return;
    }

    require('shelljs')
      .ShellString(str)
      .to(require('path').normalize(`${out}/README.md`));
  });
}

/**
 *
 * @param {import('@pgmmv/agtk/plugins/plugin').AgtkPlugin} plugin
 * @param {import('./types').Config['locale']['configs'][string]['data']} localeData
 * @returns {import('./types').PluginPageData}
 */
function parsePlugin(plugin, localeData) {
  return {
    name: pipe(plugin.getInfo('name'), eolToSpace, trim, escapeMd),
    description: pipe(plugin.getInfo('description'), eolToSpace, trim, escapeMd),
    author: pipe(plugin.getInfo('author'), eolToSpace, trim, escapeMd),
    help: pipe(plugin.getInfo('help'), escapeBacktick),
    parameters: parseParameters(plugin.getInfo('parameter'), localeData),
    actionCommands: plugin.getInfo('actionCommand').map((ac) => parseCommandOrCondition(ac, localeData)),
    linkConditions: plugin.getInfo('linkCondition').map((lc) => parseCommandOrCondition(lc, localeData))
  };
}

/**
 * @param {import('@pgmmv/agtk/plugins/plugin').AgtkActionCommand|import('@pgmmv/agtk/plugins/plugin').AgtkLinkCondition} commandOrCondition
 * @param {import('./types').Config['locale']['configs'][string]['data']} localeData
 * @returns {import('./types').CommandOrCondition}
 */
function parseCommandOrCondition(commandOrCondition, localeData) {
  return {
    name: pipe(commandOrCondition.name, eolToSpace, trim, escapeMd),
    description: pipe(commandOrCondition.description, eolToSpace, trim, escapeMd),
    parameters: parseParameters(commandOrCondition.parameter, localeData)
  };
}

/**
 * @param {import('@pgmmv/agtk/plugins/plugin/parameter').AgtkParameter[]} parameters
 * @param {import('./types').Config['locale']['configs'][string]['data']} localeData
 * @returns {(import('./types').Parameters)}
 */
function parseParameters(parameters, localeData) {
  /** @type {(import('./types').Parameters)} */
  const parsed = [];

  /** @type {Record<number, import('./types').Parameter>} */
  const refs = {};

  /** @type {import('./types').ParameterSection|undefined} */
  let parameterSection;

  for (const parameter of parameters) {
    let name = pipe(parameter.name, eolToSpace, trim);

    if (!name) {
      continue;
    }

    /** @type {import('./types').ParameterUnion|undefined} */
    let parsedParameter;

    switch (parameter.type) {
      case 'Embedded':
        if (['―――', '***', '---', '___'].some((v) => name.startsWith(v))) {
          if (parameterSection) {
            parsed.push(parameterSection);
          }
          parameterSection = { description: [], parameters: [] };
          break;
        } else if (name.endsWith('‾') && parameterSection) {
          parameterSection.name = pipe(name.replace(/[‾]+/g, ''), trim, removeTrailingColon, trim, escapeMd);
          break;
        } else if (parameter.sourceId === undefined && parameterSection) {
          parameterSection.description.push(pipe(name, escapeMd));
          break;
        }
      // eslint-disable-next-line no-fallthrough
      case 'EmbeddedEditable':
        parsedParameter = {
          name: pipe(name, removeTrailingColon, trim, escapeInlineBacktick),
          type: parameter.type,
          attributes: {
            [pipe(localeData.references, eolToSpace, trim, escapeMd)]: parameter.sourceId
          }
        };
        break;
      case 'CustomId':
        parsedParameter = {
          name: pipe(name, removeTrailingColon, trim, escapeInlineBacktick),
          type: parameter.type,
          attributes: parameter.customParam.reduce((prev, cp) => {
            prev[pipe(cp.name, eolToSpace, trim, escapeInlineBacktick)] = null;
            return prev;
          }, {}),
          defaultValue: pipe(
            parameter.customParam.reduce((prev, cp) => (parameter.defaultValue === cp.id ? cp.name : prev), ''),
            escapeInlineBacktick
          )
        };
        break;
      case 'SwitchVariableObjectId':
        parsedParameter = {
          name: pipe(name, removeTrailingColon, trim, escapeInlineBacktick),
          type: parameter.type,
          attributes: parameter.option.reduce((prev, opt) => {
            prev[pipe(opt, eolToSpace, trim, escapeInlineBacktick)] = null;
            return prev;
          }, {})
        };
        break;
      case 'Number':
        parsedParameter = {
          name: pipe(name, removeTrailingColon, trim, escapeInlineBacktick),
          type: parameter.type,
          attributes: {
            [pipe(localeData.decimals, eolToSpace, trim, escapeMd)]:
              typeof parameter.decimals === 'number'
                ? parameter.decimals.toString()
                : pipe(localeData.na, eolToSpace, trim, escapeInlineBacktick),
            [pipe(localeData.minimum, eolToSpace, trim, escapeMd)]:
              typeof parameter.minimumValue === 'number'
                ? parameter.minimumValue.toString()
                : pipe(localeData.na, eolToSpace, trim, escapeInlineBacktick),
            [pipe(localeData.maximum, eolToSpace, trim, escapeMd)]:
              typeof parameter.maximumValue === 'number'
                ? parameter.maximumValue.toString()
                : pipe(localeData.na, eolToSpace, trim, escapeInlineBacktick)
          },
          defaultValue: parameter.defaultValue.toString()
        };
        break;
      case 'SwitchId':
      case 'VariableId':
        parsedParameter = {
          name: pipe(name, removeTrailingColon, trim, escapeInlineBacktick),
          type: parameter.type,
          attributes: {
            [pipe(localeData.references, eolToSpace, trim, escapeMd)]: parameter.referenceId,
            [pipe(localeData.withNewButton, eolToSpace, trim, escapeMd)]: pipe(
              parameter.withNewButton ? localeData.true : localeData.false,
              eolToSpace,
              trim,
              escapeInlineBacktick
            )
          }
        };
        break;
      case 'Json':
      case 'String':
      case 'MultiLineString':
        parsedParameter = {
          name: pipe(name, removeTrailingColon, trim, escapeInlineBacktick),
          type: parameter.type,
          defaultValue: pipe(JSON.stringify(parameter.defaultValue, undefined, 2), escapeInlineBacktick)
        };
        break;
      case 'ImageId':
      case 'TextId':
      case 'SceneId':
      case 'TilesetId':
      case 'AnimationId':
      case 'ObjectId':
      case 'FontId':
      case 'MovieId':
      case 'BgmId':
      case 'SeId':
      case 'VoiceId':
      case 'AnimOnlyId':
      case 'PortalId':
      case 'DatabaseId':
      default:
        parsedParameter = {
          name: pipe(name, removeTrailingColon, trim, escapeInlineBacktick),
          type: parameter.type
        };
        break;
    }

    if (parsedParameter) {
      if (parameterSection) {
        parameterSection.parameters.push(parsedParameter);
      } else {
        parsed.push(parsedParameter);
      }

      refs[parameter.id] = parsedParameter;
    }

    parsedParameter = undefined;
  }

  if (parameterSection && !parameterSection.parameters.length) {
    parsed.push(parameterSection);
  }

  for (const id in refs) {
    const parsedParameter = refs[id];

    /** @type {string|undefined} */
    let key;

    /** @type {number|undefined} */
    let refId;

    switch (parsedParameter.type) {
      case 'Embedded':
      case 'EmbeddedEditable':
      case 'SwitchId':
      case 'VariableId':
        key = pipe(localeData.references, eolToSpace, trim, escapeMd);
        refId = parsedParameter.attributes ? parsedParameter.attributes[key] : undefined;

        if (refId !== undefined && refs[refId]) {
          parsedParameter.attributes[key] = refs[refId].name;
        }
        break;
      default:
        break;
    }
  }

  return parsed;
}

/**
 * @param {string} content
 * @returns {string}
 */
function eolToSpace(content) {
  return content.replace(/[\r]/g, '').replace(/[\n]+/g, ' ');
}

/**
 * @param {string} content
 * @returns {string}
 */
function trim(content) {
  return content.trim();
}

/**
 * @param {string} content
 * @returns {string}
 */
function escapeMd(content) {
  return content.replace(/[\\`*_{}[\]()#+-.!]/g, '\\$&');
}

/**
 * @param {string} content
 * @returns {string}
 */
function escapeBacktick(content) {
  return content.replace(/[`]/g, '\\`');
}

/**
 * @param {string} content
 * @returns {string}
 */
function escapeInlineBacktick(content) {
  return content.replace(/[`]/g, '``');
}

/**
 * @param {string} content
 * @returns {string}
 */
function removeTrailingColon(content) {
  return content.endsWith(':') ? content.slice(0, -1) : content;
}

/**
 *
 * @param {string} content
 * @param  {...((content: string) => string)} filters
 */
function pipe(content, ...filters) {
  return filters.reduce((c, fn) => fn(c), content);
}

main();
