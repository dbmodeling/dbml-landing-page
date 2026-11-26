import * as React from "react";
import { MODALITIES, type Modality } from "../constants";
import { useDocs } from "../context";

const parseSo = (so: string | string[] | undefined): Modality[] => {
  const list = Array.isArray(so) ? so : (so ?? "").split(",");
  return list.map((item) => item.trim()).filter((item): item is Modality => (MODALITIES as readonly string[]).includes(item));
};

/** Conteúdo visível só para a modalidade escolhida no seletor. */
export function Modalidade({ so, children }: { so?: string | string[]; children?: React.ReactNode }) {
  const { modality, t } = useDocs();
  const targets = parseSo(so);
  if (!targets.includes(modality)) return null;
  return (
    <div className="docs-modality my-4 border-l border-border pl-4" data-modality={modality}>
      <span className="block mb-1 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">{t.modalities[modality]}</span>
      {children}
    </div>
  );
}
