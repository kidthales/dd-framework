import type { Printer } from '@dd/core/api/text/printer/types';
import type { Panel } from '@dd/core/api/ui/panel/types';
import type { CCEventListener } from '@pgmmv/cc/event-listener';
import type { CCNode } from '@pgmmv/cc/node';

export interface Session {
  done?: boolean;
  printer: Printer;
  indicator?: CCNode;
  printingListener?: CCEventListener;
  printingSfxTimeAccumulator: number;
  clearFinishListener: CCEventListener;
  panel?: Panel;
  openFinishEventListener?: CCEventListener;
  closeFinishEventListener?: CCEventListener;
}
