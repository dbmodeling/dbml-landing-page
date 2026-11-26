import { ANCHOR_HIGHLIGHT_CLASS, HASH_WAIT_MS, HIGHLIGHT_ANCHOR_MS } from "./constants";

/** Rola até o elemento da âncora e o destaca por um instante (títulos e linhas de referência). */
export function scrollToHash(hash: string): boolean {
  const raw = hash.replace(/^#/, "");
  let id: string;
  try {
    id = decodeURIComponent(raw);
  } catch {
    id = raw;
  }
  if (!id) return false;
  const el = document.getElementById(id);
  if (!el) return false;
  const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ block: "start", behavior: reduce ? "auto" : "smooth" });
  el.classList.remove(ANCHOR_HIGHLIGHT_CLASS);
  // força reflow para reiniciar a animação ao repetir a mesma âncora
  void el.offsetWidth;
  el.classList.add(ANCHOR_HIGHLIGHT_CLASS);
  window.setTimeout(() => el.classList.remove(ANCHOR_HIGHLIGHT_CLASS), HIGHLIGHT_ANCHOR_MS);
  return true;
}

/**
 * Como `scrollToHash`, mas espera o elemento aparecer: tabelas de referência (CLI, atalhos, VS Code)
 * montam depois do MDX, quando o JSON gerado termina de carregar. Devolve a função de cancelamento.
 */
export function scrollToHashWhenReady(root: HTMLElement | null, hash: string): () => void {
  if (!hash || scrollToHash(hash)) return () => undefined;
  if (!root) return () => undefined;
  const observer = new MutationObserver(() => {
    if (scrollToHash(hash)) stop();
  });
  const timer = window.setTimeout(() => stop(), HASH_WAIT_MS);
  function stop() {
    observer.disconnect();
    window.clearTimeout(timer);
  }
  observer.observe(root, { childList: true, subtree: true });
  return stop;
}
