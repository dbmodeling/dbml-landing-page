// Constantes da aba Docs: rotas, chaves de armazenamento, limites e dimensões.
// Nada de string/número mágico espalhado pela lógica: tudo que é configurável mora aqui.

/** Idiomas da documentação. */
export const DOC_LANGS = ["pt-BR", "en"] as const;
export type DocLang = (typeof DOC_LANGS)[number];
export const DEFAULT_LANG: DocLang = "pt-BR";

/** Modalidades do produto. */
export const MODALITIES = ["desktop", "web", "vscode"] as const;
export type Modality = (typeof MODALITIES)[number];
export const DEFAULT_MODALITY: Modality = "desktop";

/** Sistemas operacionais detectados para `<Abas detectarSo>` e `<Atalho>`. */
export const OPERATING_SYSTEMS = ["windows", "macos", "linux"] as const;
export type OperatingSystem = (typeof OPERATING_SYSTEMS)[number];
export const DEFAULT_OS: OperatingSystem = "linux";

/** Seções da barra lateral, na ordem de exibição. */
export const SECTIONS = ["comecar", "guias", "referencia", "ajuda"] as const;
export type Section = (typeof SECTIONS)[number];

/** Rotas. */
export const ROUTE_HOME = "/";
export const ROUTE_DOCS = "/docs";
export const DEFAULT_PAGE = { secao: "comecar", slug: "o-que-e" } as const;
export const NEWS_PAGE = { secao: "ajuda", slug: "novidades" } as const;

/** Armazenamento do navegador. */
export const STORAGE_KEY_MODALITY = "dbm-docs-modality";

/** Atalhos de teclado da doc. */
export const SEARCH_SHORTCUT_KEY = "/";
export const SEARCH_PALETTE_KEY = "k";

/** Transições e temporizações em ms. */
export const COPY_FEEDBACK_MS = 1800;
export const HIGHLIGHT_ANCHOR_MS = 2400;
/** Quanto esperar por uma âncora cujo conteúdo carrega depois (tabelas de referência). */
export const HASH_WAIT_MS = 4000;
export const SEARCH_DEBOUNCE_MS = 80;

/** Margem do `IntersectionObserver` do exemplo vivo: começa a carregar um pouco antes de aparecer. */
export const EXAMPLE_LOAD_MARGIN = "200px";

/** Dimensões do exemplo vivo. */
export const EXAMPLE_DEFAULT_HEIGHT_PX = 360;

/** Abas do `<ExemploDbml>`. */
export const EXAMPLE_TABS = ["codigo", "diagrama", "sql", "mermaid"] as const;
export type ExampleTab = (typeof EXAMPLE_TABS)[number];

/** Dialetos de `export_sql_ddl`. */
export const SQL_DIALECTS = ["postgres", "mysql", "sqlite", "sqlserver", "oracle"] as const;
export type SqlDialect = (typeof SQL_DIALECTS)[number];
export const DEFAULT_DIALECT: SqlDialect = "postgres";
export const SQL_DIALECT_LABELS: Record<SqlDialect, string> = {
  postgres: "PostgreSQL",
  mysql: "MySQL",
  sqlite: "SQLite",
  sqlserver: "SQL Server",
  oracle: "Oracle",
};

/** Política da roda do mouse no diagrama de leitura. */
export const WHEEL_ZOOM_MODE = "modifier" as const;

/**
 * "Abrir no editor". O `dbml run` gera um token por execução e só o aceita em `?token=` na URL; por isso o
 * visitante cola a URL que o terminal mostra e o site a guarda neste navegador. A URL da demo pública entra
 * em `EDITOR_DEMO_URL` quando o SSRF de `/api/introspect` for corrigido.
 */
export const EDITOR_LOCAL_URL = "http://127.0.0.1:3000/";
export const EDITOR_DEMO_URL: string | null = null;
export const STORAGE_KEY_EDITOR_URL = "dbm-docs-editor-url";
export const EDITOR_TOKEN_PARAM = "token";
export const EDITOR_URL_PROTOCOLS = ["http:", "https:"] as const;
export const EDITOR_URL_PLACEHOLDER = `${EDITOR_LOCAL_URL}?${EDITOR_TOKEN_PARAM}=…`;


/** Diretórios/arquivos do conteúdo sincronizado (globs do Vite exigem literais; ver `content.ts`). */
export const CAPTURE_VARIANT = { light: "claro", dark: "escuro" } as const;
export const CAPTURE_MIME_VIDEO = "webm";

/** Âncoras. */
export const ANCHOR_HIGHLIGHT_CLASS = "docs-anchor-flash";
export const ANCHOR_ROW_ATTR = "data-anchor-row";

/** Sidebar e layout. */
export const SIDEBAR_WIDTH_CLASS = "lg:w-60";
export const TOC_SCROLL_OFFSET_PX = 80;

/** Busca. */
export const SEARCH_MIN_QUERY_LENGTH = 2;
export const SEARCH_MAX_VISIBLE = 10;
/** Seções da mesma página mostradas por busca (evita uma página ocupar a lista inteira). */
export const SEARCH_MAX_PER_PAGE = 2;

/** Tipos de `<Aviso>`. */
export const NOTICE_KINDS = ["info", "dica", "cuidado", "perigo"] as const;
export type NoticeKind = (typeof NOTICE_KINDS)[number];

/** Símbolos de modificador no macOS. */
export const MAC_KEY_SYMBOLS: Record<string, string> = {
  Ctrl: "⌘",
  Alt: "⌥",
  Shift: "⇧",
};
export const KEY_SEPARATOR = "+";

/** Quantidade de resultados do changelog (Novidades): todos por padrão. */
export const CHANGELOG_KINDS = ["added", "improved", "fixed"] as const;
export type ChangelogKind = (typeof CHANGELOG_KINDS)[number];
