/**
 * Transform messages module.
 *
 * @module dd/message/print-messages/transform-messages
 * @internal
 */

/**
 * @param {import("./types").MessageUnion[]} messages
 * @returns {import("@dd/core/ui/text/printer/types").PageConfig[]}
 */
module.exports = function (messages) {
  return messages
    .map(function (value) {
      var text = dd.core.ui.text.getTextData(typeof value === 'number' ? value : value.id),
        /** @type {Partial<import('@dd/core/ui/text/printer/types').TextAlignmentConfig>|undefined} */
        align,
        /** @type {number|undefined} */
        printSpeed,
        /** @type {number|undefined} */
        clearSpeed,
        /** @type {[number, number, number]|undefined} */
        color,
        /** @type {number|undefined} */
        opacity;

      if (!text) {
        return;
      }

      if (typeof value !== 'number') {
        align = value.align || undefined;
        printSpeed = value.printSpeed || undefined;
        clearSpeed = value.clearSpeed || undefined;
        opacity = value.opacity !== undefined ? value.opacity : undefined;

        if (
          Array.isArray(value.color) &&
          value.color.length >= 3 &&
          (value.color[0] !== 255 || value.color[1] !== 255 || value.color[2] !== 255)
        ) {
          color = cc.color(value.color[0], value.color[0], value.color[0]);
        }
      }

      return {
        text: text,
        align: align,
        printSpeed: printSpeed,
        clearSpeed: clearSpeed,
        color: color,
        opacity: opacity
      };
    })
    .filter(Boolean);
};
