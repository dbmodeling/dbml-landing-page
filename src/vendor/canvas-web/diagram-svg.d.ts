/**
 * Desenho do diagrama em SVG (mesma aparência e coordenadas do canvas) e sintaxe Mermaid
 * erDiagram. Não importa as fontes embutidas: quem chama decide se embute `@font-face`
 * (exportação) ou usa as fontes da página (modo leitura, `readonly.ts`).
 */
import { Schema, SceneGeometry, EdgeStyle } from './types';
import { Point } from './viewport';
import { Mode } from './glass';
export declare function exportToMermaid(schema: Schema): string;
export interface CanvasAppearance {
    zoom?: number;
    selection?: readonly string[];
    selectedRef?: string;
    selectedEnum?: string | null;
    top?: string | null;
}
/**
 * Desenha o diagrama completo, nas coordenadas e com a aparência do canvas. `fontCss` entra no
 * `<style>` do SVG (ex.: `@font-face` embutidas na exportação; vazio usa as fontes da página).
 */
export declare function renderDiagramSvg(schema: Schema, positions: Record<string, Point>, scene?: SceneGeometry | null, mode?: Mode, edges?: Record<string, EdgeStyle>, appearance?: CanvasAppearance, fontCss?: string): string;
