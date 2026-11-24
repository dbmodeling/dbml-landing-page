import { useEffect, useRef, useState } from "react";
import { Maximize2, Pause, Play, X } from "lucide-react";

export function AppShowcase() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  // On mobile the video is a pure looping preview: no native or custom controls.
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  const [lightboxSrc, setLightboxSrc] = useState<{
    src: string;
    title: string;
  } | null>(null);

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      void video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  return (
    <section id="showcase" className="border-b border-border bg-background">
      {/* Centered Mixed-Weight Editorial Header */}
      <div className="px-6 py-12 sm:py-16 border-b border-border text-center">
        <h2 className="text-3xl sm:text-5xl tracking-[-0.03em] leading-[1.12] font-light text-muted-foreground max-w-2xl mx-auto">
          One visual workbench,{" "}
          <strong className="font-bold text-foreground">
            synchronized in real time
          </strong>
        </h2>
        <p className="mt-3 text-xs sm:text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed">
          Edit in the integrated DBML editor or directly on the canvas &mdash;{" "}
          <code className="font-mono text-foreground">dbml-edit</code> preserves
          every comment and{" "}
          <code className="font-mono text-foreground">layout::route</code>{" "}
          keeps orthogonal relations clean.
        </p>
      </div>

      {/* Live Video Walkthrough of the Real Workbench */}
      <div>
        <div className="h-10 px-4 border-b border-border bg-muted/50 flex items-center justify-between gap-2 font-mono text-xs select-none">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-signal-strong" />
            <span className="font-medium text-foreground">
              db-modeling &middot; example.dbml
            </span>
            <span className="text-xs text-muted-foreground hidden sm:inline">
              (Native GPUI Desktop)
            </span>
          </div>

          <button
            type="button"
            onClick={togglePlayback}
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded border border-border bg-card hover:bg-secondary text-xs text-foreground transition-colors"
            aria-label={isPlaying ? "Pause demo video" : "Play demo video"}
          >
            {isPlaying ? (
              <>
                <Pause className="w-3 h-3" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3" />
                <span>Play</span>
              </>
            )}
          </button>
        </div>

        <div className="bg-[#0c0c0e] p-3 sm:p-6">
          <div className="rounded border border-border overflow-hidden bg-[#121215]">
            <video
              ref={videoRef}
              src="/screenshots/video.mp4"
              poster="/screenshots/canvas-escuro.png"
              autoPlay
              loop
              muted
              playsInline
              controls={!isMobile}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              className="w-full h-auto block"
            />
          </div>
        </div>
      </div>

      {/* Real Application Captures (Architectural Ledger) */}
      <div className="border-t border-border">
        <div className="px-6 py-3 border-b border-border bg-muted/30 flex items-center justify-between text-xs text-muted-foreground">
          <span>
            Live captures from the unified{" "}
            <code className="font-mono text-foreground">db-modeling</code>{" "}
            workbench (Web CLI, VS Code &amp; Desktop GPUI).
          </span>
          <span className="font-mono text-xs hidden sm:inline">
            Click any capture to inspect full-screen
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border">
          <div className="p-6 space-y-3">
            <button
              type="button"
              onClick={() =>
                setLightboxSrc({
                  src: "/screenshots/canvas-escuro.png",
                  title: "ER Canvas — Dark Theme (store.dbml)",
                })
              }
              className="group relative block w-full rounded border border-border overflow-hidden bg-[#121215] text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal"
            >
              <img
                src="/screenshots/canvas-escuro.png"
                alt="DB Modeling workbench in dark theme showing the ER canvas with sales and catalog table groups and routed relations"
                className="w-full h-auto block transition-transform duration-200 group-hover:scale-[1.01]"
                loading="lazy"
              />
              <span className="absolute bottom-2.5 right-2.5 inline-flex items-center gap-1.5 px-2 py-1 rounded bg-background/90 border border-border font-mono text-[10px] text-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-3 h-3" />
                Inspect
              </span>
            </button>
            <div className="flex items-baseline justify-between gap-2">
              <h3 className="text-sm font-bold text-foreground tracking-tight">
                ER Canvas &amp; Schema Explorer (Dark)
              </h3>
              <span className="font-mono text-xs text-muted-foreground">
                store.dbml
              </span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Full schema explorer (<code className="font-mono">GROUPS</code>,{" "}
              <code className="font-mono">ENUMS</code> &amp;{" "}
              <code className="font-mono">RELATIONSHIPS</code>),{" "}
              <code className="font-mono">TableGroup</code> bounding boxes,
              floating tool rail, and routed edges with{" "}
              <code className="font-mono">1</code> /{" "}
              <code className="font-mono">N</code> cardinality badges.
            </p>
          </div>

          <div className="p-6 space-y-3">
            <button
              type="button"
              onClick={() =>
                setLightboxSrc({
                  src: "/screenshots/canvas-claro.png",
                  title: "ER Canvas — Light Theme (store.dbml)",
                })
              }
              className="group relative block w-full rounded border border-border overflow-hidden bg-[#f8f8fa] text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal"
            >
              <img
                src="/screenshots/canvas-claro.png"
                alt="DB Modeling workbench in light theme showing the ER canvas with sales and catalog table groups"
                className="w-full h-auto block transition-transform duration-200 group-hover:scale-[1.01]"
                loading="lazy"
              />
              <span className="absolute bottom-2.5 right-2.5 inline-flex items-center gap-1.5 px-2 py-1 rounded bg-background/90 border border-border font-mono text-[10px] text-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-3 h-3" />
                Inspect
              </span>
            </button>
            <div className="flex items-baseline justify-between gap-2">
              <h3 className="text-sm font-bold text-foreground tracking-tight">
                Light Theme Workbench
              </h3>
              <span className="font-mono text-xs text-muted-foreground">
                Ctrl+T
              </span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              First-class light and dark themes across Desktop, Web CLI, and VS
              Code, with matching high-resolution{" "}
              <code className="font-mono">PNG (2x)</code> and{" "}
              <code className="font-mono">SVG</code> diagram exports.
            </p>
          </div>
        </div>

        <div className="border-t border-border p-6 space-y-3">
          <button
            type="button"
            onClick={() =>
              setLightboxSrc({
                src: "/screenshots/editor-dbml.png",
                title: "Split View — DBML Editor & Live Diagram",
              })
            }
            className="group relative block w-full rounded border border-border overflow-hidden bg-[#121215] text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal"
          >
            <img
              src="/screenshots/editor-dbml.png"
              alt="DB Modeling workbench in split mode with the syntax-highlighted DBML editor and live ER diagram side by side"
              className="w-full h-auto block transition-transform duration-200 group-hover:scale-[1.005]"
              loading="lazy"
            />
            <span className="absolute bottom-2.5 right-2.5 inline-flex items-center gap-1.5 px-2 py-1 rounded bg-background/90 border border-border font-mono text-[10px] text-foreground opacity-0 group-hover:opacity-100 transition-opacity">
              <Maximize2 className="w-3 h-3" />
              Inspect
            </span>
          </button>
          <div className="flex items-baseline justify-between gap-2">
            <h3 className="text-sm font-bold text-foreground tracking-tight">
              Bidirectional DBML Editor &amp; Split View
            </h3>
            <span className="font-mono text-xs text-muted-foreground">
              Ctrl+E &middot; Ctrl+1/2
            </span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Edit pure <code className="font-mono">.dbml</code> source side by
            side with the live diagram &mdash; syntax highlighting, live sync
            status, and lossless{" "}
            <code className="font-mono">dbml-edit</code> patches keep text and
            canvas in lockstep without disturbing comments or formatting.
          </p>
        </div>
      </div>

      {/* Lightbox Modal for Full-Resolution Screenshot Inspection */}
      {lightboxSrc && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={lightboxSrc.title}
          onClick={() => setLightboxSrc(null)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-6xl w-full rounded-md border border-border bg-card overflow-hidden"
          >
            <div className="h-10 px-4 border-b border-border bg-muted/50 flex items-center justify-between font-mono text-xs">
              <span className="font-medium text-foreground">
                {lightboxSrc.title}
              </span>
              <button
                type="button"
                onClick={() => setLightboxSrc(null)}
                className="p-1 rounded hover:bg-secondary text-muted-foreground hover:text-foreground"
                aria-label="Close preview"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <img
              src={lightboxSrc.src}
              alt={lightboxSrc.title}
              className="w-full h-auto block"
            />
          </div>
        </div>
      )}
    </section>
  );
}
