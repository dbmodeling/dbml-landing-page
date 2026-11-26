// Textos de interface da aba Docs (o conteúdo das páginas vem do MDX, já traduzido).

import type { DocLang, Modality, NoticeKind } from "./constants";

export interface DocsStrings {
  docs: string;
  search: string;
  searchPlaceholder: string;
  searchHint: string;
  searchEmpty: string;
  searchMinChars: string;
  searchResults: string;
  searchClose: string;
  menu: string;
  closeMenu: string;
  sidebarLabel: string;
  tocLabel: string;
  previous: string;
  next: string;
  modalityLabel: string;
  languageLabel: string;
  onThisPage: string;
  translationPending: string;
  translationPendingBody: string;
  pageNotFound: string;
  pageNotFoundBody: string;
  contentMissing: string;
  contentError: string;
  loading: string;
  copy: string;
  copied: string;
  copyFailed: string;
  copyLink: string;
  linkCopied: string;
  appliesTo: string;
  notForModality: string;
  palette: string;
  unavailableIn: string;
  unknownAction: string;
  tabCode: string;
  tabDiagram: string;
  tabSql: string;
  tabMermaid: string;
  dialect: string;
  fitView: string;
  wheelHint: string;
  wheelHintMac: string;
  openInEditor: string;
  editorPopoverLabel: string;
  editorUrlLabel: string;
  editorUrlHelp: string;
  editorUrlSubmit: string;
  editorUrlChange: string;
  editorUrlClear: string;
  editorUrlUsing: string;
  editorUrlSavedOnlyHere: string;
  editorUrlNotSaved: string;
  editorUrlPreparing: string;
  editorUrlClose: string;
  editorUrlErrors: Record<"invalid" | "protocol" | "token", string>;
  engineLoading: string;
  engineUnavailable: string;
  exampleMissing: string;
  exportError: string;
  diagnostics: string;
  captureMissing: string;
  expandImage: string;
  closeImage: string;
  filterActions: string;
  noRows: string;
  colAction: string;
  colShortcut: string;
  colName: string;
  colId: string;
  colTitle: string;
  colCategory: string;
  colKey: string;
  colType: string;
  colDefault: string;
  colScope: string;
  colDescription: string;
  colShort: string;
  colValue: string;
  colEnv: string;
  colHelp: string;
  colCommand: string;
  colExitCode: string;
  colMeaning: string;
  colRequired: string;
  options: string;
  positionals: string;
  globalOptions: string;
  exitCodes: string;
  commands: string;
  editors: string;
  settings: string;
  aliases: string;
  newsEmpty: string;
  newsAdded: string;
  newsImproved: string;
  newsFixed: string;
  notices: Record<NoticeKind, string>;
  modalities: Record<Modality, string>;
  version: string;
}

export const STRINGS: Record<DocLang, DocsStrings> = {
  "pt-BR": {
    docs: "Docs",
    search: "Buscar",
    searchPlaceholder: "Buscar na documentação",
    searchHint: "Atalhos: / ou Ctrl+K",
    searchEmpty: "Nada encontrado.",
    searchMinChars: "Digite ao menos 2 letras.",
    searchResults: "Resultados da busca",
    searchClose: "Fechar busca",
    menu: "Menu da documentação",
    closeMenu: "Fechar menu",
    sidebarLabel: "Navegação da documentação",
    tocLabel: "Nesta página",
    previous: "Anterior",
    next: "Próximo",
    modalityLabel: "Modalidade",
    languageLabel: "Idioma",
    onThisPage: "Nesta página",
    translationPending: "Translation pending",
    translationPendingBody: "Esta página ainda não foi traduzida. Você está vendo a versão em português (pt-BR).",
    pageNotFound: "Página não encontrada",
    pageNotFoundBody: "Esta página não existe. Use a barra lateral ou a busca para encontrar o que procura.",
    contentMissing: "O conteúdo da documentação não foi sincronizado neste build. Rode `npm run sync-docs`.",
    contentError: "Esta página não pôde ser carregada.",
    loading: "Carregando…",
    copy: "Copiar",
    copied: "Copiado",
    copyFailed: "Falhou: selecione e copie",
    copyLink: "Copiar link desta seção",
    linkCopied: "Link copiado",
    appliesTo: "Vale para",
    notForModality: "Esta página não trata da modalidade escolhida ({}).",
    palette: "Paleta",
    unavailableIn: "não disponível em {}",
    unknownAction: "ação desconhecida",
    tabCode: "Código",
    tabDiagram: "Diagrama",
    tabSql: "SQL",
    tabMermaid: "Mermaid",
    dialect: "Dialeto",
    fitView: "Ajustar à tela",
    wheelHint: "Ctrl + roda para zoom",
    wheelHintMac: "⌘ + roda para zoom",
    openInEditor: "Abrir no editor",
    editorPopoverLabel: "Abrir o exemplo no editor local",
    editorUrlLabel: "URL do dbml run",
    editorUrlHelp:
      "Rode `dbml run` na sua máquina e cole aqui a URL que ele mostra no terminal (com `?token=`). O exemplo abre num documento novo e não salvo; o código vai no fragmento da URL e não passa por servidor algum.",
    editorUrlSubmit: "Abrir",
    editorUrlChange: "Trocar URL",
    editorUrlClear: "Esquecer",
    editorUrlUsing: "Usando {}",
    editorUrlSavedOnlyHere: "A URL fica guardada só nesta aba (some ao fechar).",
    editorUrlNotSaved: "Este navegador não deixou guardar a URL: ela vale só nesta página.",
    editorUrlPreparing: "Preparando o exemplo…",
    editorUrlClose: "Fechar",
    editorUrlErrors: {
      invalid: "Isso não parece uma URL. Cole o endereço completo do terminal.",
      protocol: "Use uma URL que comece com http:// ou https://.",
      token: "A URL precisa do `?token=` que o `dbml run` mostrou no terminal.",
    },
    engineLoading: "Carregando o motor do diagrama…",
    engineUnavailable: "O motor do diagrama não está disponível neste build.",
    exampleMissing: "Exemplo não encontrado:",
    exportError: "Não foi possível gerar a saída: corrija os erros do DBML.",
    diagnostics: "Diagnósticos do DBML",
    captureMissing: "Captura ainda não disponível",
    expandImage: "Ampliar",
    closeImage: "Fechar imagem ampliada",
    filterActions: "Filtrar ações",
    noRows: "Nenhum item.",
    colAction: "Ação",
    colShortcut: "Atalho",
    colName: "Nome",
    colId: "ID",
    colTitle: "Título",
    colCategory: "Categoria",
    colKey: "Chave",
    colType: "Tipo",
    colDefault: "Padrão",
    colScope: "Escopo",
    colDescription: "Descrição",
    colShort: "Curto",
    colValue: "Valor",
    colEnv: "Variável de ambiente",
    colHelp: "Ajuda",
    colCommand: "Comando",
    colExitCode: "Código",
    colMeaning: "Significado",
    colRequired: "Obrigatório",
    options: "Opções",
    positionals: "Argumentos",
    globalOptions: "Opções globais",
    exitCodes: "Códigos de saída",
    commands: "Comandos",
    editors: "Editores",
    settings: "Configurações",
    aliases: "Aliases",
    newsEmpty: "Sem versões publicadas.",
    newsAdded: "Adicionado",
    newsImproved: "Melhorado",
    newsFixed: "Corrigido",
    notices: { info: "Informação", dica: "Dica", cuidado: "Cuidado", perigo: "Perigo" },
    modalities: { desktop: "Desktop", web: "Web", vscode: "VS Code" },
    version: "Versão",
  },
  en: {
    docs: "Docs",
    search: "Search",
    searchPlaceholder: "Search the documentation",
    searchHint: "Shortcuts: / or Ctrl+K",
    searchEmpty: "No results.",
    searchMinChars: "Type at least 2 characters.",
    searchResults: "Search results",
    searchClose: "Close search",
    menu: "Documentation menu",
    closeMenu: "Close menu",
    sidebarLabel: "Documentation navigation",
    tocLabel: "On this page",
    previous: "Previous",
    next: "Next",
    modalityLabel: "Platform",
    languageLabel: "Language",
    onThisPage: "On this page",
    translationPending: "Translation pending",
    translationPendingBody: "This page has not been translated yet. You are seeing the Portuguese (pt-BR) version.",
    pageNotFound: "Page not found",
    pageNotFoundBody: "This page does not exist. Use the sidebar or search to find what you need.",
    contentMissing: "The documentation content was not synced in this build. Run `npm run sync-docs`.",
    contentError: "This page could not be loaded.",
    loading: "Loading…",
    copy: "Copy",
    copied: "Copied",
    copyFailed: "Failed: select and copy",
    copyLink: "Copy link to this section",
    linkCopied: "Link copied",
    appliesTo: "Applies to",
    notForModality: "This page does not cover the selected platform ({}).",
    palette: "Palette",
    unavailableIn: "not available in {}",
    unknownAction: "unknown action",
    tabCode: "Code",
    tabDiagram: "Diagram",
    tabSql: "SQL",
    tabMermaid: "Mermaid",
    dialect: "Dialect",
    fitView: "Fit to screen",
    wheelHint: "Ctrl + wheel to zoom",
    wheelHintMac: "⌘ + wheel to zoom",
    openInEditor: "Open in editor",
    editorPopoverLabel: "Open the example in the local editor",
    editorUrlLabel: "dbml run URL",
    editorUrlHelp:
      "Run `dbml run` on your machine and paste the URL it prints in the terminal (with `?token=`). The example opens as a new, unsaved document; the code travels in the URL fragment and never goes through any server.",
    editorUrlSubmit: "Open",
    editorUrlChange: "Change URL",
    editorUrlClear: "Forget",
    editorUrlUsing: "Using {}",
    editorUrlSavedOnlyHere: "The URL is kept only in this tab (cleared when closed).",
    editorUrlNotSaved: "This browser did not let us keep the URL: it only applies to this page.",
    editorUrlPreparing: "Preparing the example…",
    editorUrlClose: "Close",
    editorUrlErrors: {
      invalid: "That does not look like a URL. Paste the full address from the terminal.",
      protocol: "Use a URL that starts with http:// or https://.",
      token: "The URL needs the `?token=` that `dbml run` printed in the terminal.",
    },
    engineLoading: "Loading the diagram engine…",
    engineUnavailable: "The diagram engine is not available in this build.",
    exampleMissing: "Example not found:",
    exportError: "Could not generate the output: fix the DBML errors.",
    diagnostics: "DBML diagnostics",
    captureMissing: "Screenshot not available yet",
    expandImage: "Expand",
    closeImage: "Close expanded image",
    filterActions: "Filter actions",
    noRows: "No items.",
    colAction: "Action",
    colShortcut: "Shortcut",
    colName: "Name",
    colId: "ID",
    colTitle: "Title",
    colCategory: "Category",
    colKey: "Key",
    colType: "Type",
    colDefault: "Default",
    colScope: "Scope",
    colDescription: "Description",
    colShort: "Short",
    colValue: "Value",
    colEnv: "Environment variable",
    colHelp: "Help",
    colCommand: "Command",
    colExitCode: "Code",
    colMeaning: "Meaning",
    colRequired: "Required",
    options: "Options",
    positionals: "Arguments",
    globalOptions: "Global options",
    exitCodes: "Exit codes",
    commands: "Commands",
    editors: "Editors",
    settings: "Settings",
    aliases: "Aliases",
    newsEmpty: "No published versions.",
    newsAdded: "Added",
    newsImproved: "Improved",
    newsFixed: "Fixed",
    notices: { info: "Info", dica: "Tip", cuidado: "Caution", perigo: "Danger" },
    modalities: { desktop: "Desktop", web: "Web", vscode: "VS Code" },
    version: "Version",
  },
};

/** Preenche o `{}` do texto, como o `tFor` do canvas. */
export const fill = (template: string, ...values: (string | number)[]): string =>
  values.reduce<string>((text, value) => text.replace("{}", String(value)), template);
