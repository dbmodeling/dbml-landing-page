import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowLeft, ArrowRight, Languages } from "lucide-react";
import { loadPage } from "./content";
import { useDocs } from "./context";
import { NEWS_PAGE } from "./constants";
import { fill } from "./i18n";
import { mdxComponents } from "./mdx/components";
import { Novidades } from "./mdx/Novidades";
import { pagePath, type Manifest, type NavPage, type ResolvedPage } from "./navigation";
import { scrollToHashWhenReady } from "./scrollToHash";
import { collectToc, type TocEntry } from "./Toc";

class PageBoundary extends React.Component<{ message: string; children: React.ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? (
      <p role="alert" className="my-6 border border-dashed border-signal-border bg-signal-soft/50 rounded-md px-4 py-3 text-sm text-signal">
        {this.props.message}
      </p>
    ) : (
      this.props.children
    );
  }
}

/** Montado depois do MDX (dentro do mesmo `Suspense`): avisa o artigo que o conteúdo está no DOM. */
function Ready({ onReady }: { onReady: () => void }) {
  React.useLayoutEffect(onReady, [onReady]);
  return null;
}

function PrevNextLink({ nav, dir }: { nav: NavPage; dir: "prev" | "next" }) {
  const { lang, t } = useDocs();
  const next = dir === "next";
  return (
    <Link
      to={pagePath(lang, nav.page.secao, nav.page.slug)}
      rel={dir}
      className={`group flex-1 min-w-0 flex flex-col gap-0.5 border border-border rounded-md px-4 py-3 hover:border-foreground/40 hover:bg-muted/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${next ? "items-end text-right" : "items-start"}`}
    >
      <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
        {!next ? <ArrowLeft className="w-3 h-3" aria-hidden="true" /> : null}
        {next ? t.next : t.previous}
        {next ? <ArrowRight className="w-3 h-3" aria-hidden="true" /> : null}
      </span>
      <span className="text-sm font-semibold truncate max-w-full group-hover:text-signal transition-colors">{nav.page.titulo}</span>
    </Link>
  );
}

export interface DocsPageProps {
  manifest: Manifest;
  resolved: ResolvedPage;
  prev: NavPage | null;
  next: NavPage | null;
  onToc: (entries: TocEntry[]) => void;
}

/** Artigo MDX com título, avisos de idioma/modalidade, anterior/próximo e foco/âncora pós-navegação. */
export function DocsPage({ resolved, prev, next, onToc }: DocsPageProps) {
  const { t, modality } = useDocs();
  const { hash, pathname } = useLocation();
  const { page, contentLang, fallback } = resolved;
  const articleRef = React.useRef<HTMLElement>(null);
  const loader = loadPage(contentLang, page.secao, page.slug);
  const Content = React.useMemo(() => (loader ? React.lazy(loader) : null), [loader]);
  const [needsNews, setNeedsNews] = React.useState(false);
  const cancelScroll = React.useRef<() => void>(() => undefined);

  const onReady = React.useCallback(() => {
    const root = articleRef.current;
    onToc(collectToc(root));
    setNeedsNews(page.secao === NEWS_PAGE.secao && page.slug === NEWS_PAGE.slug && !root?.querySelector("[data-news]"));
    cancelScroll.current();
    cancelScroll.current = scrollToHashWhenReady(root, hash);
  }, [onToc, hash, page.secao, page.slug]);
  React.useEffect(() => () => cancelScroll.current(), []);

  // nova página sem âncora: volta ao topo e move o foco para o título (leitor de tela anuncia a mudança)
  React.useEffect(() => {
    if (!hash) window.scrollTo({ top: 0, behavior: "instant" });
    document.getElementById("docs-title")?.focus({ preventScroll: true });
  }, [pathname, hash]);

  const notCovered = page.modalidades.length > 0 && !page.modalidades.includes(modality);

  return (
    <article ref={articleRef} className="docs-article min-w-0 px-5 sm:px-10 py-8 sm:py-10 text-[15px]">
      {fallback ? (
        <div role="status" className="mb-6 flex items-start gap-3 border border-border border-l-2 border-l-signal bg-signal-soft/40 rounded-md px-4 py-3 text-sm">
          <Languages className="w-4 h-4 mt-0.5 text-signal shrink-0" aria-hidden="true" />
          <div>
            <strong className="font-semibold">{t.translationPending}</strong>
            <p className="my-0.5 text-muted-foreground">{t.translationPendingBody}</p>
          </div>
        </div>
      ) : null}

      <header className="mb-8 pb-6 border-b border-border">
        <h1 id="docs-title" tabIndex={-1} className="text-[2rem] sm:text-[2.25rem] font-bold tracking-[-0.03em] leading-[1.12] focus:outline-none">
          {page.titulo}
        </h1>
        {page.descricao ? <p className="mt-3 text-base font-light text-muted-foreground max-w-[65ch]">{page.descricao}</p> : null}
        {page.modalidades.length > 0 ? (
          <p className="mt-3 flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
            <span>{t.appliesTo}:</span>
            {page.modalidades.map((m) => (
              <span key={m} className="font-mono text-[10px] px-1.5 py-0.5 rounded-sm border border-border bg-muted">
                {t.modalities[m]}
              </span>
            ))}
          </p>
        ) : null}
        {notCovered ? <p className="mt-2 text-xs text-signal">{fill(t.notForModality, t.modalities[modality])}</p> : null}
      </header>

      <div className="docs-prose max-w-[72ch] [&>*:first-child]:mt-0">
        {Content ? (
          <PageBoundary key={pathname} message={t.contentError}>
            <React.Suspense fallback={<p className="text-sm text-muted-foreground" role="status">{t.loading}</p>}>
              <Content components={mdxComponents} />
              {needsNews ? <Novidades /> : null}
              <Ready onReady={onReady} />
            </React.Suspense>
          </PageBoundary>
        ) : (
          <p className="text-sm text-muted-foreground">{t.contentMissing}</p>
        )}
      </div>

      <nav aria-label={`${t.previous} / ${t.next}`} className="mt-14 pt-6 border-t border-border flex flex-col sm:flex-row gap-3">
        {prev ? <PrevNextLink nav={prev} dir="prev" /> : <span className="flex-1" />}
        {next ? <PrevNextLink nav={next} dir="next" /> : <span className="flex-1" />}
      </nav>
    </article>
  );
}
