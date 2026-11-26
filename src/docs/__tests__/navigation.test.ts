import { describe, expect, it } from "vitest";
import {
  buildNav,
  detectBrowserLang,
  pagePath,
  prevNext,
  resolveHref,
  resolvePage,
  switchLangPath,
  type Manifest,
  type PageMeta,
} from "../navigation";

const page = (lang: PageMeta["lang"], secao: PageMeta["secao"], slug: string, ordem: number): PageMeta => ({
  lang,
  secao,
  slug,
  titulo: `${slug} (${lang})`,
  descricao: "",
  ordem,
  modalidades: ["desktop"],
});

const manifest: Manifest = {
  langs: ["pt-BR", "en"],
  sections: ["comecar", "guias", "referencia", "ajuda"],
  pages: [
    page("pt-BR", "comecar", "o-que-e", 10),
    page("pt-BR", "comecar", "instalacao", 20),
    page("pt-BR", "comecar", "instalacao-windows", 30),
    page("pt-BR", "comecar", "primeiro-diagrama", 100),
    page("pt-BR", "guias", "exportar", 70),
    page("en", "comecar", "o-que-e", 10),
    page("en", "comecar", "instalacao", 20),
  ],
};

describe("fallback de idioma", () => {
  it("página traduzida usa o próprio idioma", () => {
    expect(resolvePage(manifest, "en", "comecar", "o-que-e")).toMatchObject({ contentLang: "en", fallback: false });
  });

  it("página sem tradução cai para pt-BR e sinaliza o aviso", () => {
    expect(resolvePage(manifest, "en", "guias", "exportar")).toMatchObject({ contentLang: "pt-BR", fallback: true });
  });

  it("pt-BR nunca é fallback; página inexistente é null", () => {
    expect(resolvePage(manifest, "pt-BR", "guias", "exportar")?.fallback).toBe(false);
    expect(resolvePage(manifest, "en", "guias", "nao-existe")).toBeNull();
  });

  it("a sidebar em en inclui as páginas pendentes marcadas", () => {
    const nav = buildNav(manifest, "en");
    const guias = nav.find((s) => s.secao === "guias");
    expect(guias?.items[0]).toMatchObject({ pending: true });
    expect(nav[0].items.find((i) => i.page.slug === "o-que-e")?.pending).toBe(false);
  });
});

describe("sidebar e sequência", () => {
  it("ordena por `ordem` e aninha páginas `<pai>-<filho>`", () => {
    const comecar = buildNav(manifest, "pt-BR")[0];
    expect(comecar.items.map((i) => i.page.slug)).toEqual(["o-que-e", "instalacao", "primeiro-diagrama"]);
    expect(comecar.items[1].children.map((c) => c.page.slug)).toEqual(["instalacao-windows"]);
  });

  it("anterior e próximo seguem a ordem do frontmatter, atravessando seções", () => {
    const mid = prevNext(manifest, "pt-BR", "comecar", "primeiro-diagrama");
    expect(mid.prev?.page.slug).toBe("instalacao-windows");
    expect(mid.next?.page.slug).toBe("exportar");
    expect(prevNext(manifest, "pt-BR", "comecar", "o-que-e").prev).toBeNull();
  });
});

describe("idioma e links", () => {
  it("detecta o idioma do navegador", () => {
    expect(detectBrowserLang(["pt-PT", "en"])).toBe("pt-BR");
    expect(detectBrowserLang(["en-US"])).toBe("en");
    expect(detectBrowserLang(["fr"])).toBe("en");
    expect(detectBrowserLang([])).toBe("pt-BR");
    expect(detectBrowserLang(undefined)).toBe("pt-BR");
  });

  it("troca de idioma mantendo seção, slug e a âncora fora do caminho", () => {
    expect(switchLangPath(pagePath("pt-BR", "guias", "exportar"), "en")).toBe("/docs/en/guias/exportar");
  });

  it("resolve links relativos contra a URL da página", () => {
    const at = "/docs/pt-BR/comecar/primeiro-diagrama";
    expect(resolveHref("../guias/importar-sql", at)).toEqual({ kind: "internal", href: "/docs/pt-BR/guias/importar-sql" });
    expect(resolveHref("atualizacoes#x", "/docs/pt-BR/ajuda/novidades")).toEqual({ kind: "internal", href: "/docs/pt-BR/ajuda/atualizacoes#x" });
    expect(resolveHref("#titulo", at)).toEqual({ kind: "anchor", href: "#titulo" });
    expect(resolveHref("https://github.com/x", at)).toEqual({ kind: "external", href: "https://github.com/x" });
    expect(resolveHref("mailto:a@b.c", at).kind).toBe("external");
    expect(resolveHref("javascript:alert(1)", at)).toEqual({ kind: "anchor", href: "#" });
    expect(resolveHref("data:text/html,<script>", at)).toEqual({ kind: "anchor", href: "#" });
  });
});
