import type { JsonValue } from 'type-fest';
import type { Agtk, cc, jsb } from './lib/pgmmv';
import type CoreApi from './src/plugins/core/api';
import type MessageApi from './src/plugins/message/api';
import type StaticStorageApi from './src/plugins/static-storage/api';

/**
 * Global namespace.
 */
declare global {
  /**
   * Agtk namespace.
   */
  const Agtk: Agtk;

  /**
   * Cocos namespace.
   */
  const cc: cc;

  /**
   * Cocos JSB namespace.
   */
  const jsb: jsb;

  /**
   * Framework namespace.
   */
  const dd: {
    core: typeof CoreApi;
    data: JsonValue;
    message: typeof MessageApi;
    staticStorage: typeof StaticStorageApi;
  };
}
