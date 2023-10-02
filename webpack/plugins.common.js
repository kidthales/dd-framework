const { DefinePlugin } = require('webpack');

const version = require('../package.json').version;
const srcPath = require('path').resolve(__dirname, '..', 'src');

module.exports = {
  devtool: false,
  resolve: {
    extensions: ['.js'],
    alias: {
      '@dd/common': `${srcPath}/common`
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            parserOpts: {
              allowReturnOutsideFunction: true
            }
          }
        },
        include: srcPath,
        exclude: /node_modules/
      },
      {
        test: /\.txt$/,
        type: 'asset/source'
      }
    ]
  },
  plugins: [
    new DefinePlugin({
      DD_FRAMEWORK_VERSION: JSON.stringify(version)
    })
  ]
};
