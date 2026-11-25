# Video Studio · Remotion

Transforme um briefing, fotos de produto e uma locução em um vídeo editável. A skill conduz a conversa em português, distribui o trabalho entre nove especialistas e usa o Remotion para montar, sincronizar e exportar o filme.

[Baixar a skill em ZIP](https://github.com/Lucas-Varga/remotion-video-studio-skill/releases/latest/download/video-studio.zip) · [Assistir ao exemplo em MP4](https://github.com/Lucas-Varga/remotion-video-studio-skill/releases/latest/download/exemplo.mp4) · [Consultar modelos de voz e imagem](skills/video-studio/references/modelos.md)

<a href="https://github.com/Lucas-Varga/remotion-video-studio-skill/releases/latest/download/exemplo.mp4"><img src="docs/exemplo.png" alt="Quadro do curta Um dia à beira-mar, com um sol sobre o mar ao meio-dia" width="180"></a>

*Um dia à beira-mar* é o curta editável incluído. As três cenas mostram como cor, movimento e tipografia contam uma história em nove segundos. Você pode substituir cada ilustração por uma foto e acrescentar sua própria voz e trilha.

## Instalar com o Remotion

Para trabalhar no computador, instale [Node.js 22.13 ou superior com npm](https://nodejs.org/) e [Git](https://git-scm.com/downloads). O comando abaixo cria a pasta do projeto, registra a skill e os nove agentes e instala o Remotion, as dependências fixadas e o navegador de renderização. A primeira execução precisa de internet. A instalação e o vídeo de exemplo dispensam chave de API.

```sh
npx --yes --package=github:Lucas-Varga/remotion-video-studio-skill#v1.0.0 video-studio-install --host all --project meu-filme
```

Abra **meu-filme** no Codex, no Claude Code ou no Cursor e peça seu vídeo. Para instalar em apenas um deles, troque `all` por `codex`, `claude` ou `cursor`. Se o editor já estava aberto, inicie uma nova sessão na raiz do projeto.

Também é possível usar o ZIP da release. Depois de descompactá-lo, execute o seguinte comando na pasta que contém o diretório `video-studio`.

```sh
node video-studio/scripts/install.mjs --host all --project meu-filme
```

Dentro de `meu-filme/video-studio`, rode `npm run studio` para abrir a prévia, `npm run check` para conferir o TypeScript e `npm run render` para exportar `out/video.mp4`. Edite as cenas em `src/story.ts` e coloque sua mídia em `public/`. Você pode repetir o instalador para adicionar um editor ao projeto. Ele preserva a montagem e os perfis que você personalizou.

## Usar no ChatGPT ou no Claude na web

| Ambiente | Como instalar |
| --- | --- |
| ChatGPT com Skills habilitadas | Baixe o ZIP acima. Na barra lateral, abra **Plugins → Skills → Create → Upload from your computer** e selecione o arquivo. A disponibilidade depende do plano e das permissões do workspace. [Guia do ChatGPT](https://help.openai.com/en/articles/20001066-skills-in-chatgpt) |
| Claude com Skills habilitadas | Em **Customize → Skills → + → Create skill → Upload a skill**, envie o mesmo ZIP e ative a skill. [Guia do Claude](https://support.claude.com/en/articles/12512180-use-skills-in-claude) |

O ZIP leva os prompts da equipe, o código do projeto, o instalador e as versões das dependências. O upload disponibiliza a skill no chat. Para produzir o MP4, o ambiente de execução precisa poder instalar pacotes npm e executar o navegador do Remotion. Se o chat só tiver acesso a arquivos, use-o para preparar o briefing, o roteiro e a montagem e execute o instalador local para renderizar. Os nove papéis também funcionam como etapas conduzidas pelo próprio assistente em chats sem subagentes nativos.

## Começar uma produção

> Use a skill Video Studio. Quero um anúncio vertical de 20 segundos para apresentar minha cafeteria. Tenho fotos da loja, a marca em SVG e uma locução pronta. Use esses arquivos, sugira uma trilha e termine com um convite para conhecer o espaço.

Você pode começar só com a ideia ou anexar um PDF, fotos, clipes, logotipo, manual de marca e áudio. A direção identifica o que já foi decidido e pergunta pelos pontos que alteram a peça, como quem vai assistir, o que essa pessoa deve fazer, o canal, os materiais obrigatórios e o que pode ser gerado.

- **Só material fornecido.** Use a identidade, as fotos e a voz entregues pelo cliente. A equipe ajusta enquadramento, ritmo, texto na tela e mixagem.
- **Conteúdo original.** A equipe propõe conceito, roteiro e cenas. Para gerar mídia, apresenta modelo, timbre, interpretação, qualidade e custo antes de consumir créditos.
- **Produção híbrida.** Preserve os produtos e a locução do cliente e gere, por exemplo, apenas uma cena de apoio. O cliente pode escolher o tratamento de cada material.

O catálogo apresenta alternativas de locução e imagem da produção mais exigente à econômica, com vozes compatíveis por modelo e links oficiais. O gasto depende das escolhas e da conta do provedor. [Abrir o catálogo](skills/video-studio/references/modelos.md)

## Quem trabalha no vídeo

| Função | Entrega |
| --- | --- |
| Direção | Integra o briefing, escolhe quais especialistas acionar e conduz a entrega. |
| Marketing | Define público, benefício principal e ação esperada. |
| Roteiro | Escreve a fala, os textos de tela e suas entradas por cena. |
| Videomaker | Planeja planos, continuidade e movimentos de câmera. |
| Direção de arte e design | Define tipografia, composição, identidade e tratamento de imagens. |
| Som | Dirige a locução, escolhe a trilha e mede a relação entre voz, música e efeitos. |
| Edição | Constrói a composição no Remotion e sincroniza cenas, legendas e áudio. |
| Conferência | Verifica nomes, datas, condições, produtos e fontes. |
| Revisão | Assiste à peça e verifica compreensão, leitura e acabamento. |

Os perfis locais ficam em `.codex/agents`, `.claude/agents` e `.cursor/agents`, conforme a seleção. Eles usam a configuração de modelo do ambiente. O custo depende dos especialistas que a direção aciona. [Perfis completos](skills/video-studio/references/equipe.json) · [Fluxo de produção](skills/video-studio/references/producao.md)

## Licenças e origem

A skill e seu template autoral são distribuídos sob a licença MIT. O Remotion tem condições próprias para uso individual e empresarial. Fotos, músicas, vozes e fontes de cada campanha seguem as licenças dos respectivos titulares. [Licença do pacote](LICENSE) · [Licenciamento do Remotion](https://www.remotion.dev/license)

O formato de distribuição, o briefing guiado e os critérios de conferência seguem o exemplo da skill de produção gráfica do mesmo autor. [Flyer CMYK Skill](https://github.com/Lucas-Varga/flyer-cmyk-skill)
