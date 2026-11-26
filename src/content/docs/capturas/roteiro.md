# Roteiro das capturas

As capturas da documentação vêm de `cenas.json`, na mesma pasta que este arquivo. Há dois caminhos:

- **Cenas Web (`manual: false`)**: geradas por `./scripts/capturas.sh`, sem intervenção manual, nos temas claro e escuro.
  Os PNG ficam em `capturas/gerado/<id>-claro.png` e `capturas/gerado/<id>-escuro.png`. Não edite esses arquivos.
- **Cenas Desktop (`manual: true`)**: o app nativo (GPUI) não roda sob Playwright, então os prints são tirados à mão,
  seguindo este roteiro, com o mesmo schema e a mesma resolução da cena. Os arquivos ficam em
  `capturas/manual/<id>-claro.png` e `capturas/manual/<id>-escuro.png`.

O check da documentação (`./scripts/docs-check.sh`) só confere que cada arquivo manual existe. Enquanto o print não for
tirado, ele aparece como aviso. Para virar erro, mude `MANUAL_AUSENTE_E_ERRO` para `true` em
`scripts/capturas/constantes.mjs`.

## Regras para qualquer captura manual

1. **Resolução:** a da cena em `cenas.json` (`viewport`), hoje 1440 x 900 px de área útil da janela, em escala 1x. Em tela
   HiDPI, reduza o PNG para a resolução da cena ou ajuste a escala do sistema para 100% antes de capturar.
2. **Janela só do app:** capture apenas a janela do DB Modeling, sem barra de título do sistema, bordas, sombra ou outras
   janelas. No Windows, `scripts/screenshot.ps1` já faz isso (via `PrintWindow`).
3. **Idioma:** capture nas duas línguas da documentação (`pt-BR` e `en`). Use a ação "Idioma: Português (Brasil)" para
   `docs/site/capturas/manual/` e "Language: English" para `docs/site/capturas/manual/en/`.
4. **Schema:** abra o exemplo declarado em `exemplo` (`docs/site/exemplos/<exemplo>.dbml`) sem editá-lo. Não deixe
   alterações pendentes (o indicador de arquivo modificado fica apagado).
5. **Estado limpo:** sem tour de boas-vindas, sem toasts, sem diálogos abertos (a menos que a cena peça), sem seleção
   (a menos que a cena peça) e sem notificação de atualização.
6. **Tema:** duas capturas por cena, uma em "Tema: Claro" e outra em "Tema: Escuro" (pela paleta de comandos).
7. **Nome do arquivo:** `<id>-claro.png` e `<id>-escuro.png`, em `docs/site/capturas/manual/`. O `id` é o da cena.
8. **Peso:** PNG de até 400 KB por arquivo. Otimize sem perda (por exemplo `oxipng -o 4 --strip safe`) se passar.
9. **Atalhos:** os atalhos citados abaixo são os do Desktop em `docs/site/gerado/acoes.json`; confira lá se algum mudou.

## Atalho para os builds de debug

Em build de debug (ou com `--features harness`), o app lê variáveis de ambiente que facilitam o enquadramento
(`crates/app/src/harness.rs`):

```bash
DBM_SIZE=1440x900 DBM_MODE=light DBM_EDITOR=1 cargo run -p app -- docs/site/exemplos/loja.dbml
```

`DBM_MODE` aceita `light` e `dark`; `DBM_EDITOR=1` abre o editor ao lado do diagrama. O binário de release instalado ignora
essas variáveis.

## Cenas

### `desktop-visao-geral`

App Desktop com o editor DBML e o diagrama lado a lado.

| Item | Valor |
|---|---|
| Schema | `docs/site/exemplos/loja.dbml` |
| Resolução | 1440 x 900 px |
| Temas | claro e escuro |
| Arquivos | `capturas/manual/desktop-visao-geral-claro.png` e `capturas/manual/desktop-visao-geral-escuro.png` |

Passos (repita para cada tema):

1. Abra o app em 1440 x 900 px com o tema da captura (paleta de comandos, "Tema: Claro" ou "Tema: Escuro").
2. Abra `loja.dbml` pelo menu de arquivo ou passando o caminho na linha de comando.
3. Ative "Visão Dividido · DBML" (`Ctrl+2`; no macOS, o atalho do catálogo).
4. Ative "Ajustar à tela" (`Shift+1`) para enquadrar as 4 tabelas e o enum.
5. Tire o foco do editor sem selecionar nada: clique numa área vazia do canvas e aguarde um segundo, para o cursor do
   editor e qualquer animação terminarem.
6. Capture a janela e grave em `docs/site/capturas/manual/`.

O que conferir: as 4 tabelas (`pedidos`, `itens_pedido`, `clientes`, `produtos`), o enum `status_pedido` e o grupo
`vendas` aparecem; o editor mostra o início do arquivo; a barra de status indica 0 problemas.

## Adicionar uma cena nova

1. Acrescente a cena a `cenas.json` (`id` em kebab-case, `exemplo`, `acoes`, `viewport`, `manual`, `descricao`).
2. Cena Web: rode `./scripts/capturas.sh --cena <id>`, confira as duas imagens a olho (estado certo, nada cortado) e faça
   commit dos PNG. Cena Desktop: tire os dois prints e acrescente a seção da cena a este roteiro.
3. Use a cena nas páginas com `<Captura cena="<id>" alt="..." />`, sempre com texto alternativo no idioma da página.
