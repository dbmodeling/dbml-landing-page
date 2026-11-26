import { CommandBlock } from "@/components/ui/CommandBlock";
import { CellHeader } from "@/components/ui/CellHeader";
import { Keycap } from "@/components/ui/Keycap";

interface Capability {
  kind?: "shell" | "dbml" | "shortcut";
  index: string;
  label: string;
  meta: string;
  title: string;
  body: string;
  command: string;
  /** Illustrative excerpt of what the command produces. */
  output?: { label: string; text: string };
  /** Grid span on lg (6-column grid). */
  span: string;
}

const CAPABILITIES: Capability[] = [
  {
    index: "01",
    label: "Connect to a database",
    meta: "crates/db-introspect",
    title: "Reverse-engineer a live database into DBML",
    body: "Point the desktop app, web CLI, or VS Code at PostgreSQL, MySQL, SQL Server, or SQLite. The catalog is read with a read-only connection, and the password stays out of the URL via --password-stdin or DBML_PASSWORD.",
    command: "dbml import --url postgres://user@host/shop -o shop.dbml",
    output: {
      label: "shop.dbml (excerpt)",
      text: "Table orders {\n  id int [pk]\n  user_id int [ref: > users.id]\n  total decimal\n}",
    },
    span: "lg:col-span-6",
  },
  {
    index: "02",
    label: "Import SQL DDL",
    meta: "crates/sql-import",
    title: "Turn an existing .sql dump into a diagram",
    body: "Reads CREATE TABLE, foreign keys, and indexes from PostgreSQL, MySQL / MariaDB, SQLite, SQL Server, and Oracle DDL. Emits clean DBML ready for the canvas.",
    command: "dbml import schema.sql --dialect mysql -o schema.dbml",
    span: "lg:col-span-2",
  },
  {
    index: "03",
    label: "Export SQL DDL",
    meta: "5 dialects",
    title: "Generate CREATE TABLE scripts from the model",
    body: "Tables are ordered by their foreign-key graph. Output covers CREATE TABLE, FOREIGN KEY, and CREATE INDEX for PostgreSQL, MySQL, SQLite, SQL Server, or Oracle.",
    command: "dbml export schema.dbml --format sql --dialect postgres",
    span: "lg:col-span-2",
  },
  {
    index: "04",
    label: "Export the diagram",
    meta: "crates/diagram-export",
    title: "SVG, PNG (2x), and Mermaid from the same layout",
    body: "Export exactly what is on the canvas as SVG, PNG, or a Mermaid ER diagram, with optional title, color legend, and light or dark theme.",
    command: "Export diagram",
    kind: "shortcut",
    span: "lg:col-span-2",
  },
  {
    index: "05",
    label: "Relations, in full",
    meta: "dbml-edit",
    title: "Edit cardinality and ON DELETE / ON UPDATE on the edge",
    body: "Select any Ref line to change 1:1, 1:N, N:1, or N:N and set its referential actions. Each change lands in the .dbml file as a minimal patch.",
    command: "Ref: orders.user_id > users.id [delete: cascade]",
    kind: "dbml",
    span: "lg:col-span-3",
  },
  {
    index: "06",
    label: "Schemas and linting",
    meta: "dbml-analysis",
    title: "Multiple schemas, checked as you type",
    body: "Schema-qualified tables such as sales.orders work end to end. The linter flags broken references and duplicate names in the editor.",
    command: "Table sales.orders { id int [pk] }",
    kind: "dbml",
    span: "lg:col-span-3",
  },
];

export function Capabilities() {
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
          Connect to a database, import and export SQL, and export diagrams as
          SVG, PNG, or Mermaid. Everything runs locally, with{" "}
          <code className="font-mono text-foreground">.dbml</code> as the single
          source of truth.
        </p>
      </div>

      {/* gap-px over a border-colored ground draws the hairlines, no per-cell border rules */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-px bg-border">
        {CAPABILITIES.map((item) => (
          <div
            key={item.index}
            className={`p-6 sm:p-8 bg-background ${
              item.output ? "md:col-span-2" : ""
            } ${item.span}`}
          >
            <div
              className={
                item.output
                  ? "grid gap-6 lg:grid-cols-2 lg:gap-10 h-full"
                  : "h-full"
              }
            >
              <div className="flex flex-col gap-2.5 h-full">
                <CellHeader
                  label={
                    <>
                      {item.index} &middot; {item.label}
                    </>
                  }
                  meta={item.meta}
                  stacked={!item.output && item.span !== "lg:col-span-3"}
                />
                <h3
                  className={`font-bold text-foreground tracking-tight ${
                    item.output ? "text-xl sm:text-2xl" : "text-base"
                  }`}
                >
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                  {item.body}
                </p>
                {item.kind === "shortcut" ? (
                  <div className="flex items-center gap-1.5 rounded border border-border bg-card p-3 font-mono text-xs text-foreground">
                    <Keycap>Ctrl</Keycap>
                    <Keycap>K</Keycap>
                    <span aria-hidden="true" className="text-muted-foreground">
                      &rarr;
                    </span>
                    <span>{item.command}</span>
                  </div>
                ) : (
                  <CommandBlock
                    command={item.command}
                    kind={item.kind}
                    copyLabel={`Copy: ${item.label}`}
                  />
                )}
              </div>

              {item.output && (
                <figure className="flex flex-col gap-2 justify-end">
                  <figcaption className="font-mono text-xs text-muted-foreground">
                    Output &middot; {item.output.label}
                  </figcaption>
                  <pre className="rounded border border-border bg-card p-4 font-mono text-xs leading-relaxed text-foreground overflow-x-auto">
                    <code>{item.output.text}</code>
                  </pre>
                </figure>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
