import * as React from "react";
import { createPortal } from "react-dom";
import { Maximize2, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useDocs } from "../context";
import { useFocusTrap } from "../useFocusTrap";

export interface ZoomableImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src?: string;
  alt: string;
}

/** Imagem clicável que abre em visualização expandida (lightbox) com Esc, clique fora e retorno de foco. */
export function ZoomableImage({ src, alt, className, ...rest }: ZoomableImageProps) {
  const { t } = useDocs();
  const [open, setOpen] = React.useState(false);
  const dialogRef = React.useRef<HTMLDivElement>(null);
  const closeRef = React.useRef<HTMLButtonElement>(null);
  const close = React.useCallback(() => setOpen(false), []);

  useFocusTrap(dialogRef, open, close);

  React.useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  if (!src) return null;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={alt ? `${t.expandImage}: ${alt}` : t.expandImage}
        aria-haspopup="dialog"
        className="group relative block w-full text-left cursor-zoom-in rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className={cn(
            "w-full border border-border rounded-md bg-card transition-colors group-hover:border-foreground/40",
            className,
          )}
          {...rest}
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-2 bottom-2 inline-flex items-center gap-1 h-7 px-2 rounded-sm bg-background/90 border border-border text-[11px] text-muted-foreground opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity"
        >
          <Maximize2 className="w-3 h-3" />
          {t.expandImage}
        </span>
      </button>

      {open && typeof document !== "undefined"
        ? createPortal(
            <div
              className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-8"
              role="presentation"
            >
              <div
                className="absolute inset-0 bg-background/85 backdrop-blur-sm cursor-zoom-out"
                onClick={close}
                aria-hidden="true"
              />
              <div
                ref={dialogRef}
                role="dialog"
                aria-modal="true"
                aria-label={alt || t.expandImage}
                className="relative z-10 flex flex-col items-center max-w-[94vw] max-h-[92vh]"
              >
                <button
                  ref={closeRef}
                  type="button"
                  onClick={close}
                  aria-label={t.closeImage}
                  className="self-end mb-2 inline-flex items-center justify-center h-8 w-8 rounded-md border border-border bg-background/95 text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <X className="w-4 h-4" aria-hidden="true" />
                </button>
                <img
                  src={src}
                  alt={alt}
                  onClick={close}
                  className="max-w-[94vw] max-h-[82vh] w-auto h-auto object-contain rounded-md border border-border bg-card shadow-2xl cursor-zoom-out"
                />
                {alt ? (
                  <p className="mt-2.5 max-w-[72ch] text-center text-xs text-muted-foreground">
                    {alt}
                  </p>
                ) : null}
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
