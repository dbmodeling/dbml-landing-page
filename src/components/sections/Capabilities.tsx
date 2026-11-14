import { useState } from "react";
import { Check, Copy } from "lucide-react";

interface Capability {
  copyable?: boolean;
  index: string;
  label: string;
  meta: string;
  title: string;
  body: string;
  command: string;
}

const CAPABILITIES: Capability[] = [
  {
    index: "01",
    label: "Connect to a database",
    meta: "crates/db-introspect",
    title: "Reverse-engineer a live database into DBML",
    body: "Point the desktop app, web CLI, or VS Code at PostgreSQL, MySQL, SQL Server, or SQLite. The catalog is read with a read-only connection, one schema or all of them, and the password stays out of the URL via --password-stdin or DBML_PASSWORD.",
    command: "$ dbml import --url postgres://user@host/shop -o shop.dbml",
  },
  {
    index: "02",
    label: "Import SQL DDL",
    meta: "crates/sql-import",
    title: "Turn an existing .sql dump into a diagram",
    body: "A dedicated lexer and parser read CREATE TABLE, foreign keys, and indexes from PostgreSQL, MySQL / MariaDB, SQLite, SQL Server, and Oracle DDL, then emit clean DBML ready for the canvas.",
    command: "$ dbml import schema.sql --dialect mysql -o schema.dbml",
  },
  {
    index: "03",
    label: "Export SQL DDL",
    meta: "5 dialects",
    title: "Generate CREATE TABLE scripts from the model",
    body: "Tables are ordered by their foreign-key graph and written as CREATE TABLE, FOREIGN KEY, and CREATE INDEX statements for PostgreSQL, MySQL, SQLite, SQL Server, or Oracle.",
    command: "$ dbml export schema.dbml --format sql --dialect postgres",
  },
  {
    index: "04",
    label: "Export the diagram",
    meta: "crates/diagram-export",
    title: "SVG, PNG (2x), and Mermaid from the same layout",
    body: "Export exactly what is on the canvas as a vector SVG, a high-resolution PNG, or a Mermaid ER diagram for your docs, with optional title, color legend, and light or dark theme.",
    command: "Ctrl+K  →  Export diagram",
    copyable: false,
  },
  {
    index: "05",
    label: "Relations, in full",
    meta: "dbml-edit",
    title: "Edit cardinality and ON DELETE / ON UPDATE on the edge",
    body: "Select any Ref line to change 1:1, 1:N, N:1, or N:N and set its referential actions. Each change lands in the .dbml file as a minimal patch, comments and formatting untouched.",
    command: "Ref: orders.user_id > users.id [delete: cascade]",
  },
  {
    index: "06",
    label: "Schemas and linting",
    meta: "dbml-analysis",
    title: "Multiple schemas, checked as you type",
    body: "Schema-qualified tables such as sales.orders are supported end to end, and the linter flags problems like broken references and duplicate names in the editor while you model.",
    command: "Table sales.orders { id int [pk] }",
  },
];

export function Capabilities() {
  const [copied, setCopied] = useState<string | null>(null);

  const copy = (item: Capability) => {
    const text = item.command.replace(/^\$\s+/, "");
    void navigator.clipboard.writeText(text).then(() => {
      setCopied(item.index);
      window.setTimeout(
        () => setCopied((current) => (current === item.index ? null : current)),
        1500,
      );
    });
  };

  return (
    <section id="capabilities" className="border-b border-border bg-background">
      <div className="px-6 py-12 sm:py-16 border-b border-border text-center">
        <h2 className="text-3xl sm:text-5xl tracking-[-0.03em] leading-[1.12] font-light text-muted-foreground max-w-2xl mx-auto">
          From a live database{" "}
          <strong className="font-bold text-foreground">
            to a diagram and back
          </strong>
        </h2>
        <p className="mt-3 text-xs sm:text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed">
          New in v0.1.4: connect to a database, import and export SQL, and
          export diagrams as SVG, PNG, or Mermaid. Everything still runs
          locally, with <code className="font-mono text-foreground">.dbml</code>{" "}
          as the single source of truth.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {CAPABILITIES.map((item) => (
          <div
            key={item.index}
            className="p-6 sm:p-8 flex flex-col gap-2.5 border-b border-border md:border-r last:border-b-0 md:[&:nth-child(2n)]:border-r-0 md:[&:nth-last-child(-n+2)]:border-b-0 lg:[&:nth-child(2n)]:border-r lg:[&:nth-child(3n)]:border-r-0 lg:[&:nth-last-child(-n+3)]:border-b-0"
          >
            <div className="flex items-center justify-between gap-2 font-mono text-[11px]">
              <span className="text-signal font-semibold">
                {item.index} &middot; {item.label}
              </span>
              <span className="text-muted-foreground truncate">{item.meta}</span>
            </div>
            <h3 className="text-base font-bold text-foreground tracking-tight">
              {item.title}
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed flex-1">
              {item.body}
            </p>
            <div className="flex items-stretch rounded border border-border bg-card font-mono text-[11px] text-foreground">
              <pre className="flex-1 min-w-0 p-3 overflow-x-auto">
                <code>{item.command}</code>
              </pre>
              {item.copyable !== false && (
                <button
                  type="button"
                  onClick={() => copy(item)}
                  aria-label={
                    copied === item.index ? "Copied" : `Copy: ${item.label}`
                  }
                  title={copied === item.index ? "Copied" : "Copy"}
                  className="shrink-0 px-2.5 border-l border-border text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal rounded-r"
                >
                  {copied === item.index ? (
                    <Check className="w-3.5 h-3.5 text-signal" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
