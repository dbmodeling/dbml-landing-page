import * as React from "react";
import { cn } from "@/lib/utils";
import { ANCHOR_ROW_ATTR } from "../constants";
import { AnchorLink } from "./Heading";

/** Tabela de referência rolável na horizontal (em telas estreitas, sem quebrar o layout). */
export function TableScroll({ children, label }: { children: React.ReactNode; label?: string }) {
  return (
    <div
      role="region"
      aria-label={label}
      tabIndex={0}
      className="docs-table-scroll my-5 overflow-x-auto border border-border rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      {children}
    </div>
  );
}

export const Th = ({ className, ...props }: React.ThHTMLAttributes<HTMLTableCellElement>) => (
  <th scope="col" className={cn("px-3 py-2 text-left font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground bg-muted/60 border-b border-border whitespace-nowrap", className)} {...props} />
);

export const Td = ({ className, ...props }: React.TdHTMLAttributes<HTMLTableCellElement>) => (
  <td className={cn("px-3 py-2 align-top border-b border-border/70 text-[13px] leading-snug", className)} {...props} />
);

/** Linha com âncora estável e copiável (`id` + botão no primeiro campo). */
export function AnchorRow({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <tr id={id} {...{ [ANCHOR_ROW_ATTR]: "" }} className="group scroll-mt-28 hover:bg-muted/40 [&:last-child>td]:border-b-0">
      {children}
      <td className="sticky right-0 w-8 px-1 py-2 align-top border-b border-border/70 bg-card">
        <AnchorLink id={id} />
      </td>
    </tr>
  );
}

export const Mono = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <code className={cn("font-mono text-[12px] tabular-nums", className)}>{children}</code>
);
