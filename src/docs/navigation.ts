// Estrutura de navegação da documentação: sidebar, anterior/próximo, fallback de idioma e links internos.
// Funções puras (sem Vite nem DOM) para serem testáveis em Node.

import {
  DEFAULT_LANG,
  DOC_LANGS,
  ROUTE_DOCS,
  SECTIONS,
  type DocLang,
  type Modality,
  type Section,
} from "./constants";

export interface PageMeta {
  lang: DocLang;
  secao: Section;
  slug: string;
  titulo: string;
  descricao: string;
  ordem: number;
  modalidades: Modality[];
  /** `true` quando a página usa `<Modalidade>`, `<Atalho>` ou é exclusiva de parte das plataformas. */
  usaModalidade?: boolean;
}

export interface Manifest {
  langs: DocLang[];
  sections: Section[];
  pages: PageMeta[];
}

/** Página da sidebar; `pending` quando só existe em pt-BR e o leitor está em outro idioma. */
export interface NavPage {
  page: PageMeta;
  pending: boolean;
}

export interface NavItem extends NavPage {
  children: NavPage[];
}

export interface NavSection {
  secao: Section;
  items: NavItem[];
}

export interface ResolvedPage {
  page: PageMeta;
  /** Idioma do conteúdo que será exibido (pode ser pt-BR mesmo com `lang` = en). */
  contentLang: DocLang;
  /** `true` quando o conteúdo é o pt-BR por falta da tradução. */
  fallback: boolean;
}

export const isDocLang = (value: string | undefined): value is DocLang =>
  (DOC_LANGS as readonly string[]).includes(value ?? "");

export const isSection = (value: string | undefined): value is Section =>
  (SECTIONS as readonly string[]).includes(value ?? "");

export const pagePath = (lang: DocLang, secao: string, slug: string): string =>
  `${ROUTE_DOCS}/${lang}/${secao}/${slug}`;

/** pt-BR para qualquer variante de português; en para o resto. Sem preferência declarada, o padrão. */
export function detectBrowserLang(languages: readonly string[] | undefined): DocLang {
  const first = languages?.find((tag) => tag.trim() !== "");
  if (!first) return DEFAULT_LANG;
  return first.toLowerCase().startsWith("pt") ? "pt-BR" : "en";
}

const byOrder = (a: PageMeta, b: PageMeta) => a.ordem - b.ordem || a.slug.localeCompare(b.slug);

/** Páginas do idioma, completando com as do pt-BR que ainda não foram traduzidas. */
export function pagesForLang(manifest: Manifest, lang: DocLang): NavPage[] {
  const own = manifest.pages.filter((p) => p.lang === lang);
  const pages: NavPage[] = own.map((page) => ({ page, pending: false }));
  if (lang !== DEFAULT_LANG) {
    const have = new Set(own.map((p) => `${p.secao}/${p.slug}`));
    for (const page of manifest.pages) {
      if (page.lang === DEFAULT_LANG && !have.has(`${page.secao}/${page.slug}`)) pages.push({ page, pending: true });
    }
  }
  return pages;
}

/**
 * Sidebar por seção. Uma página cujo slug começa com `<outra>-` na mesma seção vira filha dela
 * (ex.: `instalacao-windows` sob `instalacao`).
 */
export function buildNav(manifest: Manifest, lang: DocLang): NavSection[] {
  const all = pagesForLang(manifest, lang);
  return SECTIONS.map((secao) => {
    const inSection = all.filter((p) => p.page.secao === secao).sort((a, b) => byOrder(a.page, b.page));
    const slugs = inSection.map((p) => p.page.slug);
    const parentOf = (slug: string) =>
      slugs.filter((other) => other !== slug && slug.startsWith(`${other}-`)).sort((a, b) => b.length - a.length)[0];
    const items: NavItem[] = [];
    for (const nav of inSection) {
      const parent = parentOf(nav.page.slug);
      const host = parent ? items.find((i) => i.page.slug === parent) : undefined;
      if (host) host.children.push(nav);
      else items.push({ ...nav, children: [] });
    }
    return { secao, items };
  }).filter((section) => section.items.length > 0);
}

/** Ordem de leitura: seção, depois `ordem` (a mesma do frontmatter), sem agrupar filhos. */
export function readingOrder(manifest: Manifest, lang: DocLang): NavPage[] {
  const all = pagesForLang(manifest, lang);
  return SECTIONS.flatMap((secao) =>
    all.filter((p) => p.page.secao === secao).sort((a, b) => byOrder(a.page, b.page)),
  );
}

export function resolvePage(manifest: Manifest, lang: DocLang, secao: string, slug: string): ResolvedPage | null {
  const find = (l: DocLang) => manifest.pages.find((p) => p.lang === l && p.secao === secao && p.slug === slug);
  const own = find(lang);
  if (own) return { page: own, contentLang: lang, fallback: false };
  const base = find(DEFAULT_LANG);
  return base ? { page: base, contentLang: DEFAULT_LANG, fallback: lang !== DEFAULT_LANG } : null;
}

export function prevNext(
  manifest: Manifest,
  lang: DocLang,
  secao: string,
  slug: string,
): { prev: NavPage | null; next: NavPage | null } {
  const order = readingOrder(manifest, lang);
  const at = order.findIndex((p) => p.page.secao === secao && p.page.slug === slug);
  if (at < 0) return { prev: null, next: null };
  return { prev: order[at - 1] ?? null, next: order[at + 1] ?? null };
}

const EXTERNAL_OR_ABSOLUTE = /^([a-z][a-z0-9+.-]*:|\/\/)/i;
const SAFE_EXTERNAL = /^(https?:|mailto:|\/\/)/i;
const PLACEHOLDER_ORIGIN = "http://docs.invalid";

export type ResolvedHref =
  | { kind: "external"; href: string }
  | { kind: "anchor"; href: string }
  | { kind: "internal"; href: string };

/**
 * Resolve links do MDX. Relativos (`../guias/exportar`, `atualizacoes#x`) valem contra a URL da página,
 * como o navegador resolve (sem barra final); `/...` e `#...` ficam como estão.
 * Esquemas perigosos (`javascript:`, `data:` etc.) são neutralizados.
 */
export function resolveHref(href: string, currentPath: string): ResolvedHref {
  const trimmed = href.trim();
  if (trimmed.startsWith("#")) return { kind: "anchor", href: trimmed };
  if (EXTERNAL_OR_ABSOLUTE.test(trimmed)) {
    return SAFE_EXTERNAL.test(trimmed) ? { kind: "external", href: trimmed } : { kind: "anchor", href: "#" };
  }
  const url = new URL(trimmed, `${PLACEHOLDER_ORIGIN}${currentPath}`);
  return { kind: "internal", href: `${url.pathname}${url.search}${url.hash}` };
}

/** Mesma página no outro idioma (o `contentLang` da URL de destino é resolvido ao abrir). */
export function switchLangPath(currentPath: string, target: DocLang): string {
  const parts = currentPath.split("/");
  const at = parts.findIndex((part, i) => i > 0 && parts[i - 1] === ROUTE_DOCS.slice(1) && isDocLang(part));
  if (at < 0) return currentPath;
  parts[at] = target;
  return parts.join("/");
}
