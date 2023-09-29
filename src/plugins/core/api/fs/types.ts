/**
 * Core plugin API filesystem types module.
 *
 * @module    @dd/core/fs/types
 * @author    kidthales <kidthales@agogpixel.com>
 * @copyright 2023 kidthales
 * @license   {@link https://github.com/kidthales/dd-framework/blob/main/LICENSE.txt | MIT License}
 */
import type { JsonValue } from 'type-fest';

/**
 *
 */
export type FileOperationCallback = (success: boolean, data?: JsonValue) => void;
