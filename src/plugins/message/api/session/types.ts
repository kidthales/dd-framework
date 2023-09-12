import type { Printer } from '@dd/core/text/printer/types';
import type { Panel } from '@dd/core/ui/panel/types';
import type { CCEventListener } from '@pgmmv/cc/event-listener';
import type { CCNode } from '@pgmmv/cc/node';

export interface Session {
  printer: Printer;
  printingSfxTimeAccumulator: number;
  indicator?: CCNode;
  panel?: Panel;
  done?: boolean;
}
