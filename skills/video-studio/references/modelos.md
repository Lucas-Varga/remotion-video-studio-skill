# Escolher voz e imagem para o vídeo

Catálogo de produção consultado em **25 de novembro de 2026**. Na próxima campanha, confira os IDs, o estado e os preços nas fontes abaixo. Se houver chave configurada, consulte `GET /v1/models` no projeto usado para a produção. Sem acesso à conta, apresente o catálogo como referência e indique que a disponibilidade está pendente. Uma ferramenta de imagem integrada ao chat pode esconder o ID do modelo. Nesse caso, registre o nome da ferramenta e só prometa um ID específico quando o ambiente permitir selecioná-lo. [Modelos](https://developers.openai.com/api/docs/models) · [Acesso por projeto](https://developers.openai.com/api/docs/guides/rate-limits) · [Descontinuações](https://developers.openai.com/api/docs/deprecations)

## Narração gravada

| Opção, da produção principal à mais simples | Quando oferecer | Custo de referência |
| --- | --- | --- |
| **Produção principal** · `gpt-realtime-2.1` | Campanha em que interpretação, energia e pronúncia merecem uma prova de voz. Entrega uma tomada editável em WAV pelo script abaixo. | US$ 64 por milhão de tokens de saída de áudio. |
| **Menor custo** · `gpt-realtime-2.1-mini` | Rascunhos, várias versões regionais ou corte final se a tomada atender ao briefing. Aceita as mesmas vozes Realtime. | US$ 20 pela mesma unidade. |
| **Arquivo do cliente ou vídeo sem locução** | Receba WAV ou MP3 do locutor, estúdio ou ElevenLabs. Se o vídeo for visto no mudo, componha o texto de tela como narrativa principal. | Sem cobrança de geração pela skill. |

As tarifas acima são de saída. O orçamento total depende também do texto enviado e de quantas tomadas forem solicitadas. Registre a duração prevista, a quantidade de versões e o teto acordado. [Realtime 2.1](https://developers.openai.com/api/docs/models/gpt-realtime-2.1) · [Realtime 2.1 mini](https://developers.openai.com/api/docs/models/gpt-realtime-2.1-mini) · [Preços atuais](https://developers.openai.com/api/docs/pricing)

**Menu de vozes para os dois Realtime.** Ofereça `cedar` e `marin` primeiro, conforme a recomendação de qualidade da OpenAI. As demais opções são `alloy`, `ash`, `ballad`, `coral`, `echo`, `sage`, `shimmer` e `verse`. Escolha de timbre é artística. Peça idioma, variante regional, energia, ritmo e voz preferida. Para uma voz grave e madura em pt-BR, sugira testar Cedar com uma frase que contenha a marca, um número e a chamada à ação. Ofereça outra voz para comparação conforme o orçamento. Mantenha o mesmo texto e volume nas amostras. [Vozes e eventos Realtime](https://developers.openai.com/api/docs/guides/realtime-conversations)

**Se o pedido for uma conversa ao vivo**, apresente também `gpt-live-1.1`. Em português brasileiro, a OpenAI lista `tempo` com apresentação masculina e `bossa` com apresentação feminina. O modelo usa uma sessão Live e tem cobrança por duração. Para incorporar uma gravação Live já aprovada ao vídeo, importe o arquivo de áudio. O utilitário de narração deste pacote usa a API Realtime. [Modelo Live e tarifas](https://developers.openai.com/api/docs/models/gpt-live-1.1) · [Vozes por região](https://developers.openai.com/blog/prompting-multilingual-voice-agents)

**Voz personalizada e sistemas antigos.** Para reproduzir a voz de um locutor, verifique elegibilidade e use a amostra e o consentimento gravado pelo próprio titular conforme o fluxo oficial. Combine como identificar a voz sintética para o público. Em instalações antigas, `gpt-4o-mini-tts`, `tts-1-hd` e `tts-1` usam `/v1/audio/speech` e têm encerramento anunciado para 6 de janeiro de 2027. Novas integrações desta skill usam `/v1/realtime`. [Vozes personalizadas](https://developers.openai.com/api/docs/guides/custom-voices) · [Speech API](https://developers.openai.com/api/docs/guides/text-to-speech) · [Calendário](https://developers.openai.com/api/docs/deprecations)

## Imagens

| Opção | Modelo e ajuste inicial | Uso no corte |
| --- | --- | --- |
| **Imagem principal** | `gpt-image-2.6-sunburst` com `high`. Avalie `xhigh` ou `max` para detalhes pequenos visíveis na saída. | Foto de campanha, composição complexa ou edição com referência de produto. |
| **Produção rápida** | `gpt-image-2.6-flare` com `medium` ou `high`. | Fundos, planos de apoio e iterações da direção de arte. |
| **Storyboard econômico** | `gpt-image-2.6-flare` com `low`, uma imagem por cena necessária. | Verificar enquadramento, continuidade e espaço para texto antes de encomendar finais. |
| **Acervo do cliente** | Fotografia, logotipo, filmagem, frames de PDF com resolução suficiente ou imagens licenciadas. | Preservar fidelidade a produtos e pessoas, aproveitar material aprovado e eliminar custo de geração. |

Sunburst e Flare 2.6 têm a mesma tarifa por token de imagem na modalidade Standard. O custo de uma cena varia com resolução, qualidade, referências e novas tentativas. Para estimar, fixe o formato, a qualidade e a quantidade de imagens finais e de provas. As versões `gpt-image-2.5-sunburst` e `gpt-image-2.5-flare` também servem para dar continuidade a projetos que já as utilizam. [Guia de imagem](https://developers.openai.com/api/docs/guides/image-generation) · [Sunburst](https://developers.openai.com/api/docs/models/gpt-image-2.6-sunburst) · [Flare](https://developers.openai.com/api/docs/models/gpt-image-2.6-flare) · [Preços](https://developers.openai.com/api/docs/pricing)

Para um produto real, solicite uma foto nítida e o logotipo oficial. Faça uma **edição com referência** quando a origem fizer parte da cena. Confira rótulo, cores, forma e acessórios em comparação com a foto. Se a embalagem exigir precisão absoluta, recorte a fotografia original e gere só o ambiente. Aplique o logotipo e o texto final na composição Remotion a partir dos arquivos aprovados.

## Executar depois da escolha

Os utilitários são opcionais. A instalação e a renderização local com mídia própria dispensam chave de IA. Para gerar, configure `OPENAI_API_KEY` no ambiente do processo que executa o comando. Mantenha a chave fora do chat, da pasta `public/`, do JavaScript da composição e do Git. Execute cada comando apenas para a quantidade de tomadas ou imagens combinadas.

Nos exemplos, use o caminho real da pasta da skill para `CAMINHO_DA_SKILL`. Rode os comandos na pasta do projeto **Remotion** que contém `public/`.

**Gerar uma tomada de voz.** Prepare `fala.txt` em UTF-8 com o texto exato. O utilitário opcional precisa de Python 3.10+ e `websockets` em um ambiente virtual. Ative o ambiente antes de executar os comandos. As opções de modelo e voz são explícitas a cada tomada.

```sh
python -m pip install "websockets>=15,<17"
python "CAMINHO_DA_SKILL/scripts/narrar.py" --modelo gpt-realtime-2.1 --voz cedar --texto fala.txt --direcao "Português brasileiro. Timbre grave e maduro. Sorriso discreto na abertura, ênfase em presente, pausa curta antes da chamada." --saida public/audio/locucao-01.wav
```

O script reúne os blocos recebidos por WebSocket em um WAV mono a 24 kHz e imprime a transcrição retornada. Compare a fala ouvida com o texto aprovado, em especial números, condições e nomes próprios. Ajuste os cortes pela duração do áudio gravado. [WebSocket Realtime](https://developers.openai.com/api/docs/guides/voice-websockets) · [Eventos de áudio](https://developers.openai.com/api/docs/guides/realtime-conversations)

**Gerar ou editar uma imagem.** Crie `cena.txt` com ação, enquadramento, luz e espaço para a tipografia. O script Node usa a Image API e salva um PNG em um caminho inédito. Para criar do zero, omita `--referencia`. Para editar, repita essa opção para cada foto que o cliente autorizou enviar à API.

```sh
node "CAMINHO_DA_SKILL/scripts/imagem.mjs" --modelo gpt-image-2.6-sunburst --qualidade high --tamanho 864x1536 --prompt cena.txt --referencia produto.png --saida public/img/produto-01.png
```

Ao receber falha de cota ou permissão, registre o erro, confirme o modelo e proponha usar o acervo ou uma opção que o cliente aceite. Ao entregar, informe quais cenas receberam mídia gerada, respectivas vozes, modelos, origem dos outros arquivos e eventuais dados de consumo disponíveis.
