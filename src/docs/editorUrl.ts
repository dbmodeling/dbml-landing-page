// URL do botão "Abrir no editor": URL da instância (com `?token=`) + fragmento `#dbml=...`.
// O fragmento não chega ao servidor; o editor Web abre o conteúdo como documento novo e não salvo.
// O shim do `dbml run` lê o token da query, guarda na sessão da aba e preserva o `#dbml=` ao limpar a barra.

import { EDITOR_DEMO_URL, EDITOR_TOKEN_PARAM, EDITOR_URL_PROTOCOLS, STORAGE_KEY_EDITOR_URL } from "./constants";

/** Compressor do motor de leitura (`encodeDbmlFragment`): devolve `"#dbml=..."`. */
export type FragmentEncoder = (dbml: string) => Promise<string>;

export type EditorUrlError = "invalid" | "protocol" | "token";
export type ParsedEditorUrl = { ok: true; url: string } | { ok: false; error: EditorUrlError };

/**
 * Valida a URL colada pela pessoa: `http(s)://` com `token` não vazio na query. Devolve a URL sem fragmento
 * (o fragmento do exemplo é anexado depois).
 */
export function parseEditorUrl(input: string): ParsedEditorUrl {
  let url: URL;
  try {
    url = new URL(input.trim());
  } catch {
    return { ok: false, error: "invalid" };
  }
  if (!(EDITOR_URL_PROTOCOLS as readonly string[]).includes(url.protocol)) return { ok: false, error: "protocol" };
  if (!url.searchParams.get(EDITOR_TOKEN_PARAM)) return { ok: false, error: "token" };
  url.hash = "";
  return { ok: true, url: url.toString() };
}

/** Base a usar: a URL guardada pela pessoa; sem ela, a da demo pública (hoje `null`). */
export function editorBaseUrl(stored: string | null, demoUrl: string | null = EDITOR_DEMO_URL): string | null {
  return stored ?? demoUrl;
}

/** Une a base (sem o fragmento antigo) ao fragmento `#dbml=...`. */
export function joinEditorUrl(base: string, fragment: string): string {
  const url = new URL(base);
  url.hash = "";
  return `${url.toString()}${fragment.startsWith("#") ? fragment : `#${fragment}`}`;
}

export async function buildEditorUrl(base: string, dbml: string, encode: FragmentEncoder): Promise<string> {
  return joinEditorUrl(base, await encode(dbml));
}

// ---------------------------------------------------------------------------
// URL guardada (conveniência na aba atual): `sessionStorage` com fallback silencioso.
// Como o `dbml run` gera um token novo a cada execução, `sessionStorage` evita deixar
// credenciais antigas persistidas em disco entre sessões do navegador.
// ---------------------------------------------------------------------------

type ReadableStorage = Pick<Storage, "getItem">;
type WritableStorage = Pick<Storage, "setItem">;
type RemovableStorage = Pick<Storage, "removeItem">;

function defaultStorage(): Storage | null {
  try {
    return typeof window === "undefined" ? null : window.sessionStorage;
  } catch {
    return null;
  }
}

/** Só devolve valores que ainda passam na validação (ignora lixo ou edição manual do storage). */
export function readStoredEditorUrl(storage: ReadableStorage | null = defaultStorage()): string | null {
  try {
    const raw = storage?.getItem(STORAGE_KEY_EDITOR_URL);
    if (!raw) return null;
    const parsed = parseEditorUrl(raw);
    return parsed.ok ? parsed.url : null;
  } catch {
    return null;
  }
}

/** `true` se gravou; `false` com o armazenamento indisponível (a URL vale só nesta página). */
export function writeStoredEditorUrl(url: string, storage: WritableStorage | null = defaultStorage()): boolean {
  try {
    if (!storage) return false;
    storage.setItem(STORAGE_KEY_EDITOR_URL, url);
    return true;
  } catch {
    return false;
  }
}

/** Remove a URL guardada da sessão atual. */
export function clearStoredEditorUrl(storage: RemovableStorage | null = defaultStorage()): void {
  try {
    storage?.removeItem(STORAGE_KEY_EDITOR_URL);
  } catch {
    // armazenamento bloqueado: nada a limpar
  }
}
