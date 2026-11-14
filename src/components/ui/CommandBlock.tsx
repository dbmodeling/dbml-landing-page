import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";

interface CommandBlockProps {
  command: string;
  /** Accessible name for the copy button, e.g. "Copy: Import SQL DDL". */
  copyLabel?: string;
  copyable?: boolean;
}

export function CommandBlock({
  command,
  copyLabel = "Copy command",
  copyable = true,
}: CommandBlockProps) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = () => {
    // Drop the shell prompt so the pasted text runs as-is.
    const text = command.replace(/^\$\s+/, "");
    void navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <div className="flex items-stretch rounded border border-border bg-card font-mono text-[11px] text-foreground">
      <pre className="flex-1 min-w-0 p-3 overflow-x-auto">
        <code>{command}</code>
      </pre>
      {copyable && (
        <button
          type="button"
          onClick={copy}
          aria-label={copied ? "Copied" : copyLabel}
          title={copied ? "Copied" : "Copy"}
          className="shrink-0 px-2.5 border-l border-border text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal rounded-r"
        >
          {copied ? (
            <Check className="w-3.5 h-3.5 text-signal" />
          ) : (
            <Copy className="w-3.5 h-3.5" />
          )}
        </button>
      )}
    </div>
  );
}
