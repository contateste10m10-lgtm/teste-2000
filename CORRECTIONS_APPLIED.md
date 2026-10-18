# BlazarLab 1.3.26 — correções aplicadas

Esta versão parte do pacote público 1.3.24 e preserva a estrutura estática do site.

## Correções principais

1. **Consistência do tamanho das séries:** eliminada a referência residual a 240 pontos. A demonstração e a galeria multibanda usam 144 pontos por banda; os textos e o estado inicial dos gráficos agora concordam com o código.
2. **Tratamento de MSE-WPE/CI:** uma escala com série insuficiente ou peso total nulo é marcada como indefinida, não como entropia zero. O Complexity Index só é mostrado quando todas as oito escalas têm valores válidos. Gráfico, tabela e heatmap preservam esse estado.
3. **Proveniência científica:** incluída uma separação visual entre as séries sintéticas no perfil de energia Swift/BAT e os resultados reportados de rádio a 15 GHz do OVRO.
4. **Cartões de manuscritos:** os resumos são apresentados sem links para versões integrais não verificadas. Na versão 1.3.26, os atalhos Google Scholar foram removidos conforme solicitado.
5. **Compartilhamento e indexação:** adicionados URL canônica, `og:url`, metadados Open Graph/Twitter completos e prévia PNG de 1200 × 630 px com endereço absoluto.
6. **Testes contínuos:** adicionado `tests/consistency-regression.cjs` e ampliado o workflow do GitHub Actions para executar os testes de geometria responsiva, zoom móvel, paleta e fundos/tema que já estavam no pacote mas não faziam parte do workflow.
7. **Documentação:** README, instruções de publicação e changelog atualizados para a versão 1.3.26.

## Verificações executadas

- `node --check blazarlab.js` — aprovado.
- Todos os arquivos `tests/*.cjs` — aprovados individualmente.
- Testes de fumaça com larguras de 320, 390, 430, 600, 768 e 1024 px — aprovados.

A bateria automatizada não substitui a revisão visual manual em navegadores reais nem testes com VoiceOver/TalkBack. Esses testes continuam recomendados antes de declarar conformidade completa com WCAG.

## Publicação

Extraia o ZIP e copie **o conteúdo** da pasta `blazarlab_v1.3.26/` para a raiz do repositório configurado no GitHub Pages, de modo que `index.html` fique na raiz. O arquivo `README-GITHUB-UPLOAD.md` contém a sequência de publicação e os comandos de teste.


## Atualização 1.3.26 — visualização responsiva e comparação de métodos

1. O mapa de sensibilidade SampEn deixa de ser fixado em 560 px no desktop e passa a ocupar a largura do cartão.
2. Em telas de até 899 px, a matriz passa a uma tabela transposta: tolerâncias em linhas e dimensões m em colunas, com células legíveis e sem rolagem horizontal da página.
3. A visualização de todas as bandas também possui representação móvel própria; clicar em uma célula mantém a seleção de banda.
4. Removidos dos três cartões os atalhos e o texto “Buscar versão do manuscrito no Google Scholar ↗”.
5. Adicionada comparação direta entre SampEn, Fisher–Shannon e MSE-WPE/CI, com botões que abrem o gráfico correspondente na galeria.
6. Atualizados os testes para confirmar a ausência dos atalhos Google Scholar, a presença da comparação e o layout de matriz móvel.
