import type { ReactNode } from "react";

interface CellHeaderProps {
  /** Crimson index + name, e.g. "01 · Connect to a database". */
  label: ReactNode;
  /** Quiet right-hand detail: crate path, version, dependency. */
  meta?: ReactNode;
  /** Always put meta under the label (narrow cells). */
  stacked?: boolean;
}

/** Ledger cell header: label on the left, meta on the right (below on mobile). */
export function CellHeader({ label, meta, stacked = false }: CellHeaderProps) {
  return (
    <div
      className={`flex flex-col gap-0.5 font-mono text-xs ${
        stacked ? "" : "sm:flex-row sm:items-baseline sm:justify-between sm:gap-3"
      }`}
    >
      <span className="text-signal font-semibold">{label}</span>
      {meta && (
        <span
          className={`text-muted-foreground ${
            stacked ? "" : "sm:truncate sm:text-right"
          }`}
        >
          {meta}
        </span>
      )}
    </div>
  );
}
