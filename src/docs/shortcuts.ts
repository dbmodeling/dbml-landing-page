// Resolução de `<Atalho acao="...">` a partir de `gerado/acoes.json`.

import { DEFAULT_LANG, DEFAULT_OS, KEY_SEPARATOR, MAC_KEY_SYMBOLS, type DocLang, type Modality, type OperatingSystem } from "./constants";

export interface ShortcutKeys {
  padrao: string;
  macos: string;
}

export interface ActionEntry {
  id: string;
  aliases?: string[];
  grupo: string;
  grupo_rotulo?: Record<string, string>;
  rotulo: Record<string, string>;
  /** `null` = a ação existe sem atalho. A chave some quando a modalidade não tem o catálogo. */
  atalhos: Partial<Record<"desktop" | "web", ShortcutKeys | null>>;
  modalidades: Modality[];
}

export interface ActionsFile {
  acoes: ActionEntry[];
}

export type ShortcutResult =
  | { kind: "keys"; keys: string[]; action: ActionEntry }
  | { kind: "palette"; label: string; action: ActionEntry }
  | { kind: "unavailable"; modality: Modality; action: ActionEntry }
  | { kind: "unknown"; name: string };

/** Índice por id canônico e por alias. */
export function buildActionIndex(acoes: readonly ActionEntry[]): Map<string, ActionEntry> {
  const index = new Map<string, ActionEntry>();
  for (const action of acoes) index.set(action.id, action);
  for (const action of acoes) {
    for (const alias of action.aliases ?? []) if (!index.has(alias)) index.set(alias, action);
  }
  return index;
}

/** O VS Code usa o catálogo da Web (mesmo `canvas-web`). */
export const catalogFor = (modality: Modality): "desktop" | "web" => (modality === "desktop" ? "desktop" : "web");

/** `Ctrl+Shift+F` -> `["Ctrl","Shift","F"]`; tolera a tecla `+` no fim (`Ctrl++`). */
export function splitCombo(combo: string): string[] {
  const parts = combo.split(KEY_SEPARATOR);
  const keys: string[] = [];
  for (let i = 0; i < parts.length; i += 1) {
    if (parts[i] === "" && i === parts.length - 1 && keys.length > 0) keys.push(KEY_SEPARATOR);
    else if (parts[i] !== "") keys.push(parts[i]);
  }
  return keys;
}

export function formatKeys(shortcut: ShortcutKeys, os: OperatingSystem): string[] {
  if (os !== "macos") return splitCombo(shortcut.padrao);
  return splitCombo(shortcut.macos).map((key) => MAC_KEY_SYMBOLS[key] ?? key);
}

export function resolveShortcut(
  index: ReadonlyMap<string, ActionEntry>,
  name: string,
  modality: Modality,
  os: OperatingSystem,
  lang: DocLang,
): ShortcutResult {
  const action = index.get(name);
  if (!action) return { kind: "unknown", name };
  if (!action.modalidades.includes(modality)) return { kind: "unavailable", modality, action };
  const shortcut = action.atalhos[catalogFor(modality)];
  if (shortcut) return { kind: "keys", keys: formatKeys(shortcut, os), action };
  return { kind: "palette", label: action.rotulo[lang] ?? action.rotulo[DEFAULT_LANG] ?? action.id, action };
}

/** SO do leitor a partir de `navigator` (sem depender de `userAgentData`, ainda ausente em Safari/Firefox). */
export function detectOs(userAgent: string, platform = ""): OperatingSystem {
  const probe = `${platform} ${userAgent}`.toLowerCase();
  if (/mac|iphone|ipad|ipod/.test(probe)) return "macos";
  if (/win/.test(probe)) return "windows";
  if (/linux|x11|cros|android/.test(probe)) return "linux";
  return DEFAULT_OS;
}
