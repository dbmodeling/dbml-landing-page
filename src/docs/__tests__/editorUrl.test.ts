import { describe, expect, it } from "vitest";
import { EDITOR_DEMO_URL, EDITOR_LOCAL_URL, STORAGE_KEY_EDITOR_URL } from "../constants";
import { buildEditorUrl, clearStoredEditorUrl, editorBaseUrl, joinEditorUrl, parseEditorUrl, readStoredEditorUrl, writeStoredEditorUrl } from "../editorUrl";

const fakeEncoder = async (dbml: string) => `#dbml=${btoa(dbml)}`;
const TOKENED = "http://127.0.0.1:3000/?token=abcdefghijklmnop";

describe("validação da URL colada", () => {
  it("aceita http(s) com token e descarta o fragmento", () => {
    expect(parseEditorUrl(TOKENED)).toEqual({ ok: true, url: TOKENED });
    expect(parseEditorUrl(`  https://meu.host:8443/app/?token=xyz&x=1#velho \n`)).toEqual({ ok: true, url: "https://meu.host:8443/app/?token=xyz&x=1" });
  });

  it("rejeita o que não é URL, outros protocolos e URL sem token", () => {
    expect(parseEditorUrl("localhost:3000")).toMatchObject({ ok: false });
    expect(parseEditorUrl("não é url")).toEqual({ ok: false, error: "invalid" });
    expect(parseEditorUrl("")).toEqual({ ok: false, error: "invalid" });
    expect(parseEditorUrl("ftp://127.0.0.1:3000/?token=abc")).toEqual({ ok: false, error: "protocol" });
    expect(parseEditorUrl("javascript:alert(1)")).toEqual({ ok: false, error: "protocol" });
    expect(parseEditorUrl("http://127.0.0.1:3000/")).toEqual({ ok: false, error: "token" });
    expect(parseEditorUrl("http://127.0.0.1:3000/?token=")).toEqual({ ok: false, error: "token" });
    expect(parseEditorUrl("http://127.0.0.1:3000/#token=abc")).toEqual({ ok: false, error: "token" });
  });
});

describe("montagem da URL do editor", () => {
  it("usa a URL guardada; sem ela, a da demo (hoje inexistente)", () => {
    expect(EDITOR_DEMO_URL).toBeNull();
    expect(editorBaseUrl(null)).toBeNull();
    expect(editorBaseUrl(TOKENED)).toBe(TOKENED);
    expect(editorBaseUrl(null, "https://demo.example/")).toBe("https://demo.example/");
    expect(editorBaseUrl(TOKENED, "https://demo.example/")).toBe(TOKENED);
  });

  it("anexa `#dbml=` mantendo o `?token=` e sem pôr o código na query", async () => {
    const url = await buildEditorUrl(TOKENED, "Table a {}", fakeEncoder);
    expect(url).toBe(`${TOKENED}#dbml=${btoa("Table a {}")}`);
    expect(new URL(url).search).toBe("?token=abcdefghijklmnop");
    expect(new URL(url).hash).toBe(`#dbml=${btoa("Table a {}")}`);
  });

  it("troca um fragmento antigo da base e aceita fragmento sem '#'", () => {
    expect(joinEditorUrl(`${EDITOR_LOCAL_URL}?token=abc#velho`, "#dbml=1")).toBe(`${EDITOR_LOCAL_URL}?token=abc#dbml=1`);
    expect(joinEditorUrl(TOKENED, "dbml=abc")).toBe(`${TOKENED}#dbml=abc`);
  });
});

describe("URL guardada na sessão", () => {
  const memory = () => {
    const data = new Map<string, string>();
    return {
      getItem: (k: string) => data.get(k) ?? null,
      setItem: (k: string, v: string) => void data.set(k, v),
      removeItem: (k: string) => void data.delete(k),
    };
  };
  const blocked = {
    getItem: () => {
      throw new DOMException("blocked", "SecurityError");
    },
    setItem: () => {
      throw new DOMException("blocked", "SecurityError");
    },
    removeItem: () => {
      throw new DOMException("blocked", "SecurityError");
    },
  };

  it("grava, lê de volta e limpa", () => {
    const storage = memory();
    expect(readStoredEditorUrl(storage)).toBeNull();
    expect(writeStoredEditorUrl(TOKENED, storage)).toBe(true);
    expect(storage.getItem(STORAGE_KEY_EDITOR_URL)).toBe(TOKENED);
    expect(readStoredEditorUrl(storage)).toBe(TOKENED);
    clearStoredEditorUrl(storage);
    expect(readStoredEditorUrl(storage)).toBeNull();
  });

  it("ignora valor inválido guardado (editado à mão ou corrompido)", () => {
    const storage = memory();
    storage.setItem(STORAGE_KEY_EDITOR_URL, "javascript:alert(1)");
    expect(readStoredEditorUrl(storage)).toBeNull();
  });

  it("sessionStorage bloqueado: não lança", () => {
    expect(readStoredEditorUrl(blocked)).toBeNull();
    expect(writeStoredEditorUrl(TOKENED, blocked)).toBe(false);
    expect(() => clearStoredEditorUrl(blocked)).not.toThrow();
    expect(readStoredEditorUrl(null)).toBeNull();
    expect(writeStoredEditorUrl(TOKENED, null)).toBe(false);
    expect(() => clearStoredEditorUrl(null)).not.toThrow();
  });
});

// Com o motor sincronizado, valida o encoder real: o link tem que carregar o DBML num fragmento comprimido.
const vendored = import.meta.glob("../../vendor/canvas-web/readonly.js");
describe.skipIf(Object.keys(vendored).length === 0)("encoder real do motor de leitura", () => {
  it("gera `#dbml=...` e o ciclo de decodificação devolve o texto", async () => {
    const mod = (await Object.values(vendored)[0]()) as typeof import("../../vendor/canvas-web/readonly.js");
    const dbml = "Table users {\n  id int [pk]\n}\n";
    const url = await buildEditorUrl(TOKENED, dbml, mod.encodeDbmlFragment);
    const parsed = new URL(url);
    expect(parsed.search).toBe("?token=abcdefghijklmnop");
    expect(parsed.hash.startsWith("#dbml=")).toBe(true);
    expect(await mod.decodeDbmlFragment(parsed.hash)).toBe(dbml);
  });
});
