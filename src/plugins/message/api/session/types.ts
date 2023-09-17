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
