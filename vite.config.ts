import path from "path";
import mdx from "@mdx-js/rollup";
import react from "@vitejs/plugin-react";
import rehypeSlug from "rehype-slug";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import YAML from "yaml";
import { defineConfig } from "vitest/config";

// Conteúdo da documentação sincronizado de `dbmodeling/dbml` (scripts/sync-docs.mjs).
const MDX_FILES = /\.mdx$/;
const FRONTMATTER_EXPORT = "frontmatter";
const STRICT_ENV = "DOCS_STRICT";

/**
 * YAML do frontmatter. Em `DOCS_STRICT=1` (CI) um YAML inválido derruba o build; no dia a dia a página
 * ainda compila (os metadados vêm do `manifest.json`, e o `sync-docs` já avisa qual arquivo está errado).
 */
function parseFrontmatter(source: string): Record<string, unknown> {
  try {
    return YAML.parse(source) ?? {};
  } catch (error) {
    if (process.env[STRICT_ENV]) throw error;
    return {};
  }
}

export default defineConfig({
  plugins: [
    {
      // MDX precisa rodar antes do plugin do React para virar JSX
      enforce: "pre",
      ...mdx({
        include: MDX_FILES,
        remarkPlugins: [remarkFrontmatter, [remarkMdxFrontmatter, { name: FRONTMATTER_EXPORT, parsers: { yaml: parseFrontmatter } }], remarkGfm],
        // `rehype-slug` gera os ids dos títulos; o link copiável de cada título é o componente `Heading`
        rehypePlugins: [rehypeSlug],
      }),
    },
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
  },
});
