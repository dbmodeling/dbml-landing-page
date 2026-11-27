import * as React from "react";
import { Link2 } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useDocs } from "../context";
import { useCopy } from "./CodeBlock";

const LEVEL_CLASS: Record<2 | 3 | 4, string> = {
  2: "mt-12 mb-3 pt-6 border-t border-border text-[1.375rem] font-bold tracking-[-0.02em] leading-tight",
  3: "mt-8 mb-2 text-base font-bold tracking-[-0.015em] leading-snug",
  4: "mt-6 mb-1.5 text-sm font-bold leading-snug",
};

/** Botão de âncora copiável: copia a URL completa e a põe na barra de endereço. */
export function AnchorLink({ id, className }: { id: string; className?: string }) {
  const { t } = useDocs();
  const location = useLocation();
  const navigate = useNavigate();
  const url = () => `${window.location.origin}${location.pathname}#${id}`;
  const { status, copy } = useCopy(url);
  return (
    <a
      href={`#${id}`}
      onClick={(event) => {
        event.preventDefault();
        navigate({ pathname: location.pathname, hash: `#${id}` }, { replace: true });
        copy();
      }}
      aria-label={status === "copied" ? t.linkCopied : t.copyLink}
      title={status === "copied" ? t.linkCopied : t.copyLink}
      className={cn(
        "docs-anchor inline-flex items-center justify-center w-6 h-6 rounded-sm text-muted-foreground opacity-0 group-hover:opacity-100 focus-visible:opacity-100 hover:text-signal transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        status === "copied" && "opacity-100 text-signal",
        className,
      )}
    >
      <Link2 className="w-3.5 h-3.5" aria-hidden="true" />
    </a>
  );
}

export function makeHeading(level: 2 | 3 | 4) {
  const Tag = `h${level}` as const;
  return function MdxHeading({ id, children }: { id?: string; children?: React.ReactNode }) {
    return (
      <Tag id={id} className={cn("group scroll-mt-28 flex items-center gap-1.5", LEVEL_CLASS[level])}>
        <span>{children}</span>
        {id ? <AnchorLink id={id} /> : null}
      </Tag>
    );
  };
}
