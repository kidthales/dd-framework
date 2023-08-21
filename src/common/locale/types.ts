/**
 * Maps locale code (en, en_US, etc...) to localized string.
 */
export type LocalizedStringByLocaleCode = Record<string, string>;

/**
 * Maps locale key to locale code to localized string.
 */
export type LocalizedStringByLocaleCodeByLocaleKey = Record<string, LocalizedStringByLocaleCode>;
