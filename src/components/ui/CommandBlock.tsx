import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";

type Status = "idle" | "copied" | "failed";

interface CommandBlockProps {
  /** The text to show and copy. For `shell`, omit the leading `$`. */
  command: string;
  /** `shell` shows a `$` prompt; other kinds show a small type tag instead. */
  kind?: "shell" | "dbml";
  /** Accessible name for the copy button, e.g. "Copy: Import SQL DDL". */
  copyLabel?: string;
}

export function CommandBlock({
  command,
  kind = "shell",
  copyLabel = "Copy command",
}: CommandBlockProps) {
  const [status, setStatus] = useState<Status>("idle");
  const timer = useRef<number | undefined>(undefined);
  const codeRef = useRef<HTMLElement>(null);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const flash = (next: Status) => {
    setStatus(next);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setStatus("idle"), 2000);
  };

  const selectText = () => {
    const node = codeRef.current;
    const selection = window.getSelection();
    if (!node || !selection) return;
    const range = document.createRange();
    range.selectNodeContents(node);
    selection.removeAllRanges();
    selection.addRange(range);
  };

  const copy = () => {
    const write = navigator.clipboard?.writeText(command);
    if (!write) {
      selectText();
      flash("failed");
      return;
    }
    write.then(
      () => flash("copied"),
      () => {
        // Insecure context or denied permission: select so Ctrl+C works.
        selectText();
        flash("failed");
      },
    );
  };

  const label =
    status === "copied"
      ? "Copied"
      : status === "failed"
        ? "Copy failed, press Ctrl+C"
        : copyLabel;

  return (
    <div className="flex items-stretch rounded border border-border bg-card font-mono text-xs text-foreground">
      <pre className="flex-1 min-w-0 p-3 whitespace-pre-wrap break-all sm:whitespace-pre sm:break-normal sm:overflow-x-auto">
        {kind === "shell" && (
          <span aria-hidden="true" className="select-none text-muted-foreground">
            ${" "}
          </span>
        )}
        <code ref={codeRef}>{command}</code>
      </pre>
      {kind !== "shell" && (
        <span
          aria-hidden="true"
          className="self-center select-none pr-2 text-xs uppercase tracking-[0.12em] text-muted-foreground"
        >
          {kind}
        </span>
      )}
      <button
        type="button"
        onClick={copy}
        aria-label={copyLabel}
        title={label}
        className="shrink-0 min-w-11 flex items-center justify-center border-l border-border text-muted-foreground hover:text-foreground hover:bg-secondary active:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal rounded-r"
      >
        {status === "copied" ? (
          <Check className="w-4 h-4 text-signal" aria-hidden="true" />
        ) : (
          <Copy className="w-4 h-4" aria-hidden="true" />
        )}
      </button>
      <span role="status" className="sr-only">
        {status === "idle" ? "" : label}
      </span>
    </div>
  );
}
