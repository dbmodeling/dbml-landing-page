import * as React from "react";
import { Search } from "lucide-react";
import { actions } from "../content";
import { useDocs } from "../context";
import { actionAnchor, normalizeTerm } from "../shared.mjs";
import { catalogFor, formatKeys, type ActionEntry } from "../shortcuts";
import { MODALITIES, type Modality } from "../constants";
import { AnchorRow, Mono, TableScroll, Td, Th } from "./RefTable";

function ShortcutCell({ action, modality }: { action: ActionEntry; modality: Modality }) {
  const { os, t } = useDocs();
  if (!action.modalidades.includes(modality)) {
    return <span className="text-muted-foreground" title={t.modalities[modality]} aria-label="n/d">—</span>;
  }
  const shortcut = action.atalhos[catalogFor(modality)];
  if (!shortcut) return <span className="text-muted-foreground text-xs">{t.palette}</span>;
  const keys = formatKeys(shortcut, os);
  return (
    <span className="inline-flex flex-wrap items-center gap-0.5">
      {keys.map((key, i) => (
        <kbd key={`${key}-${i}`} className="inline-flex items-center justify-center min-w-[1.4rem] h-[1.4rem] px-1 font-mono text-[11px] font-medium rounded border border-border bg-muted text-foreground">
          {key}
        </kbd>
      ))}
    </span>
  );
}

/** Tabela completa de ações e atalhos (`gerado/acoes.json`), agrupada por categoria. */
export function RefAcoes() {
  const { contentLang, t } = useDocs();
  const [query, setQuery] = React.useState("");
  const groups = React.useMemo(() => {
    const needle = normalizeTerm(query.trim());
    const map = new Map<string, ActionEntry[]>();
    for (const action of actions) {
      const label = action.grupo_rotulo?.[contentLang] ?? action.grupo;
      const haystack = normalizeTerm([action.id, ...(action.aliases ?? []), action.rotulo[contentLang]].join(" "));
      if (needle && !haystack.includes(needle)) continue;
      map.set(label, [...(map.get(label) ?? []), action]);
    }
    return [...map.entries()];
  }, [query, contentLang]);

  return (
    <div className="docs-ref-actions">
      <div className="my-4 flex items-center gap-2 h-9 px-3 rounded-full border border-border bg-secondary/90 focus-within:bg-card focus-within:border-foreground/40 transition-colors max-w-sm">
        <Search className="w-3.5 h-3.5 text-muted-foreground" aria-hidden="true" />
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={t.filterActions}
          aria-label={t.filterActions}
          className="w-full bg-transparent text-xs focus:outline-none placeholder:text-muted-foreground"
        />
      </div>
      {groups.length === 0 ? <p className="text-sm text-muted-foreground">{t.noRows}</p> : null}
      {groups.map(([label, items]) => (
        <TableScroll key={label} label={label}>
          <table className="w-full border-collapse min-w-[40rem]">
            <caption className="text-left px-3 py-2 text-sm font-bold bg-card border-b border-border">{label}</caption>
            <thead>
              <tr>
                <Th>{t.colAction}</Th>
                {MODALITIES.map((m) => (
                  <Th key={m}>{t.modalities[m]}</Th>
                ))}
                <Th className="w-8"><span className="sr-only">{t.copyLink}</span></Th>
              </tr>
            </thead>
            <tbody>
              {items.map((action) => (
                <AnchorRow key={action.id} id={actionAnchor(action.id)}>
                  <Td>
                    <div className="font-medium">{action.rotulo[contentLang] ?? action.id}</div>
                    <Mono className="text-muted-foreground">{action.id}</Mono>
                    {action.aliases?.length ? <Mono className="text-muted-foreground"> · {action.aliases.join(", ")}</Mono> : null}
                  </Td>
                  {MODALITIES.map((m) => (
                    <Td key={m}>
                      <ShortcutCell action={action} modality={m} />
                    </Td>
                  ))}
                </AnchorRow>
              ))}
            </tbody>
          </table>
        </TableScroll>
      ))}
    </div>
  );
}
