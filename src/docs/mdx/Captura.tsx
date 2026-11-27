import { ImageOff } from "lucide-react";
import { CAPTURE_MIME_VIDEO, CAPTURE_VARIANT } from "../constants";
import { captureUrl, findScene } from "../content";
import { useDocs } from "../context";
import { ZoomableImage } from "./ZoomableImage";

/** Captura da cena em `capturas/cenas.json`; escolhe a variante do tema do site. Sem arquivo: placeholder. */
export function Captura({ cena, alt }: { cena: string; alt: string }) {
  const { theme, lang, t } = useDocs();
  const scene = findScene(cena);
  const variant = CAPTURE_VARIANT[theme];
  const png = captureUrl(scene, cena, variant, "png", lang);
  const video = scene?.animacao ? captureUrl(scene, cena, variant, CAPTURE_MIME_VIDEO, lang) : undefined;

  if (!png && !video) {
    return (
      <figure
        role="img"
        aria-label={`${t.captureMissing}: ${alt}`}
        className="docs-capture-missing my-5 flex items-center gap-3 border border-dashed border-border rounded-md bg-muted/40 px-4 py-6 text-sm text-muted-foreground"
      >
        <ImageOff className="w-4 h-4 shrink-0" aria-hidden="true" />
        <figcaption className="min-w-0">{alt}</figcaption>
      </figure>
    );
  }

  const reduceMotion = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  return (
    <figure className="docs-capture my-5">
      {video && !reduceMotion ? (
        <video src={video} poster={png} muted loop playsInline autoPlay controls aria-label={alt} className="w-full border border-border rounded-md" />
      ) : (
        <ZoomableImage src={png} alt={alt} />
      )}
    </figure>
  );
}
