const HtmlWebpackPlugin = require('html-webpack-plugin');

const pluginIdentifiers = require('./plugin-identifiers');

const packageJson = require('../package.json');

const srcPath = require('path').resolve(__dirname, '..', 'src');
const distPath = require('path').resolve(__dirname, '..', 'dist');

module.exports = {
  entry: pluginIdentifiers.reduce((entry, plugin) => {
    entry[plugin] = `${srcPath}/plugins/${plugin}/plugin.js`;
    return entry;
  }, {}),
  output: {
    library: {
      type: 'commonjs2'
    },
    path: `${distPath}/package`,
    filename: '[name].js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'package.json',
      templateContent: JSON.stringify(
        {
          name: packageJson.name,
          version: packageJson.version,
          description: packageJson.description,
          author: packageJson.author,
          license: packageJson.license,
          private: packageJson.private,
          homepage: packageJson.homepage,
          repository: packageJson.repository,
          bugs: packageJson.bugs,
          main: './index.js'
        },
        undefined,
        2
      ),
      inject: false,
      minify: false
    }),
    new HtmlWebpackPlugin({
      filename: 'index.js',
      templateContent:
        'module.exports = {' +
        pluginIdentifiers.reduce(
          (body, plugin, index) =>
            body + `\n  ${plugin}: require('./${plugin}.js')${index !== pluginIdentifiers.length - 1 ? ',' : '\n'}`,
          ''
        ) +
        '};\n',
      inject: false,
      minify: false
    })
  ]
};
