# Site público do DB Modeling

React 18 + Vite 6 + Tailwind 3 + Radix. Landing em `/`, documentação em `/docs`.

## Documentação (`/docs/:lang/:secao/:slug`)

Todo o conteúdo da documentação é **versionado diretamente neste repositório**:

- `src/content/docs/` — páginas MDX (`pt-BR` e `en`), exemplos `.dbml`, referências geradas (`gerado/{acoes,cli,vscode}.json`), `product-guide.json` e metadados de capturas (`capturas/cenas.json`, `roteiro.md`, `entradas/`).
- `src/docs/captures/` — capturas de tela em `pt-BR` (`gerado/*.png`) e `en` (`gerado/en/*.png`), além de `manual/`.
- `src/vendor/canvas-web/` — motor de leitura do canvas (`readonly.js`, `dbml_wasm_bg.wasm`, tipos `.d.ts`).

No `predev` e `prebuild`, `scripts/sync-docs.mjs` audita o conteúdo local e gera `src/content/docs/manifest.json` e `src/content/docs/search-index.json` (gitignored), sem depender de outro repositório:

```bash
npm install
npm run dev                  # gera índices e sobe o Vite
DOCS_STRICT=1 npm run build  # audita (0 avisos) + tsc + vite build
npm test                     # vitest
npm run sync-docs            # só audita e regenera manifest + search-index
```

Para reimportar conteúdo ou o bundle de leitura a partir do repo `db_modeling` quando quiser atualizar a partir do produto:

```bash
npm run sync-docs -- --from-product
# ou especificando o caminho:
DBML_REPO_DIR=../db_modeling npm run sync-docs
```

- `DOCS_STRICT=1` transforma os avisos de conteúdo (YAML inválido, link quebrado, atalho ou exemplo inexistente) em erro. Use no CI.
- O índice de busca (`search-index.json`) é gerado no build; nenhuma requisição externa é feita pela busca.

### Hospedagem

As rotas `/docs/*` são do cliente (React Router). O host precisa devolver `index.html` para qualquer caminho que não seja um arquivo (fallback de SPA).

### "Abrir no editor"

As constantes `EDITOR_LOCAL_URL` e `EDITOR_DEMO_URL` ficam em `src/docs/constants.ts`. A URL colada pelo visitante (com `?token=`) fica apenas em `sessionStorage` da aba atual. A demo pública continua `null` até o SSRF de `/api/introspect` ser corrigido.
