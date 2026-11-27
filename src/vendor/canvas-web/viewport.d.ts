/**
 * Viewport 2D com transformações de matriz afim para câmera, pan e zoom contínuo.
 * Suporta Retina / HiDPI via Device Pixel Ratio (DPR).
 */
export interface Point {
    x: number;
    y: number;
}
export declare class Viewport2D {
    panX: number;
    panY: number;
    zoom: number;
    minZoom: number;
    maxZoom: number;
    constructor(panX?: number, panY?: number, zoom?: number);
    /** Converte coordenada do mundo do diagrama para pixel na tela */
    worldToScreen(worldX: number, worldY: number): Point;
    /** Converte pixel da tela para coordenada no mundo do diagrama */
    screenToWorld(screenX: number, screenY: number): Point;
    /** Aplica zoom mantendo o ponto do cursor fixo na mesma coordenada de mundo */
    zoomAt(screenPoint: Point, zoomDelta: number): void;
    /** Desloca a câmera pelo delta especificado em pixels de tela */
    panBy(deltaX: number, deltaY: number): void;
    /** Aplica a transformação de câmera atual ao contexto 2D do Canvas */
    applyToContext(ctx: CanvasRenderingContext2D, dpr: number): void;
}
