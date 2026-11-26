import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { DOC_LANGS, MODALITIES } from "./constants";
import { useDocs } from "./context";
import { switchLangPath } from "./navigation";

const SEGMENT_BASE =
  "h-7 px-2.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring";
const SEGMENT_ON = "bg-foreground text-background";
const SEGMENT_OFF = "text-muted-foreground hover:text-foreground hover:bg-secondary";

/** Seletor Desktop/Web/VS Code: controla `<Modalidade>` e `<Atalho>` e persiste a escolha. */
export function ModalitySwitch() {
  const { modality, setModality, t } = useDocs();
  return (
    <div className="inline-flex items-center gap-2">
      <span className="hidden sm:inline font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground" aria-hidden="true">
        {t.modalityLabel}
      </span>
      <div role="group" aria-label={t.modalityLabel} className="inline-flex items-center rounded-md border border-border overflow-hidden divide-x divide-border">
        {MODALITIES.map((m) => (
          <button key={m} type="button" aria-pressed={modality === m} onClick={() => setModality(m)} className={cn(SEGMENT_BASE, modality === m ? SEGMENT_ON : SEGMENT_OFF)}>
            {t.modalities[m]}
          </button>
        ))}
      </div>
    </div>
  );
}

/** Troca para a mesma página no outro idioma (links reais: abrem em nova aba, funcionam sem JS de estado). */
export function LangSwitch() {
  const { lang, t } = useDocs();
  const location = useLocation();
  return (
    <div role="group" aria-label={t.languageLabel} className="inline-flex items-center rounded-md border border-border overflow-hidden divide-x divide-border">
      {DOC_LANGS.map((l) => (
        <Link
          key={l}
          to={{ pathname: switchLangPath(location.pathname, l), hash: location.hash }}
          hrefLang={l}
          lang={l}
          aria-current={lang === l ? "true" : undefined}
          className={cn(SEGMENT_BASE, "inline-flex items-center", lang === l ? SEGMENT_ON : SEGMENT_OFF)}
        >
          {l}
        </Link>
      ))}
    </div>
  );
}
