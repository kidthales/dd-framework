const TerserPlugin = require('terser-webpack-plugin');

const iifeReturnMinify = function (...args) {
  const tp = require('terser-webpack-plugin');
  const regexA = /^!function\(\)/;
  const regexB = /\/\* IIFEReturnPlugin \*\//;

  return tp.terserMinify(...args).then((value) => {
    if (regexA.test(value.code)) {
      value.code = value.code.replace(regexA, 'return function()');
    }

    if (regexB.test(value.code)) {
      value.code = value.code.replace(regexB, 'return ');
    }

    value.code = `(function() {\n${value.code}\n}());`;

    return value;
  });
};

iifeReturnMinify.getMinimizerVersion = TerserPlugin.terserMinify.getMinimizerVersion;

module.exports = iifeReturnMinify;
