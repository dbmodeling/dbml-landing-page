import type { GroupBox, Schema } from './types';
import type { Point } from './viewport';
/** Mantém a grade legível ao reduzir o zoom. */
export declare function canvasGridStep(zoom: number): number;
/** A moldura acompanha a posição atual das tabelas no canvas, inclusive ao arrastar. */
export declare function canvasGroups(groups: readonly GroupBox[], schema: Schema, positions: Record<string, Point>): GroupBox[];
