import { describe, expect, it } from "vitest";
import { DEFAULT_MODALITY, STORAGE_KEY_MODALITY } from "../constants";
import { readModality, writeModality } from "../storage";

const memory = () => {
  const data = new Map<string, string>();
  return { getItem: (k: string) => data.get(k) ?? null, setItem: (k: string, v: string) => void data.set(k, v) };
};

const blocked = {
  getItem: () => {
    throw new DOMException("blocked", "SecurityError");
  },
  setItem: () => {
    throw new DOMException("blocked", "SecurityError");
  },
};

describe("preferência de modalidade", () => {
  it("o padrão é desktop", () => {
    expect(DEFAULT_MODALITY).toBe("desktop");
    expect(readModality(memory())).toBe("desktop");
  });

  it("lembra a escolha entre páginas", () => {
    const storage = memory();
    expect(writeModality("vscode", storage)).toBe(true);
    expect(storage.getItem(STORAGE_KEY_MODALITY)).toBe("vscode");
    expect(readModality(storage)).toBe("vscode");
  });

  it("valor corrompido volta ao padrão", () => {
    const storage = memory();
    storage.setItem(STORAGE_KEY_MODALITY, "amiga");
    expect(readModality(storage)).toBe("desktop");
  });

  it("localStorage bloqueado: lê o padrão e a escrita falha sem lançar", () => {
    expect(readModality(blocked)).toBe("desktop");
    expect(writeModality("web", blocked)).toBe(false);
  });

  it("sem armazenamento (null): padrão e escrita retorna false", () => {
    expect(readModality(null)).toBe("desktop");
    expect(writeModality("web", null)).toBe(false);
  });
});
