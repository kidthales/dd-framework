/**
 * Message plugin API session types module.
 *
 * @module    @dd/message/session/types
 * @author    kidthales <kidthales@agogpixel.com>
 * @copyright 2023 kidthales
 * @license   {@link https://github.com/kidthales/dd-framework/blob/main/LICENSE.txt | MIT License}
 */
import type { Printer } from '@dd/core/ui/text/printer/types';
import type { Panel } from '@dd/core/ui/panel/types';
import type { CCNode } from '@pgmmv/cc/node';

export interface Session {
  printer: Printer;
  printingSfxTimeAccumulator: number;
  indicator?: CCNode;
  panel?: Panel & CCNode;
  done?: boolean;
}
