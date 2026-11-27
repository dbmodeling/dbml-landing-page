import * as React from "react";
import { Navigate, Route, Routes, useLocation, useParams } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { DEFAULT_PAGE, ROUTE_DOCS, SEARCH_PALETTE_KEY, SEARCH_SHORTCUT_KEY, SIDEBAR_WIDTH_CLASS, type DocLang } from "./constants";
import { hasContent, manifest } from "./content";
import { DocsProvider, useDocs } from "./context";
import { DocsPage } from "./DocsPage";
import { DocsSearch } from "./DocsSearch";
import { detectBrowserLang, isDocLang, pagePath, prevNext, resolvePage } from "./navigation";
import { Sidebar } from "./Sidebar";
import { LangSwitch, ModalitySwitch } from "./Switchers";
import { Toc, type TocEntry } from "./Toc";
import { useFocusTrap } from "./useFocusTrap";
import "./docs.css";

const browserLang = (): DocLang => detectBrowserLang(typeof navigator === "undefined" ? undefined : navigator.languages ?? [navigator.language]);

/** `/docs` -> idioma do navegador + primeira página. */
function DocsHome() {
  return <Navigate replace to={pagePath(browserLang(), DEFAULT_PAGE.secao, DEFAULT_PAGE.slug)} />;
}

/** `/docs/<lang>` -> primeira página nesse idioma. */
function LangHome() {
  const { lang } = useParams();
  return isDocLang(lang) ? <Navigate replace to={pagePath(lang, DEFAULT_PAGE.secao, DEFAULT_PAGE.slug)} /> : <Navigate replace to={ROUTE_DOCS} />;
}

function NotFound() {
  const { t } = useDocs();
  return (
    <div className="px-5 sm:px-10 py-16">
      <h1 className="text-3xl font-bold tracking-[-0.03em]">{t.pageNotFound}</h1>
      <p className="mt-3 text-muted-foreground max-w-[60ch]">{hasContent ? t.pageNotFoundBody : t.contentMissing}</p>
    </div>
  );
}

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t } = useDocs();
  const ref = React.useRef<HTMLDivElement>(null);
  useFocusTrap(ref, open, onClose);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[55] lg:hidden" role="presentation">
      <div className="absolute inset-0 bg-background/70 backdrop-blur-[2px]" onClick={onClose} aria-hidden="true" />
      <div ref={ref} role="dialog" aria-modal="true" aria-label={t.menu} className="absolute inset-y-0 left-0 w-[85vw] max-w-xs bg-background border-r border-border overflow-y-auto">
        <div className="flex items-center justify-between h-12 px-4 border-b border-border">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{t.menu}</span>
          <button type="button" onClick={onClose} aria-label={t.closeMenu} className="h-8 w-8 inline-flex items-center justify-center rounded-md hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
        <Sidebar manifest={manifest} onNavigate={onClose} />
      </div>
    </div>
  );
}

function Shell() {
  const { lang, contentLang, t } = useDocs();
  const { secao, slug } = useParams();
  const location = useLocation();
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [toc, setToc] = React.useState<TocEntry[]>([]);
  const resolved = secao && slug ? resolvePage(manifest, lang, secao, slug) : null;
  const seq = resolved ? prevNext(manifest, lang, resolved.page.secao, resolved.page.slug) : { prev: null, next: null };

  // `/` e Ctrl/⌘+K abrem a busca (o `/` só fora de campos de texto)
  React.useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const typing = !!target && (target.isContentEditable || /^(input|textarea|select)$/i.test(target.tagName));
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === SEARCH_PALETTE_KEY) {
        event.preventDefault();
        setSearchOpen(true);
      } else if (event.key === SEARCH_SHORTCUT_KEY && !typing && !event.ctrlKey && !event.metaKey && !event.altKey) {
        event.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // idioma e título do documento acompanham a página
  React.useEffect(() => {
    const root = document.documentElement;
    const previousLang = root.lang;
    root.lang = contentLang;
    document.title = resolved ? `${resolved.page.titulo} · DB Modeling ${t.docs}` : `${t.docs} · DB Modeling`;
    const meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const previousDescription = meta?.content;
    if (meta && resolved?.page.descricao) meta.content = resolved.page.descricao;
    return () => {
      root.lang = previousLang;
      if (meta && previousDescription !== undefined) meta.content = previousDescription;
    };
  }, [contentLang, resolved, t.docs]);

  React.useEffect(() => setMenuOpen(false), [location.pathname]);
  React.useEffect(() => setToc([]), [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-150">
      <Navbar
        variant="docs"
        docsSearch={{ onOpen: () => setSearchOpen(true), label: t.searchPlaceholder, placeholder: t.search, shortcut: "/" }}
      />
      <div className="flex-1 w-full max-w-6xl mx-auto border-x border-border bg-background">
        <div className="sticky top-12 z-40 flex flex-wrap items-center gap-x-3 gap-y-2 px-3 sm:px-6 py-2 border-b border-border bg-background/95 backdrop-blur-sm">
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label={t.menu}
            aria-haspopup="dialog"
            className="lg:hidden h-7 w-7 inline-flex items-center justify-center rounded-md border border-border text-foreground/80 hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Menu className="w-4 h-4" aria-hidden="true" />
          </button>
          {resolved?.page.usaModalidade ? <ModalitySwitch /> : null}
          <div className="ml-auto">
            <LangSwitch />
          </div>
        </div>

        <div className="grid lg:grid-cols-[15rem_minmax(0,1fr)] xl:grid-cols-[15rem_minmax(0,1fr)_13rem]">
          <aside className={`hidden lg:block border-r border-border ${SIDEBAR_WIDTH_CLASS} w-full`}>
            <div className="sticky top-[5.5rem] max-h-[calc(100vh-5.5rem)] overflow-y-auto">
              <Sidebar manifest={manifest} />
            </div>
          </aside>
          <main id="docs-main" className="min-w-0">
            {resolved ? <DocsPage manifest={manifest} resolved={resolved} prev={seq.prev} next={seq.next} onToc={setToc} /> : <NotFound />}
          </main>
          <aside className="hidden xl:block border-l border-border">
            <div className="sticky top-[5.5rem] max-h-[calc(100vh-5.5rem)] overflow-y-auto">
              <Toc entries={toc} />
            </div>
          </aside>
        </div>
      </div>
      <Footer />
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      <DocsSearch open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}

/** Rota `/docs/:lang/:secao/:slug`: valida o idioma, resolve fallback e monta o contexto. */
function DocsRoute() {
  const { lang, secao, slug } = useParams();
  if (!isDocLang(lang)) return <Navigate replace to={ROUTE_DOCS} />;
  const resolved = secao && slug ? resolvePage(manifest, lang, secao, slug) : null;
  return (
    <DocsProvider lang={lang} contentLang={resolved?.contentLang ?? lang}>
      <Shell />
    </DocsProvider>
  );
}

export default function DocsApp() {
  return (
    <Routes>
      <Route index element={<DocsHome />} />
      <Route path=":lang" element={<LangHome />} />
      <Route path=":lang/:secao/:slug" element={<DocsRoute />} />
      <Route path="*" element={<Navigate replace to={ROUTE_DOCS} />} />
    </Routes>
  );
}

