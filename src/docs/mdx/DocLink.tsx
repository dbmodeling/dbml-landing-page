import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import { resolveHref } from "../navigation";

/** `a` do MDX: links relativos navegam pelo roteador; externos abrem em nova aba. */
export function DocLink({ href = "", children, ...rest }: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const { pathname } = useLocation();
  const resolved = resolveHref(href, pathname);
  const className = "text-signal underline decoration-signal/40 hover:decoration-signal underline-offset-4 transition-colors";
  if (resolved.kind === "external") {
    return (
      <a {...rest} href={resolved.href} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
        <ExternalLink className="inline-block w-3 h-3 ml-0.5 -mt-0.5 opacity-70" aria-hidden="true" />
      </a>
    );
  }
  if (resolved.kind === "anchor") {
    return (
      <a {...rest} href={resolved.href} className={className}>
        {children}
      </a>
    );
  }
  return (
    <Link to={resolved.href} className={className}>
      {children}
    </Link>
  );
}
