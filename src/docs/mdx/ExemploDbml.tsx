import * as React from "react";
import { Maximize2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DEFAULT_DIALECT,
  EXAMPLE_DEFAULT_HEIGHT_PX,
  EXAMPLE_LOAD_MARGIN,
  EXAMPLE_TABS,
  SQL_DIALECTS,
  SQL_DIALECT_LABELS,
  WHEEL_ZOOM_MODE,
  type ExampleTab,
  type SqlDialect,
} from "../constants";
import { loadExample } from "../content";
import { useDocs } from "../context";
import { loadEngine, type Engine, type ReadonlyHandle } from "../engine";
import { OpenInEditor } from "./OpenInEditor";
import { CodeBlock } from "./CodeBlock";

type EngineState = { status: "idle" | "loading" } | { status: "ready"; engine: Engine } | { status: "unavailable" };

interface ExemploProps {
  arquivo: string;
  abas?: ExampleTab[];
  altura?: number;
  dialeto?: SqlDialect;
}

/** Observa o elemento e dispara uma única vez quando ele chega perto da área visível. */
function useNearViewport(ref: React.RefObject<Element>): boolean {
  const [near, setNear] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current;
    if (!el || near) return;
    if (typeof IntersectionObserver === "undefined") return setNear(true);
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setNear(true);
          observer.disconnect();
        }
      },
      { rootMargin: EXAMPLE_LOAD_MARGIN },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, near]);
  return near;
}

function useDbmlSource(name: string): { dbml: string | null; missing: boolean } {
  const [state, setState] = React.useState<{ dbml: string | null; missing: boolean }>({ dbml: null, missing: false });
  React.useEffect(() => {
    let alive = true;
    const loading = loadExample(name);
    if (!loading) {
      setState({ dbml: null, missing: true });
      return;
    }
    loading.then((dbml) => alive && setState({ dbml, missing: false }), () => alive && setState({ dbml: null, missing: true }));
    return () => {
      alive = false;
    };
  }, [name]);
  return state;
}

/** Instância sem DOM visível: serve SQL/Mermaid/diagnósticos sem exigir a aba Diagrama aberta. */
function useHeadlessHandle(engine: Engine | null, dbml: string | null, theme: "light" | "dark") {
  const [handle, setHandle] = React.useState<ReadonlyHandle | null>(null);
  React.useEffect(() => {
    if (!engine || dbml === null) return;
    let alive = true;
    let created: ReadonlyHandle | undefined;
    engine.module
      .mountReadonly(document.createElement("div"), dbml, { theme, wasmUrl: engine.wasmUrl })
      .then((h) => {
        if (!alive) return h.destroy();
        created = h;
        setHandle(h);
      })
      .catch(() => alive && setHandle(null));
    return () => {
      alive = false;
      created?.destroy();
      setHandle(null);
    };
    // o tema não afeta SQL/Mermaid: não recria a instância ao alternar
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [engine, dbml]);
  return handle;
}

function DiagramPane({ engine, dbml, height }: { engine: Engine; dbml: string; height: number }) {
  const { theme, lang, os, t } = useDocs();
  const ref = React.useRef<HTMLDivElement>(null);
  const handleRef = React.useRef<ReadonlyHandle | null>(null);

  const themeRef = React.useRef(theme);
  themeRef.current = theme;

  React.useEffect(() => {
    const host = ref.current;
    if (!host) return;
    // Cada montagem usa um elemento próprio: o StrictMode (e trocas rápidas de aba) montam e desmontam
    // em sequência, e o `destroy()` de uma instância limparia o elemento da seguinte se fosse o mesmo.
    const target = document.createElement("div");
    host.appendChild(target);
    let alive = true;
    engine.module
      .mountReadonly(target, dbml, { theme: themeRef.current, height, wasmUrl: engine.wasmUrl, lang, wheelZoom: WHEEL_ZOOM_MODE })
      .then((h) => {
        if (!alive) return h.destroy();
        handleRef.current = h;
        h.setTheme(themeRef.current);
      })
      .catch(() => undefined);
    return () => {
      alive = false;
      handleRef.current?.destroy();
      handleRef.current = null;
      target.remove();
    };
  }, [engine, dbml, height, lang]);

  React.useEffect(() => handleRef.current?.setTheme(theme), [theme]);

  return (
    <div className="relative">
      <div
        ref={ref}
        className="docs-diagram"
        style={{ height }}
      />
      <div className="pointer-events-none absolute left-2 bottom-2 [@media(pointer:coarse)]:hidden px-2 py-1 rounded-sm bg-background/85 border border-border font-mono text-[10px] text-muted-foreground">
        {os === "macos" ? t.wheelHintMac : t.wheelHint}
      </div>
      <button
        type="button"
        onClick={() => handleRef.current?.fit()}
        className="absolute right-2 bottom-2 inline-flex items-center gap-1.5 h-7 px-2 rounded-sm bg-background/90 border border-border text-[11px] text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <Maximize2 className="w-3 h-3" aria-hidden="true" />
        {t.fitView}
      </button>
    </div>
  );
}

function Placeholder({ height, message }: { height: number; message: string }) {
  return (
    <div className="flex items-center justify-center px-4 text-center text-xs text-muted-foreground bg-muted/40" style={{ height }} role="status">
      {message}
    </div>
  );
}

function SqlPane({ handle, initial, engineReady }: { handle: ReadonlyHandle | null; initial: SqlDialect; engineReady: boolean }) {
  const { t } = useDocs();
  const [dialect, setDialect] = React.useState<SqlDialect>(initial);
  const result = React.useMemo(() => {
    if (!handle) return null;
    try {
      return { ok: true as const, text: handle.toSql(dialect) };
    } catch {
      return { ok: false as const };
    }
  }, [handle, dialect]);
  return (
    <div>
      <div className="flex items-center gap-2 px-3 h-9 border-b border-border">
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground" aria-hidden="true">
          {t.dialect}
        </span>
        <select
          value={dialect}
          onChange={(event) => setDialect(event.target.value as SqlDialect)}
          aria-label={t.dialect}
          className="h-6 rounded-sm border border-border bg-background px-1.5 text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {SQL_DIALECTS.map((d) => (
            <option key={d} value={d}>
              {SQL_DIALECT_LABELS[d]}
            </option>
          ))}
        </select>
      </div>
      {result?.ok ? <CodeBlock className="my-0 border-0 rounded-none" code={result.text} lang="sql" label={SQL_DIALECT_LABELS[dialect]} /> : (
        <Placeholder height={120} message={result ? t.exportError : engineReady ? t.loading : t.engineLoading} />
      )}
    </div>
  );
}

/** Exemplo vivo de `exemplos/<arquivo>.dbml`: abas Código, Diagrama, SQL e Mermaid sobre o motor do produto. */
export function ExemploDbml({ arquivo, abas = [...EXAMPLE_TABS], altura = EXAMPLE_DEFAULT_HEIGHT_PX, dialeto = DEFAULT_DIALECT }: ExemploProps) {
  const { t, theme } = useDocs();
  const containerRef = React.useRef<HTMLDivElement>(null);
  const near = useNearViewport(containerRef);
  const { dbml, missing } = useDbmlSource(arquivo);
  const [engineState, setEngineState] = React.useState<EngineState>({ status: "idle" });
  const tabs = EXAMPLE_TABS.filter((tab) => abas.includes(tab));
  const [tab, setTab] = React.useState<ExampleTab>(tabs[0] ?? "codigo");
  const uid = React.useId();

  // O motor só carrega quando o exemplo se aproxima da tela.
  React.useEffect(() => {
    if (!near || engineState.status !== "idle") return;
    setEngineState({ status: "loading" });
    loadEngine().then(
      (engine) => setEngineState(engine ? { status: "ready", engine } : { status: "unavailable" }),
      () => setEngineState({ status: "unavailable" }),
    );
  }, [near, engineState.status]);

  const engine = engineState.status === "ready" ? engineState.engine : null;
  const headless = useHeadlessHandle(engine, dbml, theme);
  const engineMessage = engineState.status === "unavailable" ? t.engineUnavailable : t.engineLoading;

  if (missing) {
    return (
      <div className="my-5 border border-dashed border-signal-border bg-signal-soft/50 rounded-md px-4 py-3 text-sm text-signal">
        {t.exampleMissing} <code>{arquivo}</code>
      </div>
    );
  }

  const label: Record<ExampleTab, string> = { codigo: t.tabCode, diagrama: t.tabDiagram, sql: t.tabSql, mermaid: t.tabMermaid };
  const errors = headless?.diagnostics.filter((d) => d.severity === "error") ?? [];

  return (
    <div ref={containerRef} className="docs-example my-6 border border-border rounded-md bg-card">
      <Tabs value={tab} onValueChange={(value) => setTab(value as ExampleTab)}>
        <div className="flex flex-wrap items-center justify-between gap-x-2 border-b border-border bg-muted/60 rounded-t-md">
          <TabsList className="h-auto justify-start gap-0 rounded-none bg-transparent p-0">
            {tabs.map((id) => (
              <TabsTrigger
                key={id}
                value={id}
                id={`${uid}-trigger-${id}`}
                className="rounded-none px-4 py-2 text-[13px] border-r border-border focus-visible:ring-inset focus-visible:ring-offset-0 data-[state=active]:bg-card data-[state=active]:shadow-none data-[state=active]:font-semibold"
              >
                {label[id]}
              </TabsTrigger>
            ))}
          </TabsList>
          {dbml !== null ? (
            <div className="px-2 py-1">
              <OpenInEditor dbml={dbml} engine={engine} />
            </div>
          ) : null}
        </div>

        {tabs.includes("codigo") ? (
          <TabsContent value="codigo" className="m-0 overflow-hidden rounded-b-md">
            {dbml !== null ? <CodeBlock className="my-0 border-0 rounded-none" code={dbml} lang="dbml" label={`${arquivo}.dbml`} /> : <Placeholder height={altura} message={t.loading} />}
          </TabsContent>
        ) : null}

        {tabs.includes("diagrama") ? (
          <TabsContent value="diagrama" className="m-0 overflow-hidden rounded-b-md">
            {engine && dbml !== null ? <DiagramPane engine={engine} dbml={dbml} height={altura} /> : <Placeholder height={altura} message={engineMessage} />}
          </TabsContent>
        ) : null}

        {tabs.includes("sql") ? (
          <TabsContent value="sql" className="m-0 overflow-hidden rounded-b-md">
            <SqlPane handle={headless} initial={dialeto} engineReady={!!engine} />
          </TabsContent>
        ) : null}

        {tabs.includes("mermaid") ? (
          <TabsContent value="mermaid" className="m-0 overflow-hidden rounded-b-md">
            {headless ? <CodeBlock className="my-0 border-0 rounded-none" code={headless.toMermaid()} lang="mermaid" label="Mermaid erDiagram" /> : <Placeholder height={120} message={engineMessage} />}
          </TabsContent>
        ) : null}
      </Tabs>

      {errors.length > 0 ? (
        <ul className="border-t border-border px-4 py-2 text-xs text-signal space-y-0.5" aria-label={t.diagnostics}>
          {errors.map((d, i) => (
            <li key={i} className="font-mono">
              {d.line !== undefined ? `${d.line}: ` : ""}
              {d.message}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
