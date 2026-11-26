/**
 * Constantes compartilhadas do canvas-web (sem strings/números mágicos em TS ou HTML).
 */
export declare const APP_ROOT_ID = "app";
export declare const LOCAL_SESSION_PREFIX = "dbmodeling.session:";
export declare const MAX_LOCAL_SESSIONS = 50;
export declare const MAX_WASM_RECOVERY_ATTEMPTS = 3;
export declare const TLS_MODE: {
    readonly AUTO: "auto";
    readonly VERIFY: "verify";
    readonly REQUIRE: "require";
    readonly DISABLE: "disable";
};
export declare const TLS_ROW_ID = "tls";
export declare const TLS_TOGGLE_ID = "db-tls-toggle";
export declare const TLS_VERIFY_ID = "db-tls-verify";
export declare const TLS_VERIFY_WRAP_ID = "db-tls-verify-wrap";
export declare const TLS_FIELD_LABEL = "SSL / TLS";
/** Linhas (rótulo + controle) que só valem para bancos de rede; Host+Porta e Usuário+Senha dividem uma linha. */
export declare const CONNECT_NETWORK_ROW_IDS: readonly ["host", "database", "user", "schemas", "tls"];
/** Banco ainda sem introspector: aparece desabilitado no dropdown. */
export declare const ENGINE_COMING_SOON = "oracle";
export declare const ENGINE_COMING_SOON_LABEL = "Oracle";
/** Marcador que substitui a senha na connection string exibida (mesma convenção de `mask_url`). */
export declare const PASSWORD_MASK = "***";
/** Espera após a última tecla no campo Connection string antes de reinterpretá-la. */
export declare const URL_PARSE_DEBOUNCE_MS = 150;
/** O texto colado só chega ao campo depois do evento `paste`; esta espera deixa o navegador inseri-lo. */
export declare const URL_PASTE_SETTLE_MS = 0;
/** Tempo em que o botão Copiar mostra "Copiado". */
export declare const COPY_FEEDBACK_MS = 1600;
/** Quem editou por último: decide o sentido da sincronia e evita laço entre campos e string. */
export declare const EDIT_ORIGIN: {
    readonly FIELD: "field";
    readonly STRING: "string";
};
export declare const CONNECT_URL_ERROR: {
    readonly EMPTY: "empty";
    readonly UNKNOWN_SCHEME: "unknown_scheme";
    readonly UNSUPPORTED_ENGINE: "unsupported_engine";
    readonly MALFORMED: "malformed";
    readonly MISSING_HOST: "missing_host";
    readonly INVALID_PORT: "invalid_port";
};
/** Esquema escrito na connection string montada para cada banco (SQLite usa o caminho puro). */
export declare const ENGINE_SCHEME: {
    readonly postgres: "postgres";
    readonly mysql: "mysql";
    readonly sqlserver: "sqlserver";
};
/**
 * Query de TLS por banco e modo, igual a `ConnectionParams::tls_query` (crates/db-introspect).
 * Modo `auto` não escreve nada, salvo o SQL Server com "confiar no certificado".
 */
export declare const TLS_QUERY: {
    readonly postgres: {
        readonly verify: "sslmode=verify-full";
        readonly require: "sslmode=require";
        readonly disable: "sslmode=disable";
    };
    readonly mysql: {
        readonly verify: "ssl-mode=VERIFY_IDENTITY";
        readonly require: "ssl-mode=REQUIRED";
        readonly disable: "ssl-mode=DISABLED";
    };
    readonly sqlserver: {
        readonly verify: "encrypt=true";
        readonly require: "encrypt=true&trustServerCertificate=true";
        readonly disable: "encrypt=false";
    };
};
export declare const SQLSERVER_TRUST_QUERY = "trustServerCertificate=true";
/** IDs e atributos dos controles novos do diálogo "Conectar ao banco". */
export declare const CONNECT_DIALOG: {
    readonly ENGINE_TRIGGER_ID: "db-engine";
    readonly ENGINE_LABEL_ID: "db-engine-label";
    readonly ENGINE_VALUE_ID: "db-engine-value";
    readonly URL_COPY_LABEL_ID: "db-url-copy-label";
    readonly ENGINE_LIST_ID: "db-engine-list";
    readonly ENGINE_OPTION_ID_PREFIX: "db-engine-opt-";
    readonly URL_ID: "db-url";
    readonly URL_ERROR_ID: "db-url-error";
    readonly URL_COPY_ID: "db-url-copy";
    readonly PASSWORD_ID: "db-password";
    readonly PASSWORD_TOGGLE_ID: "db-password-toggle";
    readonly ERROR_EXTRA_ID: "db-error-extra";
    readonly ERROR_DETAILS_TOGGLE_ID: "db-error-details-toggle";
    readonly ERROR_DETAILS_ID: "db-error-details";
    readonly USE_TLS_REQUIRE_ID: "db-use-tls-require";
    readonly ROW_URL: "url";
    readonly ROW_ENGINE: "engine";
};
export declare const TRANSPORT_EVENT: {
    readonly INIT: "init";
    readonly UPDATE: "update";
    readonly DELTA: "delta";
    readonly RESULT: "result";
    readonly PATCH_REJECTED: "patch_rejected";
    readonly EXTERNAL_CHANGE: "external_change";
    readonly WORKSPACE_FILES: "workspace_files";
    readonly GIT_BASE_RESULT: "git_base_result";
};
export declare const TRANSPORT_COMMAND: {
    readonly APPLY_PATCH: "apply_patch";
    readonly SAVE_DOCUMENT: "save_document";
    readonly SAVE_LAYOUT: "save_layout";
    readonly SAVE_GUIDE_STATE: "save_guide_state";
    readonly GIT_BASE: "git_base";
};
/** Códigos de erro de `git_base_result` (CLI `dbml run` e extensão VS Code usam os mesmos). */
export declare const GIT_BASE_ERROR: {
    readonly GIT_UNAVAILABLE: "git_unavailable";
    readonly NOT_A_REPO: "not_a_repo";
    readonly NO_COMMITS: "no_commits";
    readonly UNTRACKED: "untracked";
    readonly NOT_UTF8: "not_utf8";
    readonly OTHER: "other";
};
/** Erros do modo Comparar além dos de `git_base_result`. */
export declare const DIFF_ERROR: {
    readonly BASE_INVALID: "base_invalid";
    readonly HEAD_INVALID: "head_invalid";
    readonly UNSUPPORTED: "unsupported";
};
/** Modo Comparar: textos que não são traduzidos (símbolos, ids de DOM e atributos). */
export declare const DIFF_PANE_ID = "diff";
export declare const DIFF_ACT: {
    readonly FOCUS: "diff-focus";
    readonly RETRY: "diff-retry";
    readonly EXIT: "ToggleDiff";
};
/** Cor (variável CSS do tema) por status: verde = adicionado, âmbar = modificado, vermelho = removido. */
export declare const DIFF_STATUS_COLOR_VAR: {
    readonly added: "var(--ok)";
    readonly modified: "var(--warning)";
    readonly removed: "var(--danger)";
};
/** Opacidade (0-1) dos cartões fantasma de itens removidos. */
export declare const DIFF_GHOST_OPACITY = 0.55;
/** Espessura (px de mundo) das arestas adicionadas/modificadas. */
export declare const DIFF_EDGE_WIDTH = 2.2;
/** Traço tracejado das arestas removidas (`stroke-dasharray`). */
export declare const DIFF_GHOST_DASH = "6 4";
/** Traço tracejado (`stroke-dasharray`, px do minimapa) do contorno dos cartões fantasma no minimapa. */
export declare const MINIMAP_GHOST_DASH = "3 2";
/** Espessura (px de mundo) da aresta removida. */
export declare const DIFF_GHOST_EDGE_WIDTH = 1.6;
/** Largura (px) e altura estimada de um cartão de enum (espelha `.card.enum-card` no CSS). */
export declare const ENUM_CARD_W = 220;
export declare const ENUM_CARD_HEAD_H = 40;
export declare const ENUM_CARD_ROW_H = 26;
export declare const ENUM_CARD_PAD_H = 12;
/** Zoom mínimo ao focar um item do resumo (não afasta a vista se já estiver perto). */
export declare const DIFF_FOCUS_MIN_ZOOM = 0.85;
/** Folga (px de mundo) ao enquadrar o item focado. */
export declare const DIFF_FOCUS_PAD = 40;
export declare const GUIDE_STORAGE_KEY: {
    readonly ONBOARDING_DONE: "dbmodeling.onboardingDone";
    readonly LAST_SEEN_VERSION: "dbmodeling.lastSeenVersion";
};
export declare const TOUR_GEOM: {
    readonly HOLE_PAD_PX: 6;
    readonly HOLE_MIN_POS_PX: 2;
    readonly CARD_GAP_PX: 14;
    readonly CARD_WIDTH_PX: 320;
    readonly CARD_HEIGHT_EST_PX: 180;
    readonly VIEWPORT_MARGIN_PX: 12;
    readonly ARROW_MIN_OFFSET_PX: 20;
    readonly FALLBACK_VIEWPORT_W_PX: 1024;
    readonly FALLBACK_VIEWPORT_H_PX: 720;
};
export declare const TOUR_ACTION: {
    readonly SKIP: "skip";
    readonly PREV: "prev";
    readonly NEXT: "next";
};
export declare const TRANSPORT_ERROR: {
    readonly CONNECTION_CLOSED: "Connection closed";
    readonly OFFLINE_CONFLICT: "Document changed while offline; reconcile or export your changes";
};
export declare const JUNCTION_INPUT_ID = "insp-junction-name";
export declare const JUNCTION_ACTION: {
    readonly START: "start-junction";
    readonly CONFIRM: "confirm-junction";
    readonly CANCEL: "cancel-junction";
};
/**
 * Fragmento `#dbml=<deflate-raw + base64url>`: a documentação abre um exemplo no editor Web sem
 * enviá-lo ao servidor (o fragmento não sai do navegador).
 */
export declare const DBML_FRAGMENT_KEY = "dbml";
export declare const DBML_FRAGMENT_COMPRESSION: "deflate-raw";
/** Teto do texto descomprimido; acima disso o link é tratado como inválido (evita "zip bomb"). */
export declare const MAX_FRAGMENT_DBML_BYTES: number;
/** Documento novo e não salvo aberto a partir do fragmento (`DraftTransport`). */
export declare const DRAFT_DOCUMENT_ID = "dbml-fragment-draft";
export declare const DRAFT_FILE_NAME = "exemplo.dbml";
/** Modo leitura (`mountReadonly`): diagrama embutido na documentação, sem edição. */
export declare const READONLY_DEFAULT_HEIGHT_PX = 360;
/** Fração da área útil ocupada pelo diagrama ao "ajustar à tela". */
export declare const READONLY_FIT_MARGIN = 0.92;
/** Nunca amplia além do tamanho real ao ajustar (texto pequeno não vira gigante). */
export declare const READONLY_FIT_MAX_ZOOM = 1;
/** Fator de zoom por "clique" de roda (deltaY de ~100 px) e por tecla +/-. */
export declare const READONLY_WHEEL_ZOOM_STEP = 0.0015;
/** Política da roda no modo leitura: `modifier` = zoom só com Ctrl/⌘ (a roda rola a página); `always` = sempre zoom. */
export declare const READONLY_WHEEL_ZOOM_MODIFIER = "modifier";
export declare const READONLY_WHEEL_ZOOM_ALWAYS = "always";
export type ReadonlyWheelZoom = typeof READONLY_WHEEL_ZOOM_MODIFIER | typeof READONLY_WHEEL_ZOOM_ALWAYS;
export declare const READONLY_KEY_ZOOM_FACTOR = 1.2;
export declare const READONLY_KEY_PAN_PX = 48;
/** Um dedo rola a página (o navegador cuida); pinça e arrasto com dois dedos são do diagrama. */
export declare const READONLY_TOUCH_ACTION = "pan-x pan-y";
export declare const READONLY_TOUCH_PINCH_POINTS = 2;
export declare const READONLY_SHADOW_CLASS = "dbm-readonly";
/** Separador de relação no texto alternativo (`posts.user_id → users.id`). */
export declare const READONLY_REF_ARROW = "\u2192";
