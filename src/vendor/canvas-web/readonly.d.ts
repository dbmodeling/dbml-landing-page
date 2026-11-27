/**
 * Modo leitura para embutir diagramas fora do produto (site da documentação).
 *
 * Mesmo parse, auto-layout e cena do Wasm (`dbml-wasm`) e o mesmo desenho SVG da exportação
 * (`renderDiagramSvg`), sem WebSocket, servidor, edição nem painéis. O SVG fica num shadow root
 * para que o `<style>` e os ids internos não vazem para a página nem colidam entre exemplos.
 *
 * Entrada própria do build (`dist/readonly.js`): não entra no bundle IIFE do workbench, que o
 * VS Code carrega como script clássico.
 */
import { type ReadonlyWheelZoom } from './constants';
import { type Mode } from './glass';
import { type Language } from './i18n';
import { type Diagnostic, type Schema, type SidecarLayout, type WasmApi } from './types';
export { encodeDbmlFragment, decodeDbmlFragment, FragmentError } from './fragment';
export type { Mode as ReadonlyTheme } from './glass';
export type { SidecarLayout } from './types';
/** Dialetos de `export_sql_ddl` (mesmos de `dbml export --dialect`). */
export type SqlDialect = 'postgres' | 'mysql' | 'sqlite' | 'sqlserver' | 'oracle';
/** Parte do Wasm que o modo leitura usa (injetável em testes ou para reaproveitar uma instância). */
export type ReadonlyWasm = Pick<WasmApi, 'parse_and_analyze' | 'compute_layout' | 'compute_scene' | 'export_sql_ddl'>;
export interface ReadonlyOptions {
    /** Tema inicial; padrão `'light'`. */
    theme?: Mode;
    /** Altura do elemento (número = px). Padrão 360 px; `'auto'` mantém a altura do CSS da página. */
    height?: number | string;
    /** Sidecar `<schema>.dbml.layout.json`: posições fixas e estilos de aresta. */
    layout?: SidecarLayout;
    /** URL do `dbml_wasm_bg.wasm`. Padrão: ao lado do bundle (`new URL('dbml_wasm_bg.wasm', import.meta.url)`). */
    wasmUrl?: string | URL;
    /** Wasm já inicializado (ignora `wasmUrl`). */
    wasm?: ReadonlyWasm;
    /** Idioma do texto alternativo; padrão `'pt-BR'`. */
    lang?: Language;
    /**
     * Roda do mouse: `'modifier'` (padrão) só aproxima com Ctrl/⌘ pressionado e deixa a roda rolar a página;
     * `'always'` aproxima sempre (e prende a rolagem da página sobre o diagrama).
     */
    wheelZoom?: ReadonlyWheelZoom;
}
export interface ReadonlyHandle {
    /** Troca o DBML e reajusta à tela. */
    update(dbml: string): void;
    setTheme(theme: Mode): void;
    /** "Ajustar à tela". */
    fit(): void;
    readonly zoom: number;
    /** Diagnósticos do último parse (o diagrama mostra o que foi possível analisar). */
    readonly diagnostics: Diagnostic[];
    /** DDL gerado pelo Wasm; lança se o DBML tiver erro ou o dialeto não suportar algo. */
    toSql(dialect: SqlDialect): string;
    /** Mermaid `erDiagram` (mesmo gerador da exportação do app). */
    toMermaid(): string;
    /** Remove listeners, o shadow root e os atributos postos no elemento. */
    destroy(): void;
}
/** Carrega o Wasm uma vez por página; chamadas seguintes reaproveitam a mesma instância. */
export declare function loadReadonlyEngine(wasmUrl?: string | URL): Promise<ReadonlyWasm>;
/** Texto alternativo: tabelas e relações do diagrama. */
export declare function describeSchema(schema: Schema, lang?: Language): string;
/** Monta o diagrama de `dbml` em `el`, em modo leitura, com pan/zoom e "ajustar à tela". */
export declare function mountReadonly(el: HTMLElement, dbml: string, opts?: ReadonlyOptions): Promise<ReadonlyHandle>;
