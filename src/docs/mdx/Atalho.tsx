import { actions } from "../content";
import { useDocs } from "../context";
import { fill } from "../i18n";
import { buildActionIndex, resolveShortcut } from "../shortcuts";

const INDEX = buildActionIndex(actions);

/** Atalho da ação conforme a modalidade escolhida e o SO do leitor (lido de `gerado/acoes.json`). */
export function Atalho({ acao }: { acao: string }) {
  const { modality, os, contentLang, t } = useDocs();
  const result = resolveShortcut(INDEX, acao, modality, os, contentLang);

  switch (result.kind) {
    case "keys": {
      const mac = os === "macos";
      return (
        <span className="docs-keys inline-flex items-center gap-0.5 align-baseline whitespace-nowrap" title={result.action.rotulo[contentLang]}>
          {result.keys.map((key, i) => (
            <span key={`${key}-${i}`} className="inline-flex items-center gap-0.5">
              {i > 0 && !mac ? <span className="text-muted-foreground text-[10px]" aria-hidden="true">+</span> : null}
              <kbd className="inline-flex items-center justify-center min-w-[1.4rem] h-[1.4rem] px-1 font-mono text-[11px] font-medium rounded border border-border bg-muted text-foreground">
                {key}
              </kbd>
            </span>
          ))}
        </span>
      );
    }
    case "palette":
      return (
        <span className="docs-palette inline-flex items-center gap-1 px-1.5 py-0.5 rounded border border-dashed border-border bg-muted/60 text-[0.85em] whitespace-nowrap" title={result.action.id}>
          <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground">{t.palette}:</span>
          <span>{result.label}</span>
        </span>
      );
    case "unavailable":
      return (
        <span className="docs-unavailable italic text-muted-foreground whitespace-nowrap" title={result.action.id}>
          {fill(t.unavailableIn, t.modalities[result.modality])}
        </span>
      );
    default:
      return (
        <code className="docs-unknown px-1 rounded border border-signal-border bg-signal-soft text-signal text-[0.85em]" title={t.unknownAction}>
          {result.name}
        </code>
      );
  }
}
