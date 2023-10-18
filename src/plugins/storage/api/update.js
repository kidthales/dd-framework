/**
 * Storage plugin API update module.
 *
 * @internal
 * @module    @dd/storage/update
 * @author    kidthales <kidthales@agogpixel.com>
 * @copyright 2023 kidthales
 * @license   {@link https://github.com/kidthales/dd-framework/blob/main/LICENSE.txt | MIT License}
 */

/**
 * @internal
 * @returns {void}
 */
module.exports = function () {
  var state = require('./state'),
    apiConstants = require('./constants'),
    dirPath = Agtk.settings.projectPath + '/' + apiConstants.directoryName,
    filePath = dirPath + '/' + apiConstants.fileName,
    /** @type {string|undefined} */
    json,
    /** @type {(() => void)|undefined} */
    writeFile;

  switch (state.mode) {
    case undefined: // init
      if (dd.core.fs.isFile(filePath)) {
        state.mode = apiConstants.mode.busy;

        dd.core.fs.readFile(filePath, function (success, data) {
          if (!success || typeof data !== 'string') {
            // logError('failed reading from: ' + filePath);
            state.error = true;
            return;
          }

          try {
            state.data = JSON.parse(data);
          } catch (e) {
            //logError('failed parsing read result: ' + jsbResult);
            state.error = true;
            return;
          }

          if (!cc.isObject(state.data)) {
            //logError('invalid parse result: expected object');
            state.error = true;
            return;
          }

          state.mode = apiConstants.mode.ready;
        });

        return;
      }

      state.mode = apiConstants.mode.ready;
      state.data = {};

      break;

    case apiConstants.mode.ready:
      if (state.saveRequested) {
        state.saveRequested = false;

        try {
          json = JSON.stringify(state.data);
        } catch (e) {
          //logError('failed encoding internalData');
          state.error = true;
          return;
        }

        state.mode = apiConstants.mode.busy;

        writeFile = function () {
          dd.core.fs.writeFile(filePath, json, function (success, data) {
            if (!success) {
              // TODO log...
              state.error = true;
              return;
            }

            state.mode = apiConstants.mode.ready;
          });
        };

        if (dd.core.fs.isDirectory(dirPath)) {
          writeFile();
        } else {
          dd.core.fs.createDirectory(dirPath, function (success, data) {
            if (!success) {
              // TODO log...
              state.error = true;
              return;
            }

            writeFile();
          });
        }
      }

      break;

    case apiConstants.mode.busy:
    default:
      break;
  }
};
