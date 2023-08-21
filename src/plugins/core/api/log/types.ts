import type { ActionCommandPayload, LinkConditionPayload } from '@dd/common/plugin/types';

/**
 *
 */
export interface Logger {
  /**
   *
   * @param args
   */
  debug(...args: unknown[]): void;

  /**
   *
   * @param args
   */
  info(...args: unknown[]): void;

  /**
   *
   * @param args
   */
  warn(...args: unknown[]): void;

  /**
   *
   * @param args
   */
  error(...args: unknown[]): void;

  /**
   *
   * @param args
   */
  critical(...args: unknown[]): void;
}

/**
 *
 */
export type LogApi = ((...args: unknown[]) => void) &
  Logger & {
    /**
     *
     */
    level: {
      /**
       *
       */
      debug: 0;

      /**
       *
       */
      info: 1;

      /**
       *
       */
      warn: 2;

      /**
       *
       */
      error: 3;

      /**
       *
       */
      critical: 4;
    };

    /**
     *
     */
    getLogLevel(): number;

    /**
     *
     * @param level
     */
    setLogLevel(level: number): void;

    /**
     *
     */
    getRuntimeLogger(): ((msg: string) => void) | undefined;

    /**
     *
     * @param logger
     */
    setRuntimeLogger(logger: (msg: string) => void): void;

    /**
     *
     */
    getJsonIndentSize(): number;

    /**
     *
     * @param size
     */
    setJsonIndentSize(size: number): void;

    /**
     *
     */
    getJsonStringifyFunctions(): boolean;

    /**
     *
     * @param stringify
     */
    setJsonStringifyFunctions(stringify: boolean): void;

    /**
     *
     */
    getLogLevelNameMap(): Record<number, string>;

    /**
     *
     * @param map
     */
    setLogLevelNameMap(map: Record<number, string>): void;

    /**
     *
     * @param payload
     * @param localeNameKey
     */
    createActionCommandLogger(payload: ActionCommandPayload, localeNameKey: string): Logger;

    /**
     *
     * @param payload
     * @param localeNameKey
     */
    createLinkConditionLogger(payload: LinkConditionPayload, localeNameKey: String): Logger;
  };
