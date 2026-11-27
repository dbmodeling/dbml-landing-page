/**
 * Camada de tema e constantes visuais (protótipo "DB Modeling v5"), espelho de
 * `crates/app/src/glass.rs`. Cores cruas só existem aqui.
 */
export declare const WHITE = "#fff";
export declare const WHITE_30 = "rgba(255,255,255,.3)";
export declare const WHITE_20 = "rgba(255,255,255,.2)";
export declare const WHITE_75 = "rgba(255,255,255,.75)";
export declare const BLACK_20 = "rgba(0,0,0,.2)";
export declare const BLACK_30 = "rgba(0,0,0,.3)";
export declare const CARD_W = 260;
export declare const HEADER_H = 44;
export declare const ROW_H = 30;
export declare const MIN_ZOOM = 0.2;
export declare const MAX_ZOOM = 2.5;
export declare const GROUP_PAD = 32;
export declare const RADIUS_CARD = 12;
export declare const RADIUS_ISLAND = 10;
export declare const SP_SM = 8;
export declare const SP_MD = 12;
export declare const SP_LG = 16;
export declare const TEXT_XS = 12;
export declare const TEXT_SM = 13.5;
export declare const TEXT_BASE = 14.5;
export declare const TEXT_LG = 16.5;
export declare const TITLEBAR_H = 42;
export declare const STATUSBAR_H = 26;
export declare const RAIL_W = 48;
export declare const SIDEBAR_W = 248;
export declare const INSPECTOR_W = 288;
export declare const EDITOR_W = 440;
export declare function cardH(rows: number): number;
/** Paleta para cor de tabelas e grupos (`crates/app/src/glass.rs::TABLE_COLORS`) */
export declare const TABLE_COLORS: ReadonlyArray<readonly [string, string]>;
/** Tipos padrão sugeridos no autocomplete do Inspector (`crates/app/src/shell/mod.rs::STANDARD_TYPES`, em pt-BR) */
export declare const STANDARD_TYPES: ReadonlyArray<readonly [string, string]>;
export type Mode = 'dark' | 'light';
export interface Glass {
    mode: Mode;
    uiScale: number;
    wall: string;
    blur: string;
    chrome: string;
    sidebar: string;
    surface: string;
    grid: string;
    card: string;
    cardTranslucent: string;
    island: string;
    islandSheen: string;
    edge: string;
    edgeSoft: string;
    hover: string;
    active: string;
    selected: string;
    text: string;
    textMuted: string;
    textFaint: string;
    accent: string;
    danger: string;
    warning: string;
    ok: string;
    cardShadow: string;
    cardShadowSelected: string;
    islandShadow: string;
    /** Trilho das barras (atividades, status) e fundo/calha do editor. */
    rail: string;
    editor: string;
    gutter: string;
    lnum: string;
    /** Seleção neutra (abas, segmentados), campos e contorno forte (`line2`). */
    sel: string;
    selShadow: string;
    input: string;
    inputSolid: string;
    edgeStrong: string;
    /** Popovers, diálogos e véu atrás deles. */
    pop: string;
    modal: string;
    scrim: string;
    popShadow: string;
    /** Relações no canvas e realce de sintaxe DBML. */
    relLine: string;
    relStroke: string;
    relLabel: string;
    link: string;
    idx: string;
    swatchRing: string;
    synKw: string;
    synType: string;
    synAttr: string;
    synNum: string;
    synComment: string;
    synPunct: string;
}
/** Tamanho real do "100%" da escala de UI: o antigo 130% virou o normal (igual a `glass.rs`). */
export declare const UI_BASE = 1.3;
export declare function getGlass(mode: Mode, uiScale?: number, glass?: boolean): Glass;
/** Converte `#rrggbb` + opacidade `0..1` em `rgba(r, g, b, a)` */
export declare function hexWithAlpha(hexColor: string, alpha: number): string;
