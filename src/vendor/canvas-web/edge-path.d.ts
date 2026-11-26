/** Polilinha ortogonal com cantos arredondados (raio máximo `r`, limitado à metade de cada trecho). */
export declare function roundedPath(points: ReadonlyArray<{
    x: number;
    y: number;
}>, r?: number): string;
import type { EdgeStyle, RoutedEdge } from './types';
/** Curva entre as portas horizontais mais próximas dos cartões. */
export declare function curvedEdge(ax: number, ay: number, bx: number, by: number, style?: EdgeStyle): {
    x1: number;
    x2: number;
    d1: number;
    d2: number;
    c1: {
        x: number;
        y: number;
    };
    c2: {
        x: number;
        y: number;
    };
    midpoint: {
        x: number;
        y: number;
    };
    path: string;
};
/** Caminho desenhado: com estilo, a curva editada; sem estilo, a rota do Wasm que desvia dos cartões. */
export declare function edgeDrawing(e: Pick<RoutedEdge, 'svg_path' | 'auto_path' | 'auto_mid'>, curve: ReturnType<typeof curvedEdge>, style?: EdgeStyle): {
    path: string;
    midpoint: import("./types").NodeCoordinate;
};
