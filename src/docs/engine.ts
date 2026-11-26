// Carregamento sob demanda do motor de leitura do canvas (`readonly.js` + `.wasm`), sincronizados
// de `packages/canvas-web` por `scripts/sync-docs.mjs`. Nada disto entra no bundle das páginas
// sem exemplo: o `import()` só roda quando um exemplo aparece na tela.

import type * as ReadonlyApi from "@/vendor/canvas-web/readonly";

export type ReadonlyModule = typeof ReadonlyApi;
export type ReadonlyHandle = ReadonlyApi.ReadonlyHandle;

const bundleLoaders = import.meta.glob("/src/vendor/canvas-web/readonly.js");
const wasmUrlLoaders = import.meta.glob<string>("/src/vendor/canvas-web/dbml_wasm_bg.wasm", { query: "?url", import: "default" });

export interface Engine {
  module: ReadonlyModule;
  wasmUrl: string;
}

let pending: Promise<Engine | null> | null = null;

/** `null` se o motor não foi sincronizado neste build. A mesma promessa serve a todos os exemplos. */
export function loadEngine(): Promise<Engine | null> {
  const loadBundle = Object.values(bundleLoaders)[0];
  const loadWasm = Object.values(wasmUrlLoaders)[0];
  if (!loadBundle || !loadWasm) return Promise.resolve(null);
  pending ??= Promise.all([loadBundle() as Promise<ReadonlyModule>, loadWasm()])
    .then(([module, wasmUrl]) => ({ module, wasmUrl }))
    .catch((error: unknown) => {
      pending = null;
      throw error;
    });
  return pending;
}
