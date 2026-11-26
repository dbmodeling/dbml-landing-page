// Destaque de sintaxe mínimo (DBML, SQL, shell, JSON, Mermaid) sem dependências.
// Cada linguagem é uma lista ordenada de regras; vence a regra que casa mais cedo no texto.

export type TokenKind = "kw" | "con" | "ty" | "str" | "com" | "num" | "fn" | "plain";

export interface Token {
  kind: TokenKind;
  text: string;
}

interface Rule {
  kind: TokenKind;
  re: RegExp;
}

const DBML_TYPES =
  "int|integer|bigint|smallint|tinyint|serial|bigserial|varchar|char|text|boolean|bool|decimal|numeric|float|double|real|date|datetime|time|timestamp|timestamptz|uuid|json|jsonb|bytea|blob";

const DBML: Rule[] = [
  { kind: "com", re: /\/\/[^\n]*|\/\*[\s\S]*?\*\//y },
  { kind: "str", re: /'''[\s\S]*?'''|'(?:[^'\\\n]|\\.)*'|"(?:[^"\\\n]|\\.)*"/y },
  { kind: "fn", re: /`[^`\n]*`/y },
  { kind: "kw", re: /\b(?:Table|TableGroup|TablePartial|Enum|Ref|Project|Indexes|Note|as)\b/y },
  {
    kind: "con",
    re: /\b(?:pk|primary key|not null|null|unique|increment|default|note|ref|delete|update|cascade|restrict|set null|set default|no action|name|type|headercolor|color|database_type)\b(?=\s*[\],:])/y,
  },
  { kind: "ty", re: new RegExp(`\\b(?:${DBML_TYPES})\\b`, "iy") },
  { kind: "num", re: /\b\d+(?:\.\d+)?\b/y },
];

const SQL_KEYWORDS =
  "CREATE|TABLE|PRIMARY|KEY|FOREIGN|REFERENCES|NOT|NULL|UNIQUE|DEFAULT|ALTER|ADD|CONSTRAINT|INDEX|ON|DELETE|UPDATE|CASCADE|SET|IF|EXISTS|DROP|INSERT|INTO|VALUES|SELECT|FROM|WHERE|AND|OR|CHECK|TYPE|AS|ENUM|SCHEMA|GO|USE|IDENTITY|AUTO_INCREMENT|AUTOINCREMENT|COMMENT|COLUMN|VIEW|TRIGGER";

const SQL: Rule[] = [
  { kind: "com", re: /--[^\n]*|\/\*[\s\S]*?\*\//y },
  { kind: "str", re: /'(?:[^'\n]|'')*'/y },
  { kind: "kw", re: new RegExp(`\\b(?:${SQL_KEYWORDS})\\b`, "iy") },
  { kind: "ty", re: new RegExp(`\\b(?:${DBML_TYPES}|varchar2|nvarchar|number|bit|money|datetime2|clob)\\b`, "iy") },
  { kind: "num", re: /\b\d+(?:\.\d+)?\b/y },
];

const SHELL: Rule[] = [
  { kind: "com", re: /(?<![^\s])#[^\n]*/y },
  { kind: "str", re: /'[^'\n]*'|"(?:[^"\\\n]|\\.)*"/y },
  { kind: "fn", re: /\$\{?[A-Za-z_][A-Za-z0-9_]*\}?/y },
  { kind: "con", re: /(?<![^\s])--?[A-Za-z][\w-]*/y },
  { kind: "kw", re: /(?<![^\s|&;$])(?:sudo|dbml|docker|npm|npx|curl|brew|apt|apt-get|dnf|git|code|winget|iwr|irm)\b/y },
  { kind: "num", re: /\b\d+(?:\.\d+)*\b/y },
];

const JSON_RULES: Rule[] = [
  { kind: "ty", re: /"(?:[^"\\\n]|\\.)*"(?=\s*:)/y },
  { kind: "str", re: /"(?:[^"\\\n]|\\.)*"/y },
  { kind: "kw", re: /\b(?:true|false|null)\b/y },
  { kind: "num", re: /-?\b\d+(?:\.\d+)?(?:[eE][+-]?\d+)?\b/y },
];

const MERMAID: Rule[] = [
  { kind: "com", re: /%%[^\n]*/y },
  { kind: "str", re: /"[^"\n]*"/y },
  { kind: "kw", re: /\berDiagram\b|\b(?:PK|FK|UK)\b/y },
  { kind: "con", re: /[|}o{]{1,2}--[|}o{]{1,2}|\|\|--\|\||\}o--o\{/y },
  { kind: "ty", re: new RegExp(`\\b(?:${DBML_TYPES}|string|datetime)\\b`, "iy") },
];

const LANGUAGES: Record<string, Rule[]> = {
  dbml: DBML,
  sql: SQL,
  sh: SHELL,
  bash: SHELL,
  shell: SHELL,
  console: SHELL,
  powershell: SHELL,
  json: JSON_RULES,
  mermaid: MERMAID,
};

export const isHighlightable = (lang: string | undefined): boolean => !!lang && lang in LANGUAGES;

export function tokenize(code: string, lang: string | undefined): Token[] {
  const rules = lang ? LANGUAGES[lang] : undefined;
  if (!rules) return [{ kind: "plain", text: code }];
  const tokens: Token[] = [];
  let plainStart = 0;
  let i = 0;
  const flushPlain = (end: number) => {
    if (end > plainStart) tokens.push({ kind: "plain", text: code.slice(plainStart, end) });
  };
  while (i < code.length) {
    let matched: { rule: Rule; length: number } | null = null;
    for (const rule of rules) {
      rule.re.lastIndex = i;
      const m = rule.re.exec(code);
      if (m && m[0].length > 0) {
        matched = { rule, length: m[0].length };
        break;
      }
    }
    if (matched) {
      flushPlain(i);
      tokens.push({ kind: matched.rule.kind, text: code.slice(i, i + matched.length) });
      i += matched.length;
      plainStart = i;
    } else {
      i += 1;
    }
  }
  flushPlain(code.length);
  return tokens;
}
