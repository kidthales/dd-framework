const TerserPlugin = require('terser-webpack-plugin');

const version = require('../package.json').version;

const { iifeReturnMinify, IIFEReturnPlugin } = require('./iife');
const pluginIdentifiers = require('./plugin-identifiers');

const srcPath = require('path').resolve(__dirname, '..', 'src');
const distPath = require('path').resolve(__dirname, '..', 'dist');

module.exports = {
  entry: pluginIdentifiers.reduce((entry, plugin) => {
    entry[`${plugin}-${version}`] = `${srcPath}/plugins/${plugin}/entry.js`;
    return entry;
  }, {}),
  output: {
    iife: true,
    path: `${distPath}/plugins`,
    environment: {
      arrowFunction: false
    }
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          format: {
            comments: function comments(node, comment) {
              // leave for minifier
              return /IIFEReturnPlugin/.test(comment.value);
            },
            max_line_len: 255
          }
        },
        minify: iifeReturnMinify
      })
    ]
  },
  plugins: [new IIFEReturnPlugin()]
};
