import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useDocs } from "./context";
import { buildNav, pagePath, type Manifest, type NavPage } from "./navigation";

const SECTION_TITLES: Record<string, Record<string, string>> = {
  "pt-BR": { comecar: "Começar", guias: "Guias", referencia: "Referência", ajuda: "Ajuda" },
  en: { comecar: "Get started", guias: "Guides", referencia: "Reference", ajuda: "Help" },
};

function Item({ nav, child, onNavigate }: { nav: NavPage; child?: boolean; onNavigate?: () => void }) {
  const { lang, modality, t } = useDocs();
  const mods = nav.page.modalidades;
  const otherModality = mods.length > 0 && !mods.includes(modality);
  const title = otherModality ? `${t.appliesTo}: ${mods.map((m) => t.modalities[m]).join(", ")}` : undefined;
  return (
    <NavLink
      to={pagePath(lang, nav.page.secao, nav.page.slug)}
      onClick={onNavigate}
      title={title}
      className={({ isActive }) =>
        cn(
          "block border-l -ml-px py-1.5 text-[13px] leading-snug transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset",
          child ? "pl-6" : "pl-4",
          isActive
            ? "border-signal text-foreground font-semibold bg-signal-soft/40"
            : otherModality
              ? "border-transparent text-muted-foreground/55 hover:text-foreground hover:border-border"
              : "border-transparent text-muted-foreground hover:text-foreground hover:border-border",
        )
      }
    >
      {nav.page.titulo}
      {nav.pending ? <span className="ml-1.5 font-mono text-[9px] uppercase tracking-wider text-muted-foreground/70">pt-BR</span> : null}
    </NavLink>
  );
}

/** Seções (Começar, Guias, Referência, Ajuda) ordenadas por `ordem`; a página atual fica destacada. */
export function Sidebar({ manifest, onNavigate }: { manifest: Manifest; onNavigate?: () => void }) {
  const { lang, t } = useDocs();
  const nav = buildNav(manifest, lang);
  return (
    <nav aria-label={t.sidebarLabel} className="docs-sidebar py-5 pr-3">
      {nav.map((section) => (
        <div key={section.secao} className="mb-6">
          <h2 className="px-4 mb-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
            {SECTION_TITLES[lang][section.secao]}
          </h2>
          <ul className="ml-4 border-l border-border">
            {section.items.map((item) => (
              <li key={item.page.slug}>
                <Item nav={item} onNavigate={onNavigate} />
                {item.children.length ? (
                  <ul>
                    {item.children.map((child) => (
                      <li key={child.page.slug}>
                        <Item nav={child} child onNavigate={onNavigate} />
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}
