/**
 * Core plugin API string to JSON module.
 *
 * @module    dd.core.string.toJson
 * @author    kidthales <kidthales@agogpixel.com>
 * @copyright 2023 kidthales
 * @license   {@link https://github.com/kidthales/dd-framework/blob/main/LICENSE.txt | MIT License}
 */

/**
 * @private
 */
var _repeatStr = require('./repeat'),
  /**
   * Test if specified value is an array.
   *
   * @param {unknown} value Value to test.
   * @returns {boolean} True when value is an array, false otherwise.
   * @private
   */
  _isArray = function (value) {
    return Array.isArray(value) && typeof value === 'object';
  },
  /**
   * Test if specified value is an object.
   *
   * @param {unknown} value Value to test.
   * @returns {boolean} True when value is a non-null & non-array object, false otherwise.
   * @private
   */
  _isObject = function (value) {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
  },
  /**
   * Test if specified value is a string.
   *
   * @param {unknown} value Value to test.
   * @returns {boolean} True when value is a string, false otherwise.
   * @private
   */
  _isString = function (value) {
    return typeof value === 'string';
  },
  /**
   * Test if specified value is a boolean.
   *
   * @param {unknown} value Value to test.
   * @returns {boolean} True when value is a boolean, false otherwise.
   * @private
   */
  _isBoolean = function (value) {
    return typeof value === 'boolean';
  },
  /**
   * Test if specified value is a number.
   *
   * @param {unknown} value Value to test.
   * @returns {boolean} True when value is a number, false otherwise.
   * @private
   */
  _isNumber = function (value) {
    return typeof value === 'number';
  },
  /**
   * Test if specified value is null.
   *
   * @param {unknown} value Value to test.
   * @returns {boolean} True when value is null, false otherwise.
   * @private
   */
  _isNull = function (value) {
    return value === null && typeof value === 'object';
  },
  /**
   * Test if value is a number type, but invalid.
   *
   * @param {unknown} value Value to test.
   * @returns {boolean} True when value is a number type but invalid, false otherwise.
   * @private
   */
  _isNotNumber = function (value) {
    return typeof value === 'number' && isNaN(value);
  },
  /**
   * Test if value is infinity.
   *
   * @param {unknown} value Value to test.
   * @returns {boolean} True when value is infinity, false otherwise.
   * @private
   */
  _isInfinity = function (value) {
    return typeof value === 'number' && !isFinite(value);
  },
  /**
   * Test if value is a [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)
   * instance.
   *
   * @param {unknown} value Value to test.
   * @returns {boolean} True when value is a Date instance, false otherwise.
   * @private
   */
  _isDate = function (value) {
    return typeof value === 'object' && value !== null && typeof value.getMonth === 'function';
  },
  /**
   * Test if value is undefined.
   *
   * @param {unknown} value Value to test.
   * @returns {boolean} True when value is undefined, false otherwise.
   * @private
   */
  _isUndefined = function (value) {
    return value === undefined && typeof value === 'undefined';
  },
  /**
   * Test if value is a function.
   *
   * @param {unknown} value Value to test.
   * @returns {boolean} True when value is a function, false otherwise.
   * @private
   */
  _isFunction = function (value) {
    return typeof value === 'function';
  },
  /**
   * Test if value is a number, string, or boolean.
   *
   * @param {unknown} value Value to test.
   * @returns {boolean} True when value is a number, string, or boolean. False otherwise.
   * @private
   */
  _restOfDataTypes = function (value) {
    return _isNumber(value) || _isString(value) || _isBoolean(value);
  },
  /**
   * Test if value is an ignored data type.
   *
   * @param {unknown} value Value to test.
   * @returns {boolean} True when value is an ignored data type, false otherwise.
   * @private
   */
  _ignoreDataTypes = function (value) {
    return _isUndefined(value);
  },
  /**
   * Test if value is a number type (but invalid), infinity, or null.
   *
   * @param {unknown} value Value to test.
   * @returns {boolean} True when value is a number type (but invalid), infinity, or null.
   * False otherwise.
   * @private
   */
  _nullDataTypes = function (value) {
    return _isNotNumber(value) || _isInfinity(value) || _isNull(value);
  },
  /**
   * Test if value is a number type (but invalid), infinity, null, undefined, or
   * symbol.
   *
   * @param {unknown} value Value to test.
   * @returns {boolean} True when value is a number type (but invalid), infinity, null,
   * undefined, or symbol. False otherwise.
   * @private
   */
  _arrayValuesNullTypes = function (value) {
    return _nullDataTypes(value) || _ignoreDataTypes(value);
  },
  /**
   * Remove a trailing comma from a string with trailing newline support.
   *
   * @param {string} str String to remove comma from.
   * @param {boolean} newline Account for trailing newline?
   * @returns {string} A string with trailing comma removed.
   * @private
   */
  _removeComma = function (
    /** @type {string} */
    str,
    /** @type {boolean} */
    newline
  ) {
    /** @type {string[]} */
    var tempArr;

    if (!newline) {
      tempArr = str.split('');
    } else {
      tempArr = str.trimRight().split('');
    }

    tempArr.pop();

    return tempArr.join('') + (newline ? '\n' : '');
  };

/**
 * Custom JSON stringify method that can handle some non-JSON data types
 * (Date, Functions, etc.). Capable of custom indent sizing & function to
 * string conversion.
 *
 * Cycle safe - already visited references will result in "[seen object]" or
 * "[seen array]" string literals.
 *
 * @param {unknown} value Value to convert to a JSON encoded string.
 * @param {number|undefined} space Amount of space characters in an indent. 0 will result in a
 * single line.
 * @param {boolean|undefined} stringifyFunctions Stringify functions?
 * @returns {string} A JSON encoded string.
 */
module.exports = function (value, space, stringifyFunctions) {
  var seen = [],
    indentSize = typeof space === 'number' && space >= 0 ? space : 2;

  /**
   *
   * @param {unknown} obj
   * @param {number} indent
   * @returns
   */
  function parse(obj, indent) {
    /** @type {string} */
    var passQuotes,
      /** @type {string} */
      arrStr,
      /** @type {string} */
      objStr,
      /** @type {string[]} */
      objKeys,
      /** @type {unknown} */
      eachValue;

    if (_ignoreDataTypes(obj)) {
      return undefined;
    }

    if (_isDate(obj)) {
      return '"' + obj.toISOString() + '"';
    }

    if (_nullDataTypes(obj)) {
      return 'null';
    }

    if (_isFunction(obj)) {
      if (stringifyFunctions && _isFunction(obj.toString)) {
        return (
          '"' +
          obj
            .toString()
            .replace('"', '\\"')
            .split('\n')
            .join((!indentSize ? '' : '\n') + _repeatStr(' ', indentSize)) +
          '"'
        );
      }

      return '"function"';
    }

    if (_restOfDataTypes(obj)) {
      passQuotes = _isString(obj) ? '"' : '';
      return passQuotes + obj.toString().replace('"', '\\"') + passQuotes;
    }

    if (_isArray(obj) || _isObject(obj)) {
      if (seen.indexOf(obj) >= 0) {
        return '"[seen ' + (_isArray(obj) ? 'array' : 'object') + ']"';
      }

      seen.push(obj);
    }

    if (_isArray(obj)) {
      arrStr = '';

      if (!obj.length) {
        return '[]';
      }

      obj.forEach(function (eachValue) {
        arrStr +=
          _repeatStr(' ', indent + indentSize) +
          (_arrayValuesNullTypes(eachValue) ? parse(null, indent + indentSize) : parse(eachValue, indent + indentSize));
        arrStr += ',' + (!indentSize ? '' : '\n');
      });

      return '[' + (!indentSize ? '' : '\n') + _removeComma(arrStr, !!indentSize) + _repeatStr(' ', indent) + ']';
    }

    if (_isObject(obj)) {
      objStr = '';
      objKeys = Object.keys(obj);

      if (!objKeys.length) {
        return '{}';
      }

      objKeys.forEach(function (eachKey) {
        eachValue = obj[eachKey];
        objStr += !_ignoreDataTypes(eachValue)
          ? _repeatStr(' ', indent + indentSize) +
            '"' +
            eachKey +
            '":' +
            (!indentSize ? '' : ' ') +
            parse(eachValue, indent + indentSize) +
            ',' +
            (!indentSize ? '' : '\n')
          : '';
      });

      return '{' + (!indentSize ? '' : '\n') + _removeComma(objStr, !!indentSize) + _repeatStr(' ', indent) + '}';
    }
  }

  return parse(value, 0);
};
