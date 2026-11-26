// Preferência de modalidade persistida em `localStorage`, tolerante a armazenamento bloqueado
// (modo privativo, cookies desativados, política do navegador): nesse caso o seletor funciona só
// na página atual e volta ao padrão nas próximas.

import { DEFAULT_MODALITY, MODALITIES, STORAGE_KEY_MODALITY, type Modality } from "./constants";

export type ReadableStorage = Pick<Storage, "getItem">;
export type WritableStorage = Pick<Storage, "setItem">;

/** `window.localStorage` pode lançar `SecurityError` só de ser acessado. */
export function safeLocalStorage(): Storage | null {
  try {
    return typeof window === "undefined" ? null : window.localStorage;
  } catch {
    return null;
  }
}

export const isModality = (value: unknown): value is Modality =>
  typeof value === "string" && (MODALITIES as readonly string[]).includes(value);

export function readModality(storage: ReadableStorage | null = safeLocalStorage()): Modality {
  try {
    const stored = storage?.getItem(STORAGE_KEY_MODALITY);
    return isModality(stored) ? stored : DEFAULT_MODALITY;
  } catch {
    return DEFAULT_MODALITY;
  }
}

/** `true` se gravou; `false` se o armazenamento não está disponível. */
export function writeModality(modality: Modality, storage: WritableStorage | null = safeLocalStorage()): boolean {
  try {
    if (!storage) return false;
    storage.setItem(STORAGE_KEY_MODALITY, modality);
    return true;
  } catch {
    return false;
  }
}
