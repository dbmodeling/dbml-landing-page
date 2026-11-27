#!/usr/bin/env node
// Sincroniza o conteúdo da documentação e o motor de leitura do canvas a partir do repo do produto.
//
//   docs/site/**                              -> src/content/docs/        (gitignored)
//   assets/product-guide.json                 -> src/content/docs/product-guide.json
//   packages/canvas-web/dist/readonly.js,
//   dist/types/*.d.ts, dist/dbml_wasm_bg.wasm -> src/vendor/canvas-web/  (gitignored)
//
// E gera, a partir do que copiou:
//   src/content/docs/manifest.json       páginas por idioma (frontmatter) para sidebar, prev/next e fallback
//   src/content/docs/search-index.json   índice MiniSearch serializado (páginas, seções e linhas de referência)
//
// Repo do produto: variável `DBML_REPO_DIR` (padrão `../db_modeling`, irmão deste repo).
//
// Em CI do site (D1 da change `central-de-documentacao`): fazer um checkout raso de uma TAG do repo
// `dbmodeling/dbml` e apontar `DBML_REPO_DIR` para ele, para que a doc publicada corresponda a uma release:
//
//   git clone --depth 1 --branch "$DBML_DOCS_TAG" https://github.com/dbmodeling/dbml.git "$DBML_REPO_DIR"
//   DBML_REPO_DIR="$DBML_REPO_DIR" npm run build
//
// Se o repo do produto não existir mas o conteúdo já estiver em `src/`, o script avisa e segue com o cache.
// `DOCS_STRICT=1` transforma os avisos de conteúdo (links, atalhos e exemplos inexistentes) em erro.

import { spawnSync } from "node:child_process";
import {
  cpSync,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import GithubSlugger from "github-slugger";
import MiniSearch from "minisearch";
import YAML from "yaml";
import {
  SEARCH_KIND,
  SEARCH_OPTIONS,
  actionAnchor,
  cliAnchor,
  vscodeCommandAnchor,
  vscodeSettingAnchor,
} from "../src/docs/shared.mjs";

const SITE_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const REPO_ENV = "DBML_REPO_DIR";
const DEFAULT_REPO_DIR = "../db_modeling";
const STRICT_ENV = "DOCS_STRICT";
const FROM_PRODUCT_FLAG = "--from-product";

const CONTENT_DIR = path.join(SITE_ROOT, "src/content/docs");
const CAPTURES_DIR = path.join(SITE_ROOT, "src/docs/captures");
const VENDOR_DIR = path.join(SITE_ROOT, "src/vendor/canvas-web");
const MANIFEST_FILE = "manifest.json";
const SEARCH_INDEX_FILE = "search-index.json";
const PRODUCT_GUIDE_FILE = "product-guide.json";

const SRC_DOCS = "docs/site";
const SRC_PRODUCT_GUIDE = "assets/product-guide.json";
const CANVAS_DIR = "packages/canvas-web";
const CANVAS_DIST = `${CANVAS_DIR}/dist`;
const READONLY_BUNDLE = "readonly.js";
const WASM_FILE = "dbml_wasm_bg.wasm";
const TYPES_DIR = "types";
const BUILD_READONLY_ARGS = ["run", "build:readonly"];

const LANGS = ["pt-BR", "en"];
const FALLBACK_LANG = "pt-BR";
const SECTIONS = ["comecar", "guias", "referencia", "ajuda"];
const DOCS_ROUTE = "/docs";
const MDX_EXT = ".mdx";
const GENERATED_DIR = "gerado";
const EXAMPLES_DIR = "exemplos";
const SCENES_FILE = "capturas/cenas.json";
const REF_COMPONENTS = {
  action: "<RefAcoes",
  cli: "<RefCli",
  vscode: "<RefVscode",
};
const HEADING_LEVEL_MAX = 3;
const SEARCH_TEXT_MAX_CHARS = 4000;

const log = (msg) => console.log(`[sync-docs] ${msg}`);
const warnings = [];
const warn = (msg) => {
  warnings.push(msg);
  console.warn(`[sync-docs] aviso: ${msg}`);
};

const shouldSyncFromProduct =
  process.argv.includes(FROM_PRODUCT_FLAG) || Boolean(process.env[REPO_ENV]);
const repoDir = path.resolve(SITE_ROOT, process.env[REPO_ENV] ?? DEFAULT_REPO_DIR);

function readJson(file) {
  return JSON.parse(readFileSync(file, "utf8"));
}

function walk(dir, ext) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(full, ext);
    return !ext || full.endsWith(ext) ? [full] : [];
  });
}

// ---------------------------------------------------------------------------
// 1. Cópia do conteúdo e do bundle de leitura
// ---------------------------------------------------------------------------

function syncContent() {
  if (!shouldSyncFromProduct) {
    if (!existsSync(CONTENT_DIR)) {
      throw new Error(`Conteúdo não encontrado em ${CONTENT_DIR}. Rode com ${FROM_PRODUCT_FLAG} ou defina ${REPO_ENV}.`);
    }
    return;
  }
  const source = path.join(repoDir, SRC_DOCS);
  if (!existsSync(source)) {
    if (existsSync(CONTENT_DIR)) {
      warn(`${source} não existe; usando o conteúdo versionado em src/content/docs`);
      return;
    }
    throw new Error(`Conteúdo não encontrado em ${source}. Defina ${REPO_ENV} apontando para o repo dbmodeling/dbml.`);
  }
  rmSync(CONTENT_DIR, { recursive: true, force: true });
  mkdirSync(CONTENT_DIR, { recursive: true });
  cpSync(source, CONTENT_DIR, { recursive: true });
  // Capturas ficam versionadas em src/docs/captures/ (evita duplicar PNGs em src/content/docs/)
  for (const sub of ["gerado", "manual"]) {
    const copied = path.join(CONTENT_DIR, "capturas", sub);
    if (existsSync(copied)) {
      const dest = path.join(CAPTURES_DIR, sub);
      mkdirSync(dest, { recursive: true });
      cpSync(copied, dest, { recursive: true });
      rmSync(copied, { recursive: true, force: true });
    }
  }
  const guide = path.join(repoDir, SRC_PRODUCT_GUIDE);
  if (existsSync(guide)) cpSync(guide, path.join(CONTENT_DIR, PRODUCT_GUIDE_FILE));
  else warn(`${guide} não existe: a página Novidades ficará sem o changelog`);
  log(`conteúdo copiado de ${source}`);
}

function syncCanvasBundle() {
  if (!shouldSyncFromProduct) {
    if (!existsSync(path.join(VENDOR_DIR, READONLY_BUNDLE))) {
      warn(`motor de leitura ausente em src/vendor/canvas-web; rode com ${FROM_PRODUCT_FLAG}`);
    }
    return;
  }
  const canvas = path.join(repoDir, CANVAS_DIR);
  const dist = path.join(repoDir, CANVAS_DIST);
  if (!existsSync(canvas)) {
    if (existsSync(path.join(VENDOR_DIR, READONLY_BUNDLE))) {
      warn(`${canvas} não existe; usando o bundle já copiado em src/vendor/canvas-web`);
      return;
    }
    throw new Error(`packages/canvas-web não encontrado em ${canvas}.`);
  }
  if (!existsSync(path.join(dist, READONLY_BUNDLE))) {
    log("dist/readonly.js ausente: rodando `npm run build:readonly`");
    const result = spawnSync("npm", BUILD_READONLY_ARGS, { cwd: canvas, stdio: "inherit" });
    if (result.status !== 0) throw new Error("`npm run build:readonly` falhou em packages/canvas-web.");
  }
  rmSync(VENDOR_DIR, { recursive: true, force: true });
  mkdirSync(VENDOR_DIR, { recursive: true });
  cpSync(path.join(dist, READONLY_BUNDLE), path.join(VENDOR_DIR, READONLY_BUNDLE));
  cpSync(path.join(dist, WASM_FILE), path.join(VENDOR_DIR, WASM_FILE));
  // `readonly.d.ts` importa `./constants`, `./types` etc.: copia todas as declarações para o mesmo diretório
  for (const file of walk(path.join(dist, TYPES_DIR), ".d.ts")) {
    cpSync(file, path.join(VENDOR_DIR, path.basename(file)));
  }
  log(`motor de leitura copiado de ${dist}`);
}

// ---------------------------------------------------------------------------
// 2. Leitura das páginas (frontmatter simples) e manifesto
// ---------------------------------------------------------------------------

const FRONTMATTER_RE = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/;

function parseScalar(raw) {
  const value = raw.trim();
  const quoted = value.match(/^(["'])(.*)\1/);
  if (quoted) return quoted[2];
  const list = value.match(/^\[(.*)\]/);
  if (list) return list[1].split(",").map((item) => parseScalar(item)).filter((item) => item !== "");
  const bare = value.replace(/\s+#.*$/, "");
  return /^-?\d+$/.test(bare) ? Number(bare) : bare;
}

function parseFrontmatter(source, where) {
  const match = source.match(FRONTMATTER_RE);
  if (!match) return { data: {}, body: source };
  const body = source.slice(match[0].length);
  // YAML de verdade primeiro: é o que o MDX (remark-mdx-frontmatter) e o GitHub leem
  try {
    return { data: YAML.parse(match[1]) ?? {}, body };
  } catch (error) {
    warn(`${where}: frontmatter com YAML inválido (${String(error.message).split("\n")[0]})`);
  }
  const data = {};
  for (const line of match[1].split(/\r?\n/)) {
    const pair = line.match(/^([A-Za-z_][\w-]*):\s*(.*)$/);
    if (pair) data[pair[1]] = parseScalar(pair[2]);
  }
  return { data, body };
}

function loadPages() {
  const pages = [];
  for (const lang of LANGS) {
    const base = path.join(CONTENT_DIR, lang);
    for (const file of walk(base, MDX_EXT)) {
      const rel = path.relative(base, file).split(path.sep);
      if (rel.length !== 2) continue;
      const [secao, fileName] = rel;
      const slug = fileName.slice(0, -MDX_EXT.length);
      const { data, body } = parseFrontmatter(readFileSync(file, "utf8"), `${lang}/${secao}/${slug}`);
      for (const key of ["titulo", "descricao", "secao", "ordem"]) {
        if (data[key] === undefined) warn(`${lang}/${secao}/${slug}: frontmatter sem \`${key}\``);
      }
      if (data.secao && data.secao !== secao) warn(`${lang}/${secao}/${slug}: \`secao\` (${data.secao}) difere da pasta`);
      const modalidades = Array.isArray(data.modalidades) ? data.modalidades : [];
      const usaModalidade =
        /<(?:Modalidade|Atalho)\b/.test(body) || (modalidades.length > 0 && modalidades.length < 3);
      pages.push({
        lang,
        secao,
        slug,
        titulo: String(data.titulo ?? slug),
        descricao: String(data.descricao ?? ""),
        ordem: Number(data.ordem ?? 0),
        modalidades,
        usaModalidade,
        body,
      });
    }
  }
  return pages;
}

// ---------------------------------------------------------------------------
// 3. Texto pesquisável a partir do MDX
// ---------------------------------------------------------------------------

function stripMdx(body) {
  return body
    .replace(/^(import|export)\s.+$/gm, " ")
    .replace(/<\/?[A-Z][A-Za-z0-9]*(?:\s(?:[^<>"'{}]|"[^"]*"|'[^']*'|\{[^{}]*\})*)?\/?>/g, " ")
    .replace(/```[\w-]*\r?\n?/g, " ")
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[`*_>|]/g, " ")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/\s+/g, " ")
    .trim();
}

/** Divide o corpo em seções por título (`##`/`###`), com o mesmo slug do `rehype-slug`. */
function splitSections(body) {
  const slugger = new GithubSlugger();
  const sections = [{ heading: "", anchor: "", lines: [] }];
  let inFence = false;
  for (const line of body.split(/\r?\n/)) {
    if (/^```/.test(line)) inFence = !inFence;
    const heading = !inFence && line.match(/^(#{1,6})\s+(.+?)\s*#*$/);
    if (heading) {
      const text = heading[2].replace(/[`*_]/g, "");
      const anchor = slugger.slug(text);
      if (heading[1].length <= HEADING_LEVEL_MAX && heading[1].length > 1) {
        sections.push({ heading: text, anchor, lines: [] });
      }
      continue;
    }
    sections[sections.length - 1].lines.push(line);
  }
  return sections;
}

function pageUrl(page) {
  return `${DOCS_ROUTE}/${page.lang}/${page.secao}/${page.slug}`;
}

// ---------------------------------------------------------------------------
// 4. Auditoria de conteúdo (avisos, não bloqueia salvo DOCS_STRICT)
// ---------------------------------------------------------------------------

function auditContent(pages, acoes, cenas) {
  const known = new Set(pages.map((p) => `${p.lang}/${p.secao}/${p.slug}`));
  const actionIds = new Set(acoes.flatMap((a) => [a.id, ...(a.aliases ?? [])]));
  const examples = new Set(walk(path.join(CONTENT_DIR, EXAMPLES_DIR), ".dbml").map((f) => path.basename(f, ".dbml")));
  for (const lang of LANGS) {
    for (const page of pages.filter((p) => p.lang === lang)) {
      const where = `${lang}/${page.secao}/${page.slug}`;
      if (!pages.some((p) => p.lang !== lang && p.secao === page.secao && p.slug === page.slug)) {
        warn(`${where}: sem tradução no outro idioma`);
      }
      for (const m of page.body.matchAll(/<Atalho\s+acao="([^"]+)"/g)) {
        if (!actionIds.has(m[1])) warn(`${where}: <Atalho acao="${m[1]}"> não existe em acoes.json`);
      }
      for (const m of page.body.matchAll(/<ExemploDbml\s+arquivo="([^"]+)"/g)) {
        if (!examples.has(m[1])) warn(`${where}: <ExemploDbml arquivo="${m[1]}"> não existe em exemplos/`);
      }
      if (cenas) {
        for (const m of page.body.matchAll(/<Captura\s+cena="([^"]+)"/g)) {
          if (!cenas.has(m[1])) warn(`${where}: <Captura cena="${m[1]}"> não existe em cenas.json`);
        }
      }
      // links internos relativos: resolvidos como o navegador resolve (URL sem barra final)
      const withoutCode = page.body.replace(/```[\s\S]*?```/g, "").replace(/`[^`\n]*`/g, "");
      for (const m of withoutCode.matchAll(/\]\(([^)\s]+)\)/g)) {
        const href = m[1];
        if (/^([a-z][a-z0-9+.-]*:|#|\/)/i.test(href)) continue;
        const resolved = new URL(href, `http://x${pageUrl(page)}`).pathname;
        if (!known.has(resolved.replace(`${DOCS_ROUTE}/`, ""))) warn(`${where}: link interno quebrado (${href})`);
      }
    }
  }
}

// ---------------------------------------------------------------------------
// 5. Índice de busca
// ---------------------------------------------------------------------------

function referenceUrl(pages, lang, marker) {
  const page = pages.find((p) => p.lang === lang && p.body.includes(marker));
  return page ? pageUrl(page) : null;
}

function cliEntries(cli, lang, url) {
  const out = [];
  const label = (path_) => [cli.binario, ...path_].join(" ");
  const visitOption = (opt, scope) => {
    const anchor = cliAnchor(scope, opt.nome);
    out.push({
      title: `${label(scope)} ${opt.nome}`,
      heading: "CLI",
      text: [opt.curto, opt.valor, opt.padrao, opt.env, opt.ajuda].filter(Boolean).join(" "),
      url: `${url}#${anchor}`,
    });
  };
  cli.global.forEach((opt) => visitOption(opt, []));
  const visitCommand = (cmd, scope) => {
    const here = [...scope, cmd.nome];
    out.push({
      title: label(here),
      heading: "CLI",
      text: [...(cmd.aliases ?? []), cmd.ajuda].join(" "),
      url: `${url}#${cliAnchor(scope, cmd.nome)}`,
    });
    cmd.opcoes.forEach((opt) => visitOption(opt, here));
    cmd.subcomandos.forEach((sub) => visitCommand(sub, here));
  };
  cli.subcomandos.forEach((cmd) => visitCommand(cmd, []));
  return out.map((entry) => ({ ...entry, lang, kind: SEARCH_KIND.cli, secao: "referencia" }));
}

function buildSearchIndex(pages, gerado) {
  const docs = [];
  const add = (doc) => docs.push({ id: String(docs.length), ...doc });

  for (const page of pages) {
    const url = pageUrl(page);
    add({
      title: page.titulo,
      heading: "",
      text: page.descricao,
      url,
      kind: SEARCH_KIND.page,
      lang: page.lang,
      secao: page.secao,
    });
    for (const section of splitSections(page.body)) {
      const text = stripMdx(section.lines.join("\n")).slice(0, SEARCH_TEXT_MAX_CHARS);
      if (!text || (!section.heading && text.length < 1)) continue;
      add({
        title: page.titulo,
        heading: section.heading,
        text,
        url: section.anchor ? `${url}#${section.anchor}` : url,
        kind: SEARCH_KIND.page,
        lang: page.lang,
        secao: page.secao,
      });
    }
  }

  for (const lang of LANGS) {
    const actionsUrl = referenceUrl(pages, lang, REF_COMPONENTS.action);
    if (actionsUrl && gerado.acoes) {
      for (const acao of gerado.acoes) {
        const keys = Object.values(acao.atalhos ?? {})
          .filter(Boolean)
          .map((k) => k.padrao)
          .join(" ");
        add({
          title: acao.rotulo[lang] ?? acao.rotulo[FALLBACK_LANG],
          heading: acao.grupo_rotulo?.[lang] ?? acao.grupo,
          text: [acao.id, ...(acao.aliases ?? []), keys].join(" "),
          url: `${actionsUrl}#${actionAnchor(acao.id)}`,
          kind: SEARCH_KIND.action,
          lang,
          secao: "referencia",
        });
      }
    }
    const cliUrl = referenceUrl(pages, lang, REF_COMPONENTS.cli);
    if (cliUrl && gerado.cli) cliEntries(gerado.cli, lang, cliUrl).forEach(add);
    const vscodeUrl = referenceUrl(pages, lang, REF_COMPONENTS.vscode);
    if (vscodeUrl && gerado.vscode) {
      for (const cmd of gerado.vscode.comandos) {
        add({
          title: cmd.titulo,
          heading: cmd.categoria,
          text: cmd.id,
          url: `${vscodeUrl}#${vscodeCommandAnchor(cmd.id)}`,
          kind: SEARCH_KIND.vscode,
          lang,
          secao: "referencia",
        });
      }
      for (const cfg of gerado.vscode.configuracoes) {
        add({
          title: cfg.chave,
          heading: "VS Code",
          text: [cfg.padrao, cfg.descricao].filter(Boolean).join(" "),
          url: `${vscodeUrl}#${vscodeSettingAnchor(cfg.chave)}`,
          kind: SEARCH_KIND.vscode,
          lang,
          secao: "referencia",
        });
      }
    }
  }

  const index = new MiniSearch(SEARCH_OPTIONS);
  index.addAll(docs);
  return index;
}

// ---------------------------------------------------------------------------
// main
// ---------------------------------------------------------------------------

function main() {
  syncContent();
  syncCanvasBundle();

  const pages = loadPages();
  const generated = (name) => {
    const file = path.join(CONTENT_DIR, GENERATED_DIR, `${name}.json`);
    return existsSync(file) ? readJson(file) : null;
  };
  const acoesJson = generated("acoes");
  const gerado = { acoes: acoesJson?.acoes ?? null, cli: generated("cli"), vscode: generated("vscode") };
  const scenesFile = path.join(CONTENT_DIR, SCENES_FILE);
  const cenas = existsSync(scenesFile) ? new Set(readJson(scenesFile).cenas.map((c) => c.id)) : null;

  auditContent(pages, gerado.acoes ?? [], cenas);

  const manifest = {
    langs: LANGS,
    sections: SECTIONS,
    pages: pages.map(({ body: _body, ...meta }) => meta),
  };
  writeFileSync(path.join(CONTENT_DIR, MANIFEST_FILE), `${JSON.stringify(manifest)}\n`);
  writeFileSync(path.join(CONTENT_DIR, SEARCH_INDEX_FILE), JSON.stringify(buildSearchIndex(pages, gerado)));
  const kb = Math.round(statSync(path.join(CONTENT_DIR, SEARCH_INDEX_FILE)).size / 1024);
  log(`${pages.length} páginas, índice de busca com ${kb} KB, ${warnings.length} aviso(s)`);

  if (warnings.length && process.env[STRICT_ENV]) process.exit(1);
}

try {
  main();
} catch (error) {
  console.error(`[sync-docs] erro: ${error.message}`);
  process.exit(1);
}
