import { describe, expect, it } from "vitest";
import { buildActionIndex, detectOs, resolveShortcut, type ActionEntry } from "../shortcuts";

const acao = (extra: Partial<ActionEntry> & Pick<ActionEntry, "id">): ActionEntry => ({
  grupo: "canvas",
  rotulo: { "pt-BR": "Rótulo pt", en: "Label en" },
  atalhos: {},
  modalidades: ["desktop", "web", "vscode"],
  ...extra,
});

const index = buildActionIndex([
  acao({ id: "FitView", atalhos: { desktop: { padrao: "Ctrl+Shift+F", macos: "Ctrl+Shift+F" }, web: { padrao: "Shift+1", macos: "Shift+1" } } }),
  acao({ id: "LangEnglish", aliases: ["LanguageEnglish"], atalhos: { desktop: null, web: null } }),
  acao({ id: "CheckForUpdates", modalidades: ["desktop"], atalhos: { desktop: null } }),
]);

describe("resolveShortcut", () => {
  it("resolve pelo id canônico e pelo alias", () => {
    expect(resolveShortcut(index, "LangEnglish", "web", "linux", "pt-BR").kind).toBe("palette");
    const viaAlias = resolveShortcut(index, "LanguageEnglish", "web", "linux", "pt-BR");
    expect(viaAlias.kind).toBe("palette");
    expect(viaAlias.kind === "palette" && viaAlias.action.id).toBe("LangEnglish");
  });

  it("mostra o atalho da modalidade escolhida; o VS Code usa o catálogo da Web", () => {
    expect(resolveShortcut(index, "FitView", "desktop", "linux", "en")).toMatchObject({ kind: "keys", keys: ["Ctrl", "Shift", "F"] });
    expect(resolveShortcut(index, "FitView", "web", "linux", "en")).toMatchObject({ kind: "keys", keys: ["Shift", "1"] });
    expect(resolveShortcut(index, "FitView", "vscode", "linux", "en")).toMatchObject({ kind: "keys", keys: ["Shift", "1"] });
  });

  it("converte Ctrl, Alt e Shift em símbolos no macOS", () => {
    expect(resolveShortcut(index, "FitView", "desktop", "macos", "en")).toMatchObject({ keys: ["⌘", "⇧", "F"] });
    const alt = buildActionIndex([acao({ id: "X", atalhos: { desktop: { padrao: "Ctrl+Alt+G", macos: "Ctrl+Alt+G" } } })]);
    expect(resolveShortcut(alt, "X", "desktop", "macos", "en")).toMatchObject({ keys: ["⌘", "⌥", "G"] });
    expect(resolveShortcut(alt, "X", "desktop", "windows", "en")).toMatchObject({ keys: ["Ctrl", "Alt", "G"] });
  });

  it("ação sem atalho mostra o rótulo do comando no idioma da página", () => {
    expect(resolveShortcut(index, "LangEnglish", "desktop", "linux", "en")).toMatchObject({ kind: "palette", label: "Label en" });
    expect(resolveShortcut(index, "LangEnglish", "desktop", "linux", "pt-BR")).toMatchObject({ kind: "palette", label: "Rótulo pt" });
  });

  it("ação inexistente na modalidade vira 'não disponível'", () => {
    expect(resolveShortcut(index, "CheckForUpdates", "web", "linux", "pt-BR")).toMatchObject({ kind: "unavailable", modality: "web" });
    expect(resolveShortcut(index, "CheckForUpdates", "desktop", "linux", "pt-BR").kind).toBe("palette");
  });

  it("ação desconhecida", () => {
    expect(resolveShortcut(index, "Nope", "desktop", "linux", "en")).toEqual({ kind: "unknown", name: "Nope" });
  });

  it("tecla '+' no fim do atalho não some", () => {
    const plus = buildActionIndex([acao({ id: "Z", atalhos: { desktop: { padrao: "Ctrl++", macos: "Ctrl++" } } })]);
    expect(resolveShortcut(plus, "Z", "desktop", "linux", "en")).toMatchObject({ keys: ["Ctrl", "+"] });
  });
});

describe("detectOs", () => {
  it("reconhece os três sistemas", () => {
    expect(detectOs("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)", "MacIntel")).toBe("macos");
    expect(detectOs("Mozilla/5.0 (Windows NT 10.0; Win64; x64)", "Win32")).toBe("windows");
    expect(detectOs("Mozilla/5.0 (X11; Fedora; Linux x86_64)", "Linux x86_64")).toBe("linux");
    expect(detectOs("", "")).toBe("linux");
  });
});
