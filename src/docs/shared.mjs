// Código compartilhado entre o runtime do site e os scripts de build (`scripts/sync-docs.mjs`).
// Fica em `.mjs` puro para o Node importar sem transpilar. Os tipos estão em `shared.d.mts`.

/** Campos indexados pela busca local. */
export const SEARCH_FIELDS = ["title", "heading", "text"];

/** Campos devolvidos junto de cada resultado (sem reler o conteúdo). */
export const SEARCH_STORE_FIELDS = ["title", "heading", "url", "kind", "lang", "secao"];

/** Peso de cada campo e tolerância a erro de digitação. */
export const SEARCH_BOOST = { title: 3, heading: 2, text: 1 };
export const SEARCH_FUZZY = 0.2;
export const SEARCH_MAX_RESULTS = 12;

/** Remove acentos e caixa para que "foco" case com "Foco" e "relacoes" com "relações". */
export function normalizeTerm(term) {
  return term.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

export const SEARCH_OPTIONS = {
  fields: SEARCH_FIELDS,
  storeFields: SEARCH_STORE_FIELDS,
  processTerm: normalizeTerm,
  searchOptions: {
    boost: SEARCH_BOOST,
    fuzzy: SEARCH_FUZZY,
    prefix: true,
    combineWith: "AND",
    processTerm: normalizeTerm,
  },
};

/** Tipos de entrada do índice. */
export const SEARCH_KIND = {
  page: "page",
  action: "action",
  cli: "cli",
  vscode: "vscode",
};

const NON_ALNUM = /[^a-z0-9]+/g;
const EDGE_DASH = /^-+|-+$/g;

/** Slug estável para âncoras de linhas de tabela. */
export function slugifyAnchor(text) {
  return normalizeTerm(text).replace(NON_ALNUM, "-").replace(EDGE_DASH, "");
}

export const ANCHOR_PREFIX = {
  action: "acao",
  cli: "cli",
  cliGlobal: "global",
  vscodeCommand: "vscode-cmd",
  vscodeSetting: "vscode-cfg",
};

export const actionAnchor = (id) => `${ANCHOR_PREFIX.action}-${slugifyAnchor(id)}`;

/** `path` = subcomandos até o item (vazio para as opções globais). */
export const cliAnchor = (path, name) =>
  [ANCHOR_PREFIX.cli, ...(path.length ? path : [ANCHOR_PREFIX.cliGlobal]), name]
    .map((part) => slugifyAnchor(part))
    .filter(Boolean)
    .join("-");

export const vscodeCommandAnchor = (id) => `${ANCHOR_PREFIX.vscodeCommand}-${slugifyAnchor(id)}`;
export const vscodeSettingAnchor = (key) => `${ANCHOR_PREFIX.vscodeSetting}-${slugifyAnchor(key)}`;
