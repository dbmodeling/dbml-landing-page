import * as React from "react";
import { useTheme } from "@/components/theme-provider";
import { DEFAULT_MODALITY, type DocLang, type Modality, type OperatingSystem } from "./constants";
import { clearStoredEditorUrl, readStoredEditorUrl, writeStoredEditorUrl } from "./editorUrl";
import { STRINGS, type DocsStrings } from "./i18n";
import { detectOs } from "./shortcuts";
import { readModality, writeModality } from "./storage";

interface DocsContextValue {
  /** Idioma da interface (da URL). */
  lang: DocLang;
  /** Idioma do conteúdo exibido (pt-BR quando a tradução falta). */
  contentLang: DocLang;
  t: DocsStrings;
  modality: Modality;
  setModality: (modality: Modality) => void;
  editorUrl: string | null;
  setEditorUrl: (url: string) => boolean;
  clearEditorUrl: () => void;
  os: OperatingSystem;
  theme: "light" | "dark";
}

const DocsContext = React.createContext<DocsContextValue | null>(null);

export function useDocs(): DocsContextValue {
  const ctx = React.useContext(DocsContext);
  if (!ctx) throw new Error("useDocs precisa de <DocsProvider>");
  return ctx;
}

const currentOs = (): OperatingSystem =>
  typeof navigator === "undefined" ? "linux" : detectOs(navigator.userAgent, navigator.platform);

export function DocsProvider({
  lang,
  contentLang,
  children,
}: {
  lang: DocLang;
  contentLang: DocLang;
  children: React.ReactNode;
}) {
  const { resolvedTheme } = useTheme();
  // Estado inicial lido do armazenamento (com fallback). Se estiver bloqueado, a escolha vale só
  // enquanto o provider vive (a página atual) e a próxima carga volta ao padrão.
  const [modality, setModalityState] = React.useState<Modality>(() => readModality());
  const [editorUrl, setEditorUrlState] = React.useState<string | null>(() => readStoredEditorUrl());
  const os = React.useMemo(currentOs, []);

  const setModality = React.useCallback((next: Modality) => {
    setModalityState(next);
    writeModality(next);
  }, []);

  const setEditorUrl = React.useCallback((next: string) => {
    setEditorUrlState(next);
    return writeStoredEditorUrl(next);
  }, []);

  const clearEditorUrl = React.useCallback(() => {
    setEditorUrlState(null);
    clearStoredEditorUrl();
  }, []);

  const value = React.useMemo<DocsContextValue>(
    () => ({
      lang,
      contentLang,
      t: STRINGS[lang],
      modality: modality ?? DEFAULT_MODALITY,
      setModality,
      editorUrl,
      setEditorUrl,
      clearEditorUrl,
      os,
      theme: resolvedTheme,
    }),
    [lang, contentLang, modality, setModality, editorUrl, setEditorUrl, clearEditorUrl, os, resolvedTheme],
  );

  return <DocsContext.Provider value={value}>{children}</DocsContext.Provider>;
}
