import * as React from "react";
import { cn } from "@/lib/utils";
import { TOC_SCROLL_OFFSET_PX } from "./constants";
import { useDocs } from "./context";

export interface TocEntry {
  id: string;
  text: string;
  level: number;
}

/** Lê os títulos h2/h3 já renderizados no artigo (as âncoras vêm do `rehype-slug`). */
export function collectToc(root: HTMLElement | null): TocEntry[] {
  if (!root) return [];
  return [...root.querySelectorAll<HTMLElement>("h2[id], h3[id]")].map((el) => ({
    id: el.id,
    text: el.textContent?.trim() ?? el.id,
    level: el.tagName === "H2" ? 2 : 3,
  }));
}

/** Sumário da página; destaca a seção visível. */
export function Toc({ entries }: { entries: TocEntry[] }) {
  const { t } = useDocs();
  const [current, setCurrent] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!entries.length) return;
    const onScroll = () => {
      let active: string | null = entries[0].id;
      for (const entry of entries) {
        const el = document.getElementById(entry.id);
        if (el && el.getBoundingClientRect().top <= TOC_SCROLL_OFFSET_PX + 40) active = entry.id;
      }
      setCurrent(active);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [entries]);

  if (entries.length < 2) return null;
  return (
    <nav aria-label={t.tocLabel} className="docs-toc py-8 pl-6 pr-4">
      <h2 className="mb-2 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">{t.onThisPage}</h2>
      <ul className="border-l border-border">
        {entries.map((entry) => (
          <li key={entry.id}>
            <a
              href={`#${entry.id}`}
              aria-current={current === entry.id ? "location" : undefined}
              className={cn(
                "block -ml-px border-l py-1 text-xs leading-snug transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                entry.level === 3 ? "pl-6" : "pl-3",
                current === entry.id ? "border-signal text-foreground font-medium" : "border-transparent text-muted-foreground hover:text-foreground",
              )}
            >
              {entry.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
