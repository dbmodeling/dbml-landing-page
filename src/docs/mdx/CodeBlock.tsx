import * as React from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";
import { COPY_FEEDBACK_MS } from "../constants";
import { useDocs } from "../context";
import { tokenize, type TokenKind } from "../highlight";

const TOKEN_CLASS: Record<TokenKind, string> = {
  kw: "docs-tok-kw",
  con: "docs-tok-con",
  ty: "docs-tok-ty",
  str: "docs-tok-str",
  com: "docs-tok-com",
  num: "docs-tok-num",
  fn: "docs-tok-fn",
  plain: "",
};

type CopyStatus = "idle" | "copied" | "failed";

/** Copia texto e devolve o estado para o rótulo do botão; cai para "selecione e copie". */
export function useCopy(text: string | (() => string)) {
  const [status, setStatus] = React.useState<CopyStatus>("idle");
  const timer = React.useRef<number | undefined>(undefined);
  React.useEffect(() => () => window.clearTimeout(timer.current), []);
  const copy = React.useCallback(() => {
    const value = typeof text === "function" ? text() : text;
    const flash = (next: CopyStatus) => {
      setStatus(next);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setStatus("idle"), COPY_FEEDBACK_MS);
    };
    const write = navigator.clipboard?.writeText(value);
    if (!write) return flash("failed");
    write.then(() => flash("copied"), () => flash("failed"));
  }, [text]);
  return { status, copy };
}

export function CopyButton({ text, className }: { text: string | (() => string); className?: string }) {
  const { t } = useDocs();
  const { status, copy } = useCopy(text);
  const label = status === "copied" ? t.copied : status === "failed" ? t.copyFailed : t.copy;
  return (
    <button
      type="button"
      onClick={copy}
      className={cn(
        "inline-flex items-center gap-1.5 h-6 px-2 rounded-sm font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className,
      )}
    >
      {status === "copied" ? <Check className="w-3 h-3 text-signal" aria-hidden="true" /> : <Copy className="w-3 h-3" aria-hidden="true" />}
      <span aria-live="polite">{label}</span>
    </button>
  );
}

export function HighlightedCode({ code, lang }: { code: string; lang?: string }) {
  const tokens = React.useMemo(() => tokenize(code, lang), [code, lang]);
  return (
    <code className={cn("font-mono tabular-nums", lang && `language-${lang}`)}>
      {tokens.map((token, i) =>
        token.kind === "plain" ? token.text : (
          <span key={i} className={TOKEN_CLASS[token.kind]}>
            {token.text}
          </span>
        ),
      )}
    </code>
  );
}

export interface CodeBlockProps {
  code: string;
  lang?: string;
  /** Rótulo no topo (padrão: a linguagem). */
  label?: string;
  className?: string;
}

/** Bloco de código com cabeçalho (linguagem), destaque e botão copiar. */
export function CodeBlock({ code, lang, label, className }: CodeBlockProps) {
  const text = code.replace(/\n$/, "");
  return (
    <figure className={cn("docs-codeblock my-5 border border-border rounded-md bg-card overflow-hidden", className)}>
      <figcaption className="flex items-center justify-between gap-2 h-8 pl-3 pr-1.5 border-b border-border bg-muted/60">
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">{label ?? lang ?? "text"}</span>
        <CopyButton text={text} />
      </figcaption>
      {/* tabIndex permite rolar blocos largos pelo teclado */}
      <pre tabIndex={0} className="overflow-x-auto px-4 py-3 text-[13px] leading-[1.65] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring">
        <HighlightedCode code={text} lang={lang} />
      </pre>
    </figure>
  );
}

/** `pre` do MDX: extrai o texto e a linguagem do `<code className="language-x">` filho. */
export function MdxPre({ children }: { children?: React.ReactNode }) {
  const child = React.Children.toArray(children)[0] as React.ReactElement<{ className?: string; children?: React.ReactNode }> | undefined;
  const lang = child?.props?.className?.match(/language-([\w-]+)/)?.[1];
  const raw = child?.props?.children;
  const code = typeof raw === "string" ? raw : React.Children.toArray(raw).join("");
  return <CodeBlock code={code} lang={lang} />;
}
