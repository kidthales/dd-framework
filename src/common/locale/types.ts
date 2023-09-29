/**
 * Common locale types module.
 *
 * @module    @dd/common/locale/types
 * @author    kidthales <kidthales@agogpixel.com>
 * @copyright 2023 kidthales
 * @license   {@link https://github.com/kidthales/dd-framework/blob/main/LICENSE.txt | MIT License}
 */

/**
 * Maps locale code (en, en_US, etc...) to localized string.
 */
export type LocalizedStringByLocaleCode = Record<string, string>;

/**
 * Maps locale key to locale code to localized string.
 */
export type LocalizedStringByLocaleCodeByLocaleKey = Record<string, LocalizedStringByLocaleCode>;
