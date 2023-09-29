/**
 * Common plugin module.
 *
 * @module    @dd/common/plugin
 * @author    kidthales <kidthales@agogpixel.com>
 * @copyright 2023 kidthales
 * @license   {@link https://github.com/kidthales/dd-framework/blob/main/LICENSE.txt | MIT License}
 */

/**
 * Exposes methods & properties necessary for basic plugin functionality.
 */
module.exports = {
  /**
   * @see {@link "@dd/common/plugin/create" | @dd/common/plugin/create}
   */
  create: require('./create'),

  /**
   * @see {@link "@dd/common/plugin/params" | @dd/common/plugin/params}
   */
  params: require('./params'),

  /**
   * @see {@link "@dd/common/plugin/data" | @dd/common/plugin/data}
   */
  getData: require('./data').getData
};
