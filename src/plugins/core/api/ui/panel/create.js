/**
 * @module dd/core/ui/panel/create
 */

/**
 *
 * @param {Partial<import("./types").PanelConfigUnion>} config
 * @returns {import("./types").PanelUnion}
 */
module.exports = function (
  /** @type {Partial<import("./types").PanelConfigUnion>} */
  config
) {
  switch (config.renderType) {
    case 'image':
      return new (require('./get-image-constructor')())(config);

    case 'graphics':
    default:
      break;
  }

  return new (require('./get-graphics-constructor')())(config);
};
