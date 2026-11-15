import { CommandBlock } from "@/components/ui/CommandBlock";
import { CellHeader } from "@/components/ui/CellHeader";

const ARCHITECTURE_TREE_NARROW = `Rust core crates
  schema · dbml-syntax
  layout · dbml-analysis
  dbml-edit · sql-import
  db-introspect
  diagram-export
   │ native       │ wasm
   ▼              ▼
 crates/app    dbml-wasm
 (GPUI)           │
                  ▼
             canvas-web
              │       │
              ▼       ▼
         crates/cli  vscode-
         HTTP + WS   extension`;

const ARCHITECTURE_TREE =`┌──────────────────────────────────────────────┐
│               Rust Core Crates               │
│  schema · dbml-syntax (Rowan CST) · layout   │
│  dbml-analysis (lint/complete) · dbml-edit   │
│  sql-import · db-introspect · diagram-export │
└───────┬──────────────────────────────┬───────┘
        │ Native Rust                  │ WebAssembly
        ▼                              ▼
┌───────────────────┐        ┌───────────────────┐
│    crates/app     │        │ crates/dbml-wasm  │
│ Desktop App (GPUI)│        └─────────┬─────────┘
└───────────────────┘                  │
                                       ▼
                             ┌───────────────────┐
                             │packages/canvas-web│
                             │Shared Workbench UI│
                             └────┬─────────┬────┘
                                  │         │
                        ┌─────────┘         └─────────┐
                        ▼                             ▼
              ┌───────────────────┐         ┌───────────────────┐
              │    crates/cli     │         │ vscode-extension  │
              │ HTTP + WS Server  │         │Custom Editor VSIX │
              └───────────────────┘         └───────────────────┘`;

export function GpuiArchitecture() {
  return (
    <section id="architecture" className="border-b border-border bg-background">
      {/* Centered Mixed-Weight Editorial Header ("The same thing, for real" parallel) */}
      <div className="px-6 py-12 sm:py-16 border-b border-border text-center">
        <h2 className="text-3xl sm:text-5xl tracking-[-0.03em] leading-[1.12] font-light text-muted-foreground max-w-2xl mx-auto">
          The same workbench,{" "}
          <strong className="font-bold text-foreground">for real</strong>
        </h2>
        <p className="mt-3 text-xs sm:text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed">
          Three execution targets, one unified Rust + WebAssembly
          architecture. Every target runs the exact same parser, layout
          engine, and CST patcher.
        </p>
      </div>

      {/* Two-Column Architectural Ledger */}
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Left Column: The 3 Real Execution Targets from README.md */}
        <div className="lg:col-span-6 lg:border-r border-b lg:border-b-0 border-border divide-y divide-border flex flex-col justify-between">
          {/* Target 1: Native Desktop App */}
          <div className="p-6 sm:p-8 space-y-2.5">
            <CellHeader
              label={<>01 &middot; Native Desktop App (crates/app)</>}
              meta="gpui-kit = 0.8.0"
            />
            <h3 className="text-base font-bold text-foreground tracking-tight">
              GPU-accelerated desktop binary for Linux, macOS &amp; Windows
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Renders the full workbench natively via GPUI with embedded Inter
              fonts, custom keybinding contexts (<code className="font-mono text-foreground">Shell</code> &amp;{" "}
              <code className="font-mono text-foreground">Canvas</code>), and
              automated packaging scripts for <code className="font-mono text-foreground">.deb</code>,{" "}
              <code className="font-mono text-foreground">.rpm</code>,{" "}
              <code className="font-mono text-foreground">.dmg</code>, and{" "}
              <code className="font-mono text-foreground">.exe/.msi</code>.
            </p>
            <CommandBlock
              command="curl -fsSL https://github.com/dbmodeling/dbml/releases/latest/download/db-modeling-install.sh | bash"
              copyLabel="Copy: install on Linux"
            />
            <p className="text-xs text-muted-foreground">
              Or grab the .dmg, .exe, .deb, or .rpm from Releases. From source:
            </p>
            <CommandBlock
              command="cargo run -p app --release -- path/to/schema.dbml"
              copyLabel="Copy: run the desktop app from source"
            />
          </div>

          {/* Target 2: Interactive Web CLI */}
          <div className="p-6 sm:p-8 space-y-2.5">
            <CellHeader
              label={<>02 &middot; Interactive Web CLI (crates/cli)</>}
              meta="axum 0.8 + notify 8"
            />
            <h3 className="text-base font-bold text-foreground tracking-tight">
              Local HTTP + WebSocket server with live two-way disk persistence
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Launches an instant local server that watches your{" "}
              <code className="font-mono text-foreground">.dbml</code> file on
              disk and syncs edits in real time between your terminal, browser,
              and deterministic{" "}
              <code className="font-mono text-foreground">.dbml.layout.json</code>{" "}
              sidecar.
            </p>
            <CommandBlock
              command="dbml path/to/schema.dbml --port 3000 --theme dark"
              copyLabel="Copy: run the web CLI"
            />
          </div>

          {/* Target 3: VS Code Extension */}
          <div className="p-6 sm:p-8 space-y-2.5">
            <CellHeader
              label={<>03 &middot; VS Code Extension (vscode-extension/)</>}
              meta="dbmodeling.editor"
            />
            <h3 className="text-base font-bold text-foreground tracking-tight">
              Custom Editor VSIX &amp; Activity Bar sidebar inside VS Code
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Registers a native VS Code Custom Editor for{" "}
              <code className="font-mono text-foreground">*.dbml</code> files and
              an Activity Bar schema explorer powered by{" "}
              <code className="font-mono text-foreground">crates/dbml-wasm</code>{" "}
              and <code className="font-mono text-foreground">@dbmodeling/canvas-web</code>.
            </p>
            <CommandBlock
              command="cd vscode-extension && npm run compile && npx @vscode/vsce package"
              copyLabel="Copy: package the VS Code extension"
            />
          </div>
        </div>

        {/* Right Column: Official Multi-Target Architecture Diagram & Sidecar Guarantees */}
        <div className="lg:col-span-6 flex flex-col justify-between divide-y divide-border bg-card/30">
          <div className="p-6 sm:p-8 space-y-3">
            <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between font-mono text-xs">
              <span className="text-foreground font-bold font-sans text-xs">
                Multi-Target Rust + WebAssembly Pipeline
              </span>
              <span className="text-muted-foreground">Rust edition 2024</span>
            </div>

            <pre
              role="img"
              aria-label="Rust core crates compile natively to the desktop app and to WebAssembly, which powers the shared canvas, the web CLI, and the VS Code extension."
              className="p-4 rounded border border-border bg-card font-mono text-xs leading-[1.45] text-foreground overflow-x-auto hidden sm:block"
            >
              <code>{ARCHITECTURE_TREE}</code>
            </pre>
            <pre
              role="img"
              aria-label="Rust core crates compile natively to the desktop app and to WebAssembly, which powers the shared canvas, the web CLI, and the VS Code extension."
              className="p-4 rounded border border-border bg-card font-mono text-xs leading-[1.45] text-foreground overflow-x-auto sm:hidden"
            >
              <code>{ARCHITECTURE_TREE_NARROW}</code>
            </pre>
          </div>

          <div className="p-6 sm:p-8 space-y-3">
            <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between font-mono text-xs">
              <span className="text-foreground font-bold font-sans text-xs">
                Strict DBML + Deterministic Sidecar
              </span>
              <span className="text-muted-foreground">dbdiagram.io compatible</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Your <code className="font-mono text-foreground">.dbml</code> files
              remain 100% pure without proprietary comment metadata. Positions
              and custom colors are saved in{" "}
              <code className="font-mono text-foreground">
                &lt;file&gt;.dbml.layout.json
              </code>{" "}
              with sorted keys for clean Git diffs, and diagrams export to{" "}
              <strong className="text-foreground">PNG (2x)</strong>,{" "}
              <strong className="text-foreground">SVG</strong>, and{" "}
              <strong className="text-foreground">Mermaid</strong> with optional
              title and color legend.
            </p>
          </div>

          <div className="px-6 sm:px-8 py-4 bg-signal-soft border-t border-signal-border text-xs flex flex-wrap items-center justify-between gap-2 font-mono">
            <span className="text-signal font-semibold">
              &rarr; Synchronized build: ./scripts/sync-build.sh --release
            </span>
            <span className="text-muted-foreground text-xs">v0.1.4 &middot; MIT</span>
          </div>
        </div>
      </div>
    </section>
  );
}
