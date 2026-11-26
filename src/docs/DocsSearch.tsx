import * as React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowUpRight, FileText, Search, Terminal, Keyboard, Puzzle, X } from "lucide-react";
import MiniSearch, { type SearchResult } from "minisearch";
import { cn } from "@/lib/utils";
import { SEARCH_DEBOUNCE_MS, SEARCH_MAX_PER_PAGE, SEARCH_MAX_VISIBLE, SEARCH_MIN_QUERY_LENGTH } from "./constants";
import { loadSearchIndex } from "./content";
import { useDocs } from "./context";
import { SEARCH_KIND, SEARCH_OPTIONS } from "./shared.mjs";
import { useFocusTrap } from "./useFocusTrap";

interface Hit extends SearchResult {
  title: string;
  heading: string;
  url: string;
  kind: string;
}

const KIND_ICON: Record<string, React.ComponentType<{ className?: string }>> = {
  [SEARCH_KIND.page]: FileText,
  [SEARCH_KIND.action]: Keyboard,
  [SEARCH_KIND.cli]: Terminal,
  [SEARCH_KIND.vscode]: Puzzle,
};

let indexPromise: Promise<MiniSearch | null> | undefined;
/** O índice é gerado no build e só baixado/parseado na primeira vez que a busca abre. */
function loadIndex(): Promise<MiniSearch | null> {
  indexPromise ??= loadSearchIndex().then((raw) => (raw ? MiniSearch.loadJSON(raw, SEARCH_OPTIONS) : null));
  return indexPromise;
}

export function DocsSearch({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t, lang } = useDocs();
  const navigate = useNavigate();
  const [query, setQuery] = React.useState("");
  const [debounced, setDebounced] = React.useState("");
  const [index, setIndex] = React.useState<MiniSearch | null>(null);
  const [active, setActive] = React.useState(0);
  const panelRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  useFocusTrap(panelRef, open, onClose);

  React.useEffect(() => {
    if (!open) return;
    let alive = true;
    loadIndex().then((loaded) => alive && setIndex(loaded));
    inputRef.current?.focus();
    return () => {
      alive = false;
    };
  }, [open]);

  React.useEffect(() => {
    const timer = window.setTimeout(() => setDebounced(query.trim()), SEARCH_DEBOUNCE_MS);
    return () => window.clearTimeout(timer);
  }, [query]);

  const hits = React.useMemo<Hit[]>(() => {
    if (!index || debounced.length < SEARCH_MIN_QUERY_LENGTH) return [];
    const found = index.search(debounced, { filter: (r) => r.lang === lang }) as Hit[];
    // um item por URL: o resultado mais bem pontuado da página ou da linha
    const seen = new Set<string>();
    const perPage = new Map<string, number>();
    return found
      .filter((hit) => {
        if (seen.has(hit.url)) return false;
        seen.add(hit.url);
        const page = hit.url.split("#")[0];
        const count = (perPage.get(page) ?? 0) + 1;
        perPage.set(page, count);
        return hit.kind !== SEARCH_KIND.page || count <= SEARCH_MAX_PER_PAGE;
      })
      .slice(0, SEARCH_MAX_VISIBLE);
  }, [index, debounced, lang]);

  React.useEffect(() => setActive(0), [hits]);
  React.useEffect(() => {
    if (!open || !hits[active]) return;
    document.getElementById(`docs-hit-${active}`)?.scrollIntoView({ block: "nearest" });
  }, [open, active, hits]);

  const go = (hit: Hit) => {
    onClose();
    setQuery("");
    navigate(hit.url);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center px-3 pt-[12vh]" role="presentation">
      <div className="absolute inset-0 bg-background/70 backdrop-blur-[2px]" onClick={onClose} aria-hidden="true" />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={t.searchPlaceholder}
        className="relative w-full max-w-xl border border-border rounded-md bg-popover text-popover-foreground"
      >
        <div className="flex items-center gap-2 h-12 px-3 border-b border-border">
          <Search className="w-4 h-4 text-muted-foreground shrink-0" aria-hidden="true" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "ArrowDown") {
                event.preventDefault();
                setActive((i) => Math.min(i + 1, Math.max(hits.length - 1, 0)));
              } else if (event.key === "ArrowUp") {
                event.preventDefault();
                setActive((i) => Math.max(i - 1, 0));
              } else if (event.key === "Enter" && hits[active]) {
                event.preventDefault();
                go(hits[active]);
              }
            }}
            placeholder={t.searchPlaceholder}
            aria-label={t.searchPlaceholder}
            role="combobox"
            aria-expanded={hits.length > 0}
            aria-controls="docs-search-results"
            aria-activedescendant={hits[active] ? `docs-hit-${active}` : undefined}
            className="flex-1 bg-transparent text-sm focus:outline-none placeholder:text-muted-foreground"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label={t.searchClose}
            className="h-7 w-7 inline-flex items-center justify-center rounded-sm text-muted-foreground hover:text-foreground hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
        <ul id="docs-search-results" role="listbox" aria-label={t.searchResults} className="max-h-[50vh] overflow-y-auto p-1.5">
          {hits.map((hit, i) => {
            const Icon = KIND_ICON[hit.kind] ?? FileText;
            return (
              <li key={hit.id} role="option" id={`docs-hit-${i}`} aria-selected={i === active}>
                <button
                  type="button"
                  onClick={() => go(hit)}
                  onMouseEnter={() => setActive(i)}
                  tabIndex={-1}
                  className={cn("w-full flex items-center gap-3 px-2.5 py-2 rounded-sm text-left text-sm", i === active ? "bg-secondary" : "hover:bg-secondary/60")}
                >
                  <Icon className="w-4 h-4 text-muted-foreground shrink-0" aria-hidden="true" />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-medium">{hit.title}</span>
                    {hit.heading ? <span className="block truncate font-mono text-[10px] text-muted-foreground">{hit.heading}</span> : null}
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground shrink-0" aria-hidden="true" />
                </button>
              </li>
            );
          })}
        </ul>
        <div className="px-3 py-2 border-t border-border font-mono text-[10px] text-muted-foreground" role="status">
          {debounced.length < SEARCH_MIN_QUERY_LENGTH
            ? t.searchMinChars
            : !index
              ? t.loading
              : hits.length === 0
                ? t.searchEmpty
                : t.searchHint}
        </div>
      </div>
    </div>
  );
}
