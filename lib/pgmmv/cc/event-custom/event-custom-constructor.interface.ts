/**
 * Cocos event custom constructor interface module.
 *
 * @packageDocumentation
 */
import type { CCEventConstructor } from '../event';

import type { CCEventCustom } from './event-custom.interface';

/**
 * Cocos event custom constructor interface.
 *
 * @constructor
 */
export interface CCEventCustomConstructor<T extends CCEventCustom = CCEventCustom, U extends any[] = [string]>
  extends CCEventConstructor<T, U> {}
