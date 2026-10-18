# Publicação do BlazarLab V1.3.28

1. Faça backup da versão existente do repositório público.
2. Extraia `blazarlab-public-v1.3.28-refinamento-editorial-mobile.zip`.
3. Copie o conteúdo da pasta `blazarlab_v1.3.28/` para a raiz do repositório, mantendo `index.html` na raiz.
4. Publique na branch e pasta configuradas em GitHub Pages.
5. Após a publicação, teste os temas claro/escuro, o menu móvel, a navegação por teclado, as animações dos três métodos, tabelas dos gráficos, heatmaps, zoom, tela cheia e exportação PNG em desktop e celular.
6. Confirme que todos os arquivos da mesma versão foram publicados juntos. Os contadores no hero, na metodologia e na galeria devem coincidir com `MULTIBAND_N` (144 pontos por banda).
7. Antes de publicar em um repositório ou caminho diferente, confira se `rel="canonical"`, `og:url` e os endereços da prévia social correspondem ao endereço final pretendido. O pacote mantém o endereço canônico já configurado; confirme o destino antes de alterá-lo.

## Verificações locais

Com Node.js instalado, execute na raiz do projeto:

```sh
node --check blazarlab.js
node tests/site-integrity.cjs
node tests/reference-layout-regression.cjs
node tests/consistency-regression.cjs
node tests/heatmap-mobile-regression.cjs
node tests/source-band-mobile-matrix.cjs
node tests/responsive-geometry.cjs
node tests/mobile-zoom-regression.cjs
node tests/theme-backgrounds-responsive.cjs
node tests/performance-optimizations.cjs
node tests/png-theme-export.cjs
node tests/smoke-test.cjs
node tests/fullscreen-regression.cjs
node tests/accessibility-responsive.cjs
node tests/method-showcase.cjs
node tests/method-animation-regression.cjs
VIEWPORT_WIDTH=320 node tests/smoke-test.cjs
VIEWPORT_WIDTH=390 node tests/smoke-test.cjs
VIEWPORT_WIDTH=430 node tests/smoke-test.cjs
VIEWPORT_WIDTH=600 node tests/smoke-test.cjs
VIEWPORT_WIDTH=768 node tests/smoke-test.cjs
VIEWPORT_WIDTH=1024 node tests/smoke-test.cjs
```

Os testes automatizados não substituem inspeção visual em navegadores reais e testes com leitores de tela. Recomenda-se validar em Safari/iOS/VoiceOver, Chrome/Android/TalkBack e navegador desktop antes de declarar conformidade WCAG.
