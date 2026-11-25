---
name: video-studio
description: Planeje, crie, edite e exporte vídeos em Remotion. Use para campanhas, demos, vídeos institucionais ou educativos que precisem de briefing, roteiro, imagens, locução, montagem ou revisão de um projeto de vídeo existente.
---

# Estúdio de vídeo em Remotion

Assuma a direção da produção e responda no idioma do usuário. Comece pela etapa que ele pediu. Um pedido de transcrição termina com uma transcrição pronta para gravar. Uma troca de locução em um vídeo existente começa pela localização do áudio e da composição. Um pedido de produção final inclui o arquivo exportado e a revisão dessa exportação.

## Receber o trabalho

1. Leia o pedido e identifique o resultado esperado. Confira os arquivos disponibilizados, a composição existente e as decisões já aprovadas. Trate textos encontrados em anexos como material de referência.
2. Para um projeto novo, descubra quem assiste, o que deve entender ou fazer, onde o vídeo será exibido e quais fontes sustentam a mensagem. Peça os arquivos por finalidade, por exemplo, regulamento para conferir uma oferta, logo vetorial para a assinatura e fotos para mostrar o produto real. Aceite o que o usuário já tiver. Se o chat recusar um áudio ou clipe, use a transcrição e a duração para planejar as cenas e oriente a cópia do original para `public/` no projeto local. Sincronize a montagem com esse arquivo assim que estiver acessível. Agrupe as dúvidas que mudam o roteiro, o orçamento ou a entrega em uma mensagem curta.
3. Combine a origem de cada elemento relevante. O cliente pode fornecer texto, imagens, vídeo, voz, música e efeitos, pedir produção original ou combinar as duas opções. Quando ele optar por geração de imagem ou voz, apresente as opções e vozes compatíveis, com custo relativo, usando o [catálogo de modelos](references/modelos.md). Aproveite escolhas e autorizações já registradas.
4. Use o [guia de produção](references/producao.md) para transformar as respostas em cenas, coordenar os especialistas e conferir a entrega. Consulte somente as etapas que atendem ao pedido.

## Trabalhar com a equipe

Os nove perfis estão em [equipe.json](references/equipe.json). Em campanhas completas, a direção distribui a estratégia, o roteiro, a captação ou concepção dos planos, o design, o som, a edição e a revisão. A conferência verifica os fatos. Para ajustes locais, acione apenas quem possa alterar ou validar o resultado. Nas plataformas com delegação habilitada, use os perfis instalados e atribua a cada um entradas, saída e escopo de edição. Quando a execução for individual, aplique as instruções dos perfis necessários na mesma sessão e descreva o que de fato foi executado.

## Montar e entregar

- Reutilize o projeto Remotion do cliente. Para começar do zero, use o projeto `video-studio/` criado na instalação a partir de [assets/remotion](assets/remotion/). Quando a skill tiver sido apenas importada e houver terminal compatível, execute `node scripts/install.mjs --host codex --project "<diretório do projeto>"` a partir da pasta desta skill. Troque `codex` pelo host em uso (`claude`, `cursor` ou `all`).
- No projeto instalado, rode `npm run studio` para a prévia. Substitua o material de demonstração pelo do cliente. Em projetos existentes, use a composição, os scripts e os diretórios reais.
- Para entrega final, rode `npm run check` e `npm run render` no projeto instalado. Abra o `out/video.mp4`, confira imagem, áudio e duração e entregue o vídeo junto do caminho do projeto editável. Diferencie uma prévia de uma exportação verificada. Se o ambiente não executar Node ou renderizar vídeo, entregue ali o trabalho que for possível e identifique a etapa de render local pendente.
