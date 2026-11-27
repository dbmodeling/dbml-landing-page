import { loadVscode } from "../content";
import { useDocs } from "../context";
import { vscodeCommandAnchor, vscodeSettingAnchor } from "../shared.mjs";
import { AnchorRow, Mono, TableScroll, Td, Th } from "./RefTable";
import { useAsync } from "./useAsync";

/** Referência da extensão a partir de `gerado/vscode.json` (comandos, configurações e editores). */
export function RefVscode() {
  const { t } = useDocs();
  const state = useAsync(loadVscode);
  if (!state.done) return <p className="text-sm text-muted-foreground">{t.loading}</p>;
  const data = state.data;
  if (!data) return <p className="text-sm text-muted-foreground">{t.contentMissing}</p>;
  return (
    <div className="docs-ref-vscode">
      <h3 className="mt-8 mb-2 text-base font-bold">{t.commands}</h3>
      <TableScroll label={t.commands}>
        <table className="w-full border-collapse min-w-[36rem]">
          <thead>
            <tr>
              <Th>{t.colTitle}</Th>
              <Th>{t.colId}</Th>
              <Th>{t.colCategory}</Th>
              <Th className="w-8"><span className="sr-only">{t.copyLink}</span></Th>
            </tr>
          </thead>
          <tbody>
            {data.comandos.map((cmd) => (
              <AnchorRow key={cmd.id} id={vscodeCommandAnchor(cmd.id)}>
                <Td className="font-medium">{cmd.titulo}</Td>
                <Td><Mono>{cmd.id}</Mono></Td>
                <Td>{cmd.categoria}</Td>
              </AnchorRow>
            ))}
          </tbody>
        </table>
      </TableScroll>

      <h3 className="mt-10 mb-2 text-base font-bold">{t.settings}</h3>
      <TableScroll label={t.settings}>
        <table className="w-full border-collapse min-w-[44rem]">
          <thead>
            <tr>
              <Th>{t.colKey}</Th>
              <Th>{t.colType}</Th>
              <Th>{t.colDefault}</Th>
              <Th>{t.colScope}</Th>
              <Th>{t.colDescription}</Th>
              <Th className="w-8"><span className="sr-only">{t.copyLink}</span></Th>
            </tr>
          </thead>
          <tbody>
            {data.configuracoes.map((cfg) => (
              <AnchorRow key={cfg.chave} id={vscodeSettingAnchor(cfg.chave)}>
                <Td><Mono className="font-semibold">{cfg.chave}</Mono></Td>
                <Td><Mono>{cfg.tipo}</Mono></Td>
                <Td>{cfg.padrao !== null && cfg.padrao !== undefined ? <Mono>{String(cfg.padrao)}</Mono> : null}</Td>
                <Td><Mono>{cfg.escopo}</Mono></Td>
                <Td>
                  {cfg.descricao}
                  {cfg.valores?.length ? (
                    <ul className="mt-1 space-y-0.5 text-xs text-muted-foreground">
                      {cfg.valores.map((v) => (
                        <li key={v.valor}>
                          <Mono>{v.valor}</Mono> — {v.descricao}
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

      {data.editores.length ? (
        <>
          <h3 className="mt-10 mb-2 text-base font-bold">{t.editors}</h3>
          <TableScroll label={t.editors}>
            <table className="w-full border-collapse min-w-[32rem]">
              <thead>
                <tr>
                  <Th>{t.colName}</Th>
                  <Th>{t.colId}</Th>
                  <Th>{t.colValue}</Th>
                </tr>
              </thead>
              <tbody>
                {data.editores.map((editor) => (
                  <tr key={editor.id}>
                    <Td className="font-medium">{editor.nome}</Td>
                    <Td><Mono>{editor.id}</Mono></Td>
                    <Td><Mono>{editor.padroes.join(", ")}</Mono></Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TableScroll>
        </>
      ) : null}

      {[data.workspace_nao_confiavel, data.workspace_virtual].filter(Boolean).map((text) => (
        <p key={text} className="text-sm">{text}</p>
      ))}
    </div>
  );
}
