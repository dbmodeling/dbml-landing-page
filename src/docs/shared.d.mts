import type { Options } from "minisearch";

export const SEARCH_FIELDS: string[];
export const SEARCH_STORE_FIELDS: string[];
export const SEARCH_BOOST: Record<string, number>;
export const SEARCH_FUZZY: number;
export const SEARCH_MAX_RESULTS: number;
export const SEARCH_OPTIONS: Options;
export const SEARCH_KIND: {
  readonly page: "page";
  readonly action: "action";
  readonly cli: "cli";
  readonly vscode: "vscode";
};
export const ANCHOR_PREFIX: Record<string, string>;
export function normalizeTerm(term: string): string;
export function slugifyAnchor(text: string): string;
export function actionAnchor(id: string): string;
export function cliAnchor(path: string[], name: string): string;
export function vscodeCommandAnchor(id: string): string;
export function vscodeSettingAnchor(key: string): string;
