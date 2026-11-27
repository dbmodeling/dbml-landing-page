import { loadCli, loadCliHelp, type CliCommand, type CliFile, type CliOption } from "../content";
import { DEFAULT_LANG } from "../constants";
import { useDocs } from "../context";
import { cliAnchor } from "../shared.mjs";
import { AnchorLink } from "./Heading";
import { AnchorRow, Mono, TableScroll, Td, Th } from "./RefTable";
import { useAsync } from "./useAsync";

type Help = (key: string, fallback: string) => string;

function OptionsTable({ options, scope, help }: { options: CliOption[]; scope: string[]; help: Help }) {
  const { t } = useDocs();
  return (
    <TableScroll label={t.options}>
      <table className="w-full border-collapse min-w-[44rem]">
        <thead>
          <tr>
            <Th>{t.colName}</Th>
            <Th>{t.colShort}</Th>
            <Th>{t.colValue}</Th>
            <Th>{t.colDefault}</Th>
            <Th>{t.colEnv}</Th>
            <Th>{t.colHelp}</Th>
            <Th className="w-8"><span className="sr-only">{t.copyLink}</span></Th>
          </tr>
        </thead>
        <tbody>
          {options.map((opt) => (
            <AnchorRow key={opt.nome} id={cliAnchor(scope, opt.nome)}>
              <Td><Mono className="font-semibold">{opt.nome}</Mono></Td>
              <Td>{opt.curto ? <Mono>{opt.curto}</Mono> : null}</Td>
              <Td>{opt.valor ? <Mono>{opt.valor}</Mono> : null}</Td>
              <Td>{opt.padrao ? <Mono>{opt.padrao}</Mono> : null}</Td>
              <Td>{opt.env ? <Mono>{opt.env}</Mono> : null}</Td>
              <Td className="min-w-[16rem]">
                {help(opt.nome, opt.ajuda)}
                {opt.valores?.length ? (
                  <ul className="mt-1 space-y-0.5 text-xs text-muted-foreground">
                    {opt.valores.map((v) => (
                      <li key={v.nome}>
                        <Mono>{v.nome}</Mono> — {v.ajuda}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </Td>
            </AnchorRow>
          ))}
        </tbody>
      </table>
    </TableScroll>
  );
}

function Command({ command, path, bin, help }: { command: CliCommand; path: string[]; bin: string; help: Help }) {
  const { t } = useDocs();
  const here = [...path, command.nome];
  const id = cliAnchor(path, command.nome);
  const usage = [bin, ...here, ...command.posicionais.map((p) => (p.obrigatorio ? `<${p.nome}>` : `[${p.nome}]`)), command.opcoes.length ? "[OPTIONS]" : ""].filter(Boolean).join(" ");
  return (
    <section aria-labelledby={`${id}-title`}>
      <h3 id={id} className="group scroll-mt-28 mt-8 mb-2 flex items-center gap-1.5 text-base font-bold">
        <span id={`${id}-title`}><Mono className="text-base">{[bin, ...here].join(" ")}</Mono></span>
        <AnchorLink id={id} />
      </h3>
      <p className="my-1 text-sm">{help(command.nome, command.ajuda)}</p>
      <p className="my-1 text-xs text-muted-foreground">
        <Mono>{usage}</Mono>
        {command.aliases.length ? <span> · {t.aliases}: <Mono>{command.aliases.join(", ")}</Mono></span> : null}
      </p>
      {command.posicionais.length ? (
        <TableScroll label={t.positionals}>
          <table className="w-full border-collapse min-w-[28rem]">
            <thead>
              <tr>
                <Th>{t.colName}</Th>
                <Th>{t.colRequired}</Th>
                <Th>{t.colHelp}</Th>
              </tr>
            </thead>
            <tbody>
              {command.posicionais.map((p) => (
                <tr key={p.nome}>
                  <Td><Mono className="font-semibold">{p.nome}</Mono></Td>
                  <Td>{p.obrigatorio ? "✓" : "—"}</Td>
                  <Td>{p.ajuda}</Td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableScroll>
      ) : null}
      {command.opcoes.length ? <OptionsTable options={command.opcoes} scope={here} help={help} /> : null}
      {command.subcomandos.map((sub) => (
        <Command key={sub.nome} command={sub} path={here} bin={bin} help={help} />
      ))}
    </section>
  );
}

function CliBody({ cli, translations }: { cli: CliFile; translations: Record<string, string> }) {
  const { contentLang, t } = useDocs();
  const help: Help = (key, fallback) => (contentLang === DEFAULT_LANG ? translations[key] : undefined) ?? fallback;
  return (
    <div className="docs-ref-cli">
      <p className="text-sm text-muted-foreground">
        <Mono>{cli.binario}</Mono> · {t.version} {cli.versao}
      </p>
      {cli.global.length ? (
        <>
          <h3 className="mt-8 mb-2 text-base font-bold">{t.globalOptions}</h3>
          <OptionsTable options={cli.global} scope={[]} help={help} />
        </>
      ) : null}
      <h3 className="mt-10 mb-0 text-[1.1rem] font-bold">{t.commands}</h3>
      {cli.subcomandos.map((cmd) => (
        <Command key={cmd.nome} command={cmd} path={[]} bin={cli.binario} help={help} />
      ))}
      <h3 className="mt-10 mb-2 text-base font-bold">{t.exitCodes}</h3>
      <TableScroll label={t.exitCodes}>
        <table className="w-full border-collapse min-w-[28rem]">
          <thead>
            <tr>
              <Th>{t.colCommand}</Th>
              <Th>{t.colExitCode}</Th>
              <Th>{t.colMeaning}</Th>
            </tr>
          </thead>
          <tbody>
            {cli.codigos_saida.map((row) => (
              <tr key={`${row.comando}-${row.codigo}`}>
                <Td><Mono>{row.comando === "*" ? cli.binario : `${cli.binario} ${row.comando}`}</Mono></Td>
                <Td><Mono>{row.codigo}</Mono></Td>
                <Td>{help(`exit:${row.comando}:${row.codigo}`, row.significado)}</Td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableScroll>
    </div>
  );
}

/** Referência da CLI a partir de `gerado/cli.json` (texto de ajuda do clap, em inglês). */
export function RefCli() {
  const { t } = useDocs();
  const cli = useAsync(loadCli);
  const help = useAsync(loadCliHelp);
  if (!cli.done) return <p className="text-sm text-muted-foreground">{t.loading}</p>;
  if (!cli.data) return <p className="text-sm text-muted-foreground">{t.contentMissing}</p>;
  return <CliBody cli={cli.data} translations={help.data ?? {}} />;
}
