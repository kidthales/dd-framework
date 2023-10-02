const { ConcatSource, OriginalSource, PrefixSource, RawSource } = require('webpack-sources');

const { tryRunOrWebpackError } = require('webpack/lib/HookWebpackError');
const InitFragment = require('webpack/lib/InitFragment');
const RuntimeGlobals = require('webpack/lib/RuntimeGlobals');
const Template = require('webpack/lib/Template');

const JavascriptModulesPlugin = require('webpack/lib/javascript/JavascriptModulesPlugin');

const { last } = require('webpack/lib/util/IterableHelpers');
const { compareModulesByIdentifier } = require('webpack/lib/util/comparators');

/**
 * Can probably go back to at least v5.47.0
 */
class IIFEReturnPlugin extends JavascriptModulesPlugin {
  /**
   * @param {MainRenderContext} renderContext options object
   * @param {CompilationHooks} hooks hooks
   * @param {Compilation} compilation the compilation
   * @returns {Source} the newly generated source from rendering
   */
  renderMain(renderContext, hooks, compilation) {
    const { chunk, chunkGraph, runtimeTemplate } = renderContext;

    const runtimeRequirements = chunkGraph.getTreeRuntimeRequirements(chunk);
    const iife = runtimeTemplate.isIIFE();

    const bootstrap = this.renderBootstrap(renderContext, hooks);
    const useSourceMap = hooks.useSourceMap.call(chunk, renderContext);

    const allModules = Array.from(
      chunkGraph.getOrderedChunkModulesIterableBySourceType(chunk, 'javascript', compareModulesByIdentifier) || []
    );

    const hasEntryModules = chunkGraph.getNumberOfEntryModules(chunk) > 0;
    let inlinedModules;
    if (bootstrap.allowInlineStartup && hasEntryModules) {
      inlinedModules = new Set(chunkGraph.getChunkEntryModulesIterable(chunk));
    }

    let source = new ConcatSource();
    let prefix;
    if (iife) {
      if (runtimeTemplate.supportsArrowFunction()) {
        source.add('/******/ (() => { // webpackBootstrap\n');
      } else {
        source.add('/******/ (function() { // webpackBootstrap\n');
      }
      prefix = '/******/ \t';
    } else {
      prefix = '/******/ ';
    }
    let allStrict = renderContext.strictMode;
    if (!allStrict && allModules.every((m) => m.buildInfo.strict)) {
      const strictBailout = hooks.strictRuntimeBailout.call(renderContext);
      if (strictBailout) {
        source.add(prefix + `// runtime can't be in strict mode because ${strictBailout}.\n`);
      } else {
        allStrict = true;
        source.add(prefix + '"use strict";\n');
      }
    }

    /** @type {ChunkRenderContext} */
    const chunkRenderContext = {
      ...renderContext,
      chunkInitFragments: [],
      strictMode: allStrict
    };

    const chunkModules = Template.renderChunkModules(
      chunkRenderContext,
      inlinedModules ? allModules.filter((m) => !inlinedModules.has(m)) : allModules,
      (module) => this.renderModule(module, chunkRenderContext, hooks, true),
      prefix
    );
    if (
      chunkModules ||
      runtimeRequirements.has(RuntimeGlobals.moduleFactories) ||
      runtimeRequirements.has(RuntimeGlobals.moduleFactoriesAddOnly) ||
      runtimeRequirements.has(RuntimeGlobals.require)
    ) {
      source.add(prefix + 'var __webpack_modules__ = (');
      source.add(chunkModules || '{}');
      source.add(');\n');
      source.add('/************************************************************************/\n');
    }

    if (bootstrap.header.length > 0) {
      const header = Template.asString(bootstrap.header) + '\n';
      source.add(
        new PrefixSource(prefix, useSourceMap ? new OriginalSource(header, 'webpack/bootstrap') : new RawSource(header))
      );
      source.add('/************************************************************************/\n');
    }

    const runtimeModules = renderContext.chunkGraph.getChunkRuntimeModulesInOrder(chunk);

    if (runtimeModules.length > 0) {
      source.add(new PrefixSource(prefix, Template.renderRuntimeModules(runtimeModules, chunkRenderContext)));
      source.add('/************************************************************************/\n');
      // runtimeRuntimeModules calls codeGeneration
      for (const module of runtimeModules) {
        compilation.codeGeneratedModules.add(module);
      }
    }
    if (inlinedModules) {
      if (bootstrap.beforeStartup.length > 0) {
        const beforeStartup = Template.asString(bootstrap.beforeStartup) + '\n';
        source.add(
          new PrefixSource(
            prefix,
            useSourceMap ? new OriginalSource(beforeStartup, 'webpack/before-startup') : new RawSource(beforeStartup)
          )
        );
      }
      const lastInlinedModule = last(inlinedModules);
      const startupSource = new ConcatSource();
      startupSource.add(`var __webpack_exports__ = {};\n`);
      for (const m of inlinedModules) {
        const renderedModule = this.renderModule(m, chunkRenderContext, hooks, false);
        if (renderedModule) {
          const innerStrict = !allStrict && m.buildInfo.strict;
          const runtimeRequirements = chunkGraph.getModuleRuntimeRequirements(m, chunk.runtime);
          const exports = runtimeRequirements.has(RuntimeGlobals.exports);
          const webpackExports = exports && m.exportsArgument === '__webpack_exports__';
          let iife = innerStrict
            ? 'it need to be in strict mode.'
            : inlinedModules.size > 1
            ? // TODO check globals and top-level declarations of other entries and chunk modules
              // to make a better decision
              'it need to be isolated against other entry modules.'
            : chunkModules
            ? 'it need to be isolated against other modules in the chunk.'
            : exports && !webpackExports
            ? `it uses a non-standard name for the exports (${m.exportsArgument}).`
            : hooks.embedInRuntimeBailout.call(m, renderContext);
          let footer;
          if (iife !== undefined) {
            startupSource.add(`// This entry need to be wrapped in an IIFE because ${iife}\n`);
            const arrow = runtimeTemplate.supportsArrowFunction();
            if (arrow) {
              startupSource.add('(() => {\n');
              footer = '\n})();\n\n';
            } else {
              // Change to non-standard behavior.
              //startupSource.add('!function() {\n');
              startupSource.add('/* IIFEReturnPlugin */ return function() {\n');
              footer = '\n}();\n';
            }
            if (innerStrict) startupSource.add('"use strict";\n');
          } else {
            footer = '\n';
          }
          if (exports) {
            if (m !== lastInlinedModule) startupSource.add(`var ${m.exportsArgument} = {};\n`);
            else if (m.exportsArgument !== '__webpack_exports__')
              startupSource.add(`var ${m.exportsArgument} = __webpack_exports__;\n`);
          }
          startupSource.add(renderedModule);
          startupSource.add(footer);
        }
      }
      if (runtimeRequirements.has(RuntimeGlobals.onChunksLoaded)) {
        startupSource.add(`__webpack_exports__ = ${RuntimeGlobals.onChunksLoaded}(__webpack_exports__);\n`);
      }
      source.add(
        hooks.renderStartup.call(startupSource, lastInlinedModule, {
          ...renderContext,
          inlined: true
        })
      );
      if (bootstrap.afterStartup.length > 0) {
        const afterStartup = Template.asString(bootstrap.afterStartup) + '\n';
        source.add(
          new PrefixSource(
            prefix,
            useSourceMap ? new OriginalSource(afterStartup, 'webpack/after-startup') : new RawSource(afterStartup)
          )
        );
      }
    } else {
      const lastEntryModule = last(chunkGraph.getChunkEntryModulesIterable(chunk));
      const toSource = useSourceMap
        ? (content, name) => new OriginalSource(Template.asString(content), name)
        : (content) => new RawSource(Template.asString(content));
      source.add(
        new PrefixSource(
          prefix,
          new ConcatSource(
            toSource(bootstrap.beforeStartup, 'webpack/before-startup'),
            '\n',
            hooks.renderStartup.call(toSource(bootstrap.startup.concat(''), 'webpack/startup'), lastEntryModule, {
              ...renderContext,
              inlined: false
            }),
            toSource(bootstrap.afterStartup, 'webpack/after-startup'),
            '\n'
          )
        )
      );
    }
    if (hasEntryModules && runtimeRequirements.has(RuntimeGlobals.returnExportsFromRuntime)) {
      source.add(`${prefix}return __webpack_exports__;\n`);
    }
    if (iife) {
      source.add('/******/ })()\n');
    }

    /** @type {Source} */
    let finalSource = tryRunOrWebpackError(
      () => hooks.renderMain.call(source, renderContext),
      'JavascriptModulesPlugin.getCompilationHooks().renderMain'
    );
    if (!finalSource) {
      throw new Error(
        'JavascriptModulesPlugin error: JavascriptModulesPlugin.getCompilationHooks().renderMain plugins should return something'
      );
    }
    finalSource = tryRunOrWebpackError(
      () => hooks.renderContent.call(finalSource, renderContext),
      'JavascriptModulesPlugin.getCompilationHooks().renderContent'
    );
    if (!finalSource) {
      throw new Error(
        'JavascriptModulesPlugin error: JavascriptModulesPlugin.getCompilationHooks().renderContent plugins should return something'
      );
    }
    finalSource = InitFragment.addToSource(finalSource, chunkRenderContext.chunkInitFragments, chunkRenderContext);
    finalSource = tryRunOrWebpackError(
      () => hooks.render.call(finalSource, renderContext),
      'JavascriptModulesPlugin.getCompilationHooks().render'
    );
    if (!finalSource) {
      throw new Error(
        'JavascriptModulesPlugin error: JavascriptModulesPlugin.getCompilationHooks().render plugins should return something'
      );
    }
    chunk.rendered = true;
    return iife ? new ConcatSource(finalSource, ';') : finalSource;
  }
}

module.exports = IIFEReturnPlugin;
