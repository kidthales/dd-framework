import type { AgtkParameterType } from '@pgmmv/agtk/plugins/plugin/parameter';
import type { Opts } from 'minimist';

export interface Config {
  argv: Opts;
  locale: {
    default: string;
    configs: Record<
      string,
      {
        outSuffix: string;
        data: {
          readmeTitle: string;
          author: string;
          help: string;
          parameters: string;
          actionCommands: string;
          linkConditions: string;
          type: string;
          default: string;
          decimals: string;
          minimum: string;
          maximum: string;
          references: string;
          withNewButton: string;
          true: string;
          false: string;
          na: string;
        };
      }
    >;
  };
}

export interface ReadmeData {
  locale: Record<string, string>;
  plugins: { name: string; href: string }[];
}

export interface PluginPageData {
  name: string;
  description: string;
  author: string;
  help: string;
  parameters: (Parameter | ParameterSection)[];
  actionCommands: CommandOrCondition[];
  linkConditions: CommandOrCondition[];
}

export interface Parameter {
  name: string;
  type: AgtkParameterType;
  attributes?: Record<string, string | number>;
  defaultValue?: string | number;
}

export interface ParameterSection {
  name?: string;
  description: string[];
  parameters: Parameter[];
}

export type ParameterUnion = Parameter | ParameterSection;

export type Parameters = ParameterUnion[];

export interface CommandOrCondition {
  name: string;
  description: string;
  parameters: (Parameter | ParameterSection)[];
}
