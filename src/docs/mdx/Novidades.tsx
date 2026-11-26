import { loadProductGuide, guideLangKey } from "../content";
import { CHANGELOG_KINDS, type ChangelogKind } from "../constants";
import { useDocs } from "../context";
import { cn } from "@/lib/utils";
import { useAsync } from "./useAsync";

const KIND_CLASS: Record<ChangelogKind, string> = {
  added: "border-[hsl(var(--syntax-emerald))]/40 text-[hsl(var(--syntax-emerald))]",
  improved: "border-[hsl(var(--syntax-sky))]/40 text-[hsl(var(--syntax-sky))]",
  fixed: "border-signal-border bg-signal-soft text-signal",
};

const isKind = (kind: string): kind is ChangelogKind => (CHANGELOG_KINDS as readonly string[]).includes(kind);

/** Histórico de versões a partir de `assets/product-guide.json` (o mesmo que alimenta "Novidades" no app). */
export function Novidades() {
  const { t, contentLang } = useDocs();
  const guide = useAsync(loadProductGuide);
  const key = guideLangKey(contentLang);
  const label: Record<ChangelogKind, string> = { added: t.newsAdded, improved: t.newsImproved, fixed: t.newsFixed };
  if (!guide.done) return <p data-news="" className="text-sm text-muted-foreground">{t.loading}</p>;
  const releases = guide.data?.releases ?? [];
  if (!releases.length) return <p data-news="" className="text-sm text-muted-foreground">{t.newsEmpty}</p>;
  return (
    <div data-news="" className="docs-news not-prose">
      {releases.map((release) => (
        <section key={release.version} aria-labelledby={`v-${release.version}`} className="mt-8 border-t border-border pt-5">
          <h2 id={`v-${release.version}`} className="flex items-baseline gap-3 text-[1.25rem] font-bold tracking-[-0.02em]">
            <span className="font-mono tabular-nums">v{release.version}</span>
            <time dateTime={release.date} className="font-mono text-xs font-normal text-muted-foreground tabular-nums">
              {release.date}
            </time>
          </h2>
          <ul className="mt-3 space-y-4">
            {release.highlights.map((item, i) => (
              <li key={i} className="flex gap-3">
                <span
                  className={cn(
                    "mt-0.5 h-5 w-24 shrink-0 inline-flex items-center justify-center px-1.5 rounded-sm border font-mono text-[10px] uppercase tracking-[0.1em]",
                    isKind(item.kind) ? KIND_CLASS[item.kind] : "border-border text-muted-foreground",
                  )}
                >
                  {isKind(item.kind) ? label[item.kind] : item.kind}
                </span>
                <div className="min-w-0">
                  <div className="font-semibold">{item.title[key] ?? item.title.en}</div>
                  <p className="my-1 text-sm text-muted-foreground">{item.detail[key] ?? item.detail.en}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
