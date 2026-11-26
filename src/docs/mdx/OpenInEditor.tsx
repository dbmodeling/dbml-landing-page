import * as React from "react";
import { ChevronDown, ExternalLink, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { EDITOR_URL_PLACEHOLDER } from "../constants";
import { useDocs } from "../context";
import { editorBaseUrl, joinEditorUrl, parseEditorUrl, type EditorUrlError } from "../editorUrl";
import type { Engine } from "../engine";
import { fill } from "../i18n";

const BUTTON =
  "inline-flex items-center gap-1.5 h-7 px-2.5 border border-border text-[11px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring";

/** Renderiza `texto com `código`` do i18n sem dangerouslySetInnerHTML. */
function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split("`").map((part, i) =>
        i % 2 ? (
          <code key={i} className="font-mono text-[0.9em] px-1 rounded-sm border border-border bg-muted">
            {part}
          </code>
        ) : (
          part
        ),
      )}
    </>
  );
}

/**
 * "Abrir no editor": abre o exemplo no editor Web do `dbml run` como documento novo. Como o servidor exige o
 * token da execução (`?token=`), a primeira vez pede a URL que o terminal mostra (popover não modal) e a guarda
 * neste navegador; nas próximas abre direto, com "Trocar URL".
 */
export function OpenInEditor({ dbml, engine }: { dbml: string; engine: Engine | null }) {
  const { t, editorUrl: stored, setEditorUrl, clearEditorUrl } = useDocs();
  const [fragment, setFragment] = React.useState<string | null>(null);
  const [open, setOpen] = React.useState(false);
  const [draft, setDraft] = React.useState("");
  const [error, setError] = React.useState<EditorUrlError | null>(null);
  const [persisted, setPersisted] = React.useState(true);
  const rootRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const popoverId = React.useId();
  const base = editorBaseUrl(stored);

  // O fragmento é calculado de antemão: abrir a aba precisa ser síncrono ao clique (bloqueio de pop-up).
  React.useEffect(() => {
    setFragment(null);
    if (!engine) return;
    let alive = true;
    engine.module.encodeDbmlFragment(dbml).then(
      (value) => alive && setFragment(value),
      () => undefined,
    );
    return () => {
      alive = false;
    };
  }, [engine, dbml]);

  const close = React.useCallback((restoreFocus = true) => {
    setOpen(false);
    setError(null);
    if (restoreFocus) triggerRef.current?.focus();
  }, []);

  // não modal: fecha com Esc ou ao clicar fora, sem prender o foco
  React.useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && close();
    const onDown = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) close(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onDown);
    };
  }, [open, close]);

  const openTab = (url: string) => window.open(url, "_blank", "noopener,noreferrer");

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (fragment === null) return;
    const parsed = parseEditorUrl(draft);
    if (!parsed.ok) return setError(parsed.error);
    setPersisted(setEditorUrl(parsed.url));
    setError(null);
    close(false);
    openTab(joinEditorUrl(parsed.url, fragment));
  };

  const forget = () => {
    clearEditorUrl();
    setDraft("");
    close();
  };

  const directHref = base && fragment !== null ? joinEditorUrl(base, fragment) : null;
  const host = base ? new URL(base).host : "";

  const togglePopover = () => {
    setDraft(stored ?? "");
    setError(null);
    setOpen((value) => !value);
  };

  return (
    <div ref={rootRef} className="relative inline-flex">
      {base && directHref ? (
        // URL já guardada: o botão principal abre direto; a seta troca a URL
        <>
          <a href={directHref} target="_blank" rel="noopener noreferrer" title={fill(t.editorUrlUsing, host)} className={cn(BUTTON, "rounded-l-sm text-foreground hover:bg-secondary")}>
            <ExternalLink className="w-3 h-3" aria-hidden="true" />
            {t.openInEditor}
          </a>
          <button
            ref={triggerRef}
            type="button"
            onClick={togglePopover}
            aria-expanded={open}
            aria-controls={popoverId}
            aria-label={t.editorUrlChange}
            title={t.editorUrlChange}
            className={cn(BUTTON, "-ml-px rounded-r-sm px-1.5 text-muted-foreground hover:text-foreground hover:bg-secondary")}
          >
            <ChevronDown className="w-3 h-3" aria-hidden="true" />
          </button>
        </>
      ) : (
        <button
          ref={triggerRef}
          type="button"
          onClick={togglePopover}
          aria-expanded={open}
          aria-controls={popoverId}
          aria-haspopup="dialog"
          className={cn(BUTTON, "rounded-sm text-foreground hover:bg-secondary")}
        >
          <ExternalLink className="w-3 h-3" aria-hidden="true" />
          {t.openInEditor}
        </button>
      )}

      {open ? (
        <form
          id={popoverId}
          role="dialog"
          aria-modal="false"
          aria-label={t.editorPopoverLabel}
          onSubmit={submit}
          className="absolute right-0 top-full z-30 mt-1.5 w-[min(24rem,calc(100vw-2rem))] border border-border rounded-md bg-popover text-popover-foreground p-3 text-xs"
        >
          <div className="flex items-start justify-between gap-2">
            <p className="leading-relaxed text-muted-foreground">
              <Rich text={t.editorUrlHelp} />
            </p>
            <button type="button" onClick={() => close()} aria-label={t.editorUrlClose} className="shrink-0 h-6 w-6 inline-flex items-center justify-center rounded-sm text-muted-foreground hover:text-foreground hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              <X className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </div>
          <label htmlFor={`${popoverId}-url`} className="block mt-3 mb-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
            {t.editorUrlLabel}
          </label>
          <input
            ref={inputRef}
            id={`${popoverId}-url`}
            type="url"
            inputMode="url"
            autoComplete="off"
            spellCheck={false}
            value={draft}
            onChange={(event) => {
              setDraft(event.target.value);
              setError(null);
            }}
            placeholder={EDITOR_URL_PLACEHOLDER}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? `${popoverId}-error` : undefined}
            className="w-full h-8 rounded-md border border-border bg-background px-2 font-mono text-[11px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
          {error ? (
            <p id={`${popoverId}-error`} role="alert" className="mt-1.5 text-signal">
              <Rich text={t.editorUrlErrors[error]} />
            </p>
          ) : null}
          <div className="mt-3 flex items-center justify-between gap-2">
            <span className="text-[11px] text-muted-foreground">{persisted ? t.editorUrlSavedOnlyHere : t.editorUrlNotSaved}</span>
            <div className="flex items-center gap-1.5 shrink-0">
              {stored ? (
                <button
                  type="button"
                  onClick={forget}
                  className="h-7 px-2.5 rounded-full border border-border text-[11px] font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {t.editorUrlClear}
                </button>
              ) : null}
              <button
                type="submit"
                disabled={fragment === null}
                className="h-7 px-3 rounded-full bg-primary text-primary-foreground text-[11px] font-semibold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background"
              >
                {fragment === null ? t.editorUrlPreparing : t.editorUrlSubmit}
              </button>
            </div>
          </div>
        </form>
      ) : null}
    </div>
  );
}
