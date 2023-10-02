const { mergeWithRules, CustomizeRule } = require('webpack-merge');

const rules = {
  module: {
    rules: {
      test: CustomizeRule.Match,
      use: {
        loader: CustomizeRule.Match,
        options: CustomizeRule.Merge
      }
    }
  }
};

const merge = (...args) => {
  const c = mergeWithRules(rules)(...args);
  RegExp.prototype.toJSON = RegExp.prototype.toString;
  console.log('***Resolved Webpack Configuration***', JSON.stringify(c, undefined, 2));
  return c;
};

module.exports = (env, args) => {
  switch (process.env.DD_TARGET) {
    case 'pgmmv':
      switch (args.mode) {
        case 'development':
          return merge(
            require('./webpack/plugins.common'),
            require('./webpack/plugins.pgmmv-common'),
            require('./webpack/plugins.pgmmv-development')
          );
        case 'production':
          return merge(
            require('./webpack/plugins.common'),
            require('./webpack/plugins.pgmmv-common'),
            require('./webpack/plugins.pgmmv-production')
          );
        default:
          break;
      }
      break;
    case 'package':
      switch (args.mode) {
        case 'development':
          return merge(
            require('./webpack/plugins.common'),
            require('./webpack/plugins.package-common'),
            require('./webpack/plugins.package-development')
          );
        case 'production':
          return merge(
            require('./webpack/plugins.common'),
            require('./webpack/plugins.package-common'),
            require('./webpack/plugins.package-production')
          );
        default:
          break;
      }
  }

  throw new Error('No matching configuration was found!');
};
