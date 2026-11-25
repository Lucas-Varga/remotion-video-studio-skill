# Um dia à beira-mar

Curta de exemplo em três cenas. A ilustração de um dia na praia é desenhada pelo próprio Remotion e funciona offline depois da instalação. O projeto começa em 1080 × 1920, a 30 quadros por segundo, com nove segundos de duração.

## Editar e exportar

Na pasta deste projeto, execute `npm run studio` para abrir a composição **Filme**. O instalador da skill prepara as dependências e o navegador de renderização. Para usar o projeto isoladamente, instale Node.js 22.13 ou superior e execute `npm ci` antes de abrir o Studio.

1. Em `src/story.ts`, altere o título, a linha de identificação, a duração e as cores de cada cena. O título aceita uma quebra de linha com `\n`. O total de quadros é recalculado a partir das três durações.
2. Copie os arquivos de mídia para `public/`. Para trocar a ilustração de uma cena, informe o caminho relativo em `image`, como `imagens/produto.jpg`. A imagem preenche o quadro com recorte central. Confira o produto e a marca no Studio.
3. Para usar uma narração ou trilha recebida, preencha `narration.file` ou `music.file` com um caminho como `audio/locucao.wav`. Em cada faixa, `startSeconds` desloca a entrada a partir do início do filme e `volume` controla o ganho de 0 a 1. A trilha se repete e termina com um fade. Ajuste as durações das cenas para acomodar a última palavra da voz.
4. Use `npm run check` para conferir o TypeScript e `npm run render` para exportar em H.264 para `out/video.mp4`.

A composição em `src/index.tsx` define a sequência dos planos e a mixagem. A direção de arte fica em `src/Seascape.tsx`. Para uma campanha nova, substitua a identidade, o enquadramento e a narrativa conforme o briefing.
