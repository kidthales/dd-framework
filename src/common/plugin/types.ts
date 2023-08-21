import type { JsonObject, JsonValue } from 'type-fest';
import type { AgtkCommandBehaviorValue } from '@pgmmv/agtk/constants/action-commands/command-behavior';
import type { AgtkParameter } from '@pgmmv/agtk/plugins/plugin/parameter';
import type { LocalizedStringByLocaleCodeByLocaleKey } from '@dd/common/locale/types';

/**
 * Configuration.
 */
export interface Config {
  /**
   * Dependencies.
   */
  dependencies?: string[];

  /**
   * Parameters configuration.
   */
  parameters?: ParametersConfig;

  /**
   * Action commands configuration.
   */
  actionCommands?: ActionCommandsConfig;

  /**
   * Link conditions configuration.
   */
  linkConditions?: LinkConditionsConfig;

  /**
   * API.
   */
  api?: Record<string, unknown>;

  /**
   * Localization data.
   */
  locale?: LocalizedStringByLocaleCodeByLocaleKey;
}

/**
 * Internal API.
 *
 * @template T Internal data type.
 */
export interface Internal<T extends JsonObject = JsonObject> {
  /**
   * Internal data.
   */
  data: T;

  /**
   * On plugin initialized handler.
   *
   * @param data Internal data.
   * @returns {void}
   */
  onInitialize?: (data?: T) => void;

  /**
   * On plugin finalized handler.
   *
   * @returns {void}
   */
  onFinalize?: () => void;

  /**
   * On plugin set param value handler.
   *
   * @param paramValue
   * @returns {void}
   */
  onSetParamValue?: (paramValue: Record<number, JsonValue>) => void;
}

/**
 * Parameters configuration.
 */
export interface ParametersConfig {
  /**
   * Map human readable names to parameter IDs.
   */
  ids: Record<string, number>;

  /**
   * Parameters in order of appearance.
   */
  entries: AgtkParameter[];
}

/**
 * Action commands configuration.
 */
export type ActionCommandsConfig = ActionCommandConfig[];

/**
 * Link conditions configuration.
 */
export type LinkConditionsConfig = LinkConditionConfig[];

/**
 * Action command configuration.
 */
export type ActionCommandConfig = CommonActionCommandOrLinkConditionConfig<ActionCommandPayload>;

/**
 * Link condition configuration.
 */
export type LinkConditionConfig = CommonActionCommandOrLinkConditionConfig<LinkConditionPayload>;

/**
 * Common action command or link condition configuration.
 */
interface CommonActionCommandOrLinkConditionConfig<T extends CommonActionCommandOrLinkConditionPayload> {
  /**
   * Name.
   */
  name: string;

  /**
   * Description.
   */
  description: string;

  /**
   * Parameters.
   */
  parameters?: ParametersConfig;

  /**
   * Handler.
   *
   * @param payload
   * @returns Command behavior result when action command; boolean result when link condition.
   */
  handler?: (
    payload: T
  ) => T extends ActionCommandPayload ? AgtkCommandBehaviorValue : T extends LinkConditionPayload ? boolean : never;
}

/**
 * Action command payload.
 */
export interface ActionCommandPayload extends CommonActionCommandOrLinkConditionPayload {
  /**
   * Action ID.
   */
  actionId: number;

  /**
   * Command ID.
   */
  commandId: number;

  /**
   * Common action status.
   */
  commonActionStatus: 0 | 1;

  /**
   * Current scene ID.
   */
  sceneId: number;
}

/**
 * Link condition payload.
 */
export interface LinkConditionPayload extends CommonActionCommandOrLinkConditionPayload {
  /**
   * Action link ID.
   */
  actionLinkId: number;

  /**
   * Common action status.
   */
  commonActionStatus: -1 | 0 | 1;
}

/**
 * Common action command or link condition payload.
 */
interface CommonActionCommandOrLinkConditionPayload {
  /**
   * Index.
   */
  index: number;

  /**
   * Map parameter ID to value.
   */
  param: Record<number, JsonValue>;

  /**
   * Object ID.
   */
  objectId: number;

  /**
   * Object instance ID.
   */
  instanceId: number;
}
