// Acesso ao conteúdo sincronizado em `src/content/docs/` (ver `scripts/sync-docs.mjs`).
// Os globs do Vite precisam de literais; se o conteúdo ainda não foi sincronizado eles voltam vazios
// e o site continua construindo (a doc mostra "conteúdo indisponível").

import type { ComponentType } from "react";
import type { MDXProps } from "mdx/types";
import { DEFAULT_LANG, type DocLang } from "./constants";
import type { Manifest } from "./navigation";
import type { ActionEntry, ActionsFile } from "./shortcuts";

export type MdxModule = { default: ComponentType<MDXProps> };

const EMPTY_MANIFEST: Manifest = { langs: [], sections: [], pages: [] };

const manifestModules = import.meta.glob<Manifest>("/src/content/docs/manifest.json", { eager: true, import: "default" });
const pageModules = import.meta.glob<MdxModule>("/src/content/docs/*/*/*.mdx");
const exampleModules = import.meta.glob<string>("/src/content/docs/exemplos/*.dbml", { query: "?raw", import: "default" });
const actionModules = import.meta.glob<ActionsFile>("/src/content/docs/gerado/acoes.json", { eager: true, import: "default" });
const cliModules = import.meta.glob<CliFile>("/src/content/docs/gerado/cli.json", { import: "default" });
const vscodeModules = import.meta.glob<VscodeFile>("/src/content/docs/gerado/vscode.json", { import: "default" });
const cliHelpModules = import.meta.glob<Record<string, string>>("/src/content/docs/pt-BR/_cli-ajuda.json", { import: "default" });
const guideModules = import.meta.glob<ProductGuide>("/src/content/docs/product-guide.json", { import: "default" });
const sceneModules = import.meta.glob<ScenesFile>("/src/content/docs/capturas/cenas.json", { eager: true, import: "default" });
const searchIndexModules = import.meta.glob<string>("/src/content/docs/search-index.json", { query: "?raw", import: "default" });
const captureModules = import.meta.glob<string>("/src/docs/captures/{gerado,manual}/**/*.{png,webm,webp,jpg,jpeg}", {
  eager: true,
  query: "?url",
  import: "default",
});

const first = <T,>(modules: Record<string, T>): T | undefined => Object.values(modules)[0];

export const manifest: Manifest = first(manifestModules) ?? EMPTY_MANIFEST;
export const hasContent = manifest.pages.length > 0;
export const actions: ActionEntry[] = first(actionModules)?.acoes ?? [];

/** Carrega o MDX da página, ou `null` se ela não existe (sem lançar). */
export function loadPage(lang: DocLang, secao: string, slug: string): (() => Promise<MdxModule>) | null {
  return pageModules[`/src/content/docs/${lang}/${secao}/${slug}.mdx`] ?? null;
}

export function loadExample(name: string): Promise<string> | null {
  const loader = exampleModules[`/src/content/docs/exemplos/${name}.dbml`];
  return loader ? loader() : null;
}

export const loadCli = () => first(cliModules)?.() ?? Promise.resolve(null);
export const loadVscode = () => first(vscodeModules)?.() ?? Promise.resolve(null);
export const loadCliHelp = () => first(cliHelpModules)?.() ?? Promise.resolve({} as Record<string, string>);
export const loadProductGuide = () => first(guideModules)?.() ?? Promise.resolve(null);
export const loadSearchIndex = () => first(searchIndexModules)?.() ?? Promise.resolve(null);

// ---------------------------------------------------------------------------
// Capturas
// ---------------------------------------------------------------------------

export interface Scene {
  id: string;
  modalidade: string;
  manual?: boolean;
  animacao?: boolean;
}
export interface ScenesFile {
  cenas: Scene[];
}

export function findScene(id: string): Scene | undefined {
  return first(sceneModules)?.cenas.find((scene) => scene.id === id);
}

/**
 * URL da captura em `capturas/gerado/` ou `capturas/manual/`.
 * Para idiomas fora do padrão (ex.: `en`), tenta `<dir>/<lang>/<id>-<variante>.<ext>` e
 * `<dir>/<id>-<lang>-<variante>.<ext>`, caindo no arquivo padrão (`pt-BR`) quando ainda não existe.
 */
export function captureUrl(
  scene: Scene | undefined,
  id: string,
  variant: string,
  ext: string,
  lang: DocLang = DEFAULT_LANG,
): string | undefined {
  const dir = scene?.manual ? "manual" : "gerado";
  const base = `/src/docs/captures/${dir}`;
  if (lang !== DEFAULT_LANG) {
    const localized =
      captureModules[`${base}/${lang}/${id}-${variant}.${ext}`] ??
      captureModules[`${base}/${id}-${lang}-${variant}.${ext}`];
    if (localized) return localized;
  }
  return captureModules[`${base}/${id}-${variant}.${ext}`];
}

// ---------------------------------------------------------------------------
// Tipos dos JSON gerados
// ---------------------------------------------------------------------------

export interface CliValue {
  nome: string;
  aliases?: string[];
  ajuda: string;
}
export interface CliOption {
  nome: string;
  curto: string | null;
  valor: string | null;
  padrao: string | null;
  env: string | null;
  aliases?: string[];
  ajuda: string;
  obrigatorio?: boolean;
  valores?: CliValue[];
}
export interface CliPositional {
  nome: string;
  obrigatorio: boolean;
  ajuda: string;
}
export interface CliCommand {
  nome: string;
  aliases: string[];
  ajuda: string;
  posicionais: CliPositional[];
  opcoes: CliOption[];
  subcomandos: CliCommand[];
}
export interface CliFile {
  binario: string;
  versao: string;
  ajuda: string;
  posicionais: CliPositional[];
  global: CliOption[];
  subcomandos: CliCommand[];
  codigos_saida: { comando: string; codigo: number; significado: string }[];
}

export interface VscodeFile {
  versao: string;
  comandos: { id: string; titulo: string; categoria: string }[];
  configuracoes: {
    chave: string;
    tipo: string;
    padrao: string | null;
    escopo: string;
    descricao: string;
    valores?: { valor: string; descricao: string }[];
  }[];
  editores: { id: string; nome: string; padroes: string[]; prioridade: string }[];
  workspace_nao_confiavel?: string;
  workspace_virtual?: string;
}

export interface GuideHighlight {
  kind: string;
  title: Record<string, string>;
  detail: Record<string, string>;
}
export interface GuideRelease {
  version: string;
  date: string;
  highlights: GuideHighlight[];
}
export interface ProductGuide {
  releases: GuideRelease[];
}

/** O `product-guide.json` usa `pt`/`en` (não `pt-BR`) como chave de idioma. */
export const guideLangKey = (lang: DocLang): string => (lang === DEFAULT_LANG ? "pt" : lang);
