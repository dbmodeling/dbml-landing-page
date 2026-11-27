import type { MDXComponents } from "mdx/types";
import { cn } from "@/lib/utils";
import { Aba, Abas } from "./Abas";
import { Atalho } from "./Atalho";
import { Aviso } from "./Aviso";
import { Captura } from "./Captura";
import { MdxPre } from "./CodeBlock";
import { DocLink } from "./DocLink";
import { ExemploDbml } from "./ExemploDbml";
import { makeHeading } from "./Heading";
import { Modalidade } from "./Modalidade";
import { Novidades } from "./Novidades";
import { RefAcoes } from "./RefAcoes";
import { RefCli } from "./RefCli";
import { RefVscode } from "./RefVscode";
import { TableScroll } from "./RefTable";
import { ZoomableImage } from "./ZoomableImage";

/** Componentes que o conteúdo MDX pode usar (contrato em `.scratch/central-de-documentacao/contrato.md`). */
export const mdxComponents: MDXComponents = {
  // componentes do contrato
  ExemploDbml,
  Atalho,
  Modalidade,
  Aviso,
  Abas,
  Aba,
  Captura,
  RefAcoes,
  RefCli,
  RefVscode,
  Novidades,
  // elementos Markdown
  h2: makeHeading(2),
  h3: makeHeading(3),
  h4: makeHeading(4),
  a: DocLink,
  pre: MdxPre,
  p: (props) => <p className="my-4 leading-[1.7]" {...props} />,
  ul: (props) => <ul className="my-4 pl-5 list-disc space-y-1.5 marker:text-muted-foreground" {...props} />,
  ol: (props) => <ol className="my-4 pl-5 list-decimal space-y-1.5 marker:text-muted-foreground marker:font-mono" {...props} />,
  li: (props) => <li className="leading-[1.7] pl-1 [&>p]:my-1" {...props} />,
  strong: (props) => <strong className="font-semibold text-foreground" {...props} />,
  blockquote: (props) => <blockquote className="my-5 border-l-2 border-border pl-4 text-muted-foreground" {...props} />,
  hr: () => <hr className="my-10 border-border" />,
  img: ({ alt, ...props }) => (
    <span className="block my-5">
      <ZoomableImage alt={alt ?? ""} {...props} />
    </span>
  ),
  code: ({ className, ...props }) => (
    // blocos cercados passam por `pre`; aqui só o inline
    <code
      className={cn(
        className ? "font-mono" : "font-mono text-[0.85em] px-1 py-0.5 rounded-sm border border-border bg-muted text-foreground tabular-nums break-words",
        className,
      )}
      {...props}
    />
  ),
  table: ({ children }) => (
    <TableScroll>
      <table className="w-full border-collapse text-[13px]">{children}</table>
    </TableScroll>
  ),
  th: (props) => <th className="px-3 py-2 text-left font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground bg-muted/60 border-b border-border" {...props} />,
  td: (props) => <td className="px-3 py-2 align-top border-b border-border/70 leading-snug [tr:last-child_&]:border-b-0" {...props} />,
};
