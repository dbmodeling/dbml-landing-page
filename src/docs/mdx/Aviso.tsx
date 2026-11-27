import * as React from "react";
import { Info, Lightbulb, OctagonAlert, TriangleAlert, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { NOTICE_KINDS, type NoticeKind } from "../constants";
import { useDocs } from "../context";

const ICONS: Record<NoticeKind, LucideIcon> = {
  info: Info,
  dica: Lightbulb,
  cuidado: TriangleAlert,
  perigo: OctagonAlert,
};

// Crimson é raro (regra do design): só cuidado/perigo o usam; info e dica ficam neutros.
const KIND_CLASS: Record<NoticeKind, string> = {
  info: "border-l-border bg-muted/50",
  dica: "border-l-[hsl(var(--syntax-emerald))] bg-muted/50",
  cuidado: "border-l-signal bg-signal-soft/50",
  perigo: "border-l-signal-strong bg-signal-soft",
};

export function Aviso({ tipo = "info", children }: { tipo?: NoticeKind; children?: React.ReactNode }) {
  const { t } = useDocs();
  const kind: NoticeKind = (NOTICE_KINDS as readonly string[]).includes(tipo) ? tipo : "info";
  const Icon = ICONS[kind];
  return (
    <aside
      role="note"
      aria-label={t.notices[kind]}
      className={cn("docs-notice my-5 flex gap-3 border border-border border-l-2 rounded-md px-4 py-3 text-sm", KIND_CLASS[kind])}
    >
      <Icon className={cn("w-4 h-4 mt-0.5 shrink-0", kind === "info" ? "text-muted-foreground" : kind === "dica" ? "text-[hsl(var(--syntax-emerald))]" : "text-signal")} aria-hidden="true" />
      <div className="min-w-0 [&>p]:my-0 [&>p+p]:mt-2">{children}</div>
    </aside>
  );
}
