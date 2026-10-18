# BlazarLab 1.3.27 — correções aplicadas

Esta atualização parte do pacote público V1.3.26 enviado para revisão. Preserva a estrutura estática, os três métodos científicos, as séries sintéticas, as visualizações já úteis e as preferências visuais existentes.

## Atualização V1.3.27

1. **Heatmap fonte × banda em celular:** acrescentada uma matriz HTML acessível com 24 fontes × 8 bandas, células selecionáveis e alvos de toque ampliados. A versão SVG original permanece no desktop.
2. **Leitura durante a rolagem:** o identificador da fonte fica fixo à esquerda dentro da matriz; as bandas aparecem no cabeçalho e a rolagem fica confinada ao componente.
3. **Sincronização e teclado:** selecionar uma célula atualiza a fonte e a banda nos outros gráficos; a matriz móvel suporta setas, Home/End e ativação nativa de botões.
4. **Sensibilidade m × r:** ampliada a altura das células móveis e preservada a rolagem interna quando o espaço disponível não permite células mais largas.
5. **Regressão automatizada:** incluído teste específico para presença, estrutura e acessibilidade da matriz móvel. Nenhuma fórmula científica ou série sintética foi alterada.

## Base técnica preservada da V1.3.26

- A galeria demonstrativa utiliza séries sintéticas determinísticas de 144 pontos por banda; a descrição da interface e o código concordam sobre esse tamanho.
- Estimativas WPE indefinidas continuam como indefinidas. O Complexity Index só é informado quando as oito escalas requeridas pela convenção do projeto são válidas.
- Séries sintéticas e resultados observacionais reportados são identificados separadamente.
- A página conserva metadados públicos, referência canônica e prévia social PNG.
- Os métodos Sample Entropy, Fisher–Shannon e MSE-WPE/CI mantêm suas definições documentadas, tabelas acessíveis, zoom, tela cheia e exportação PNG.

## Publicação

Extraia o arquivo `blazarlab-public-v1.3.27-matrizes-mobile-acessibilidade.zip` e copie o conteúdo da pasta `blazarlab_v1.3.27/` para a raiz do repositório configurado no GitHub Pages, mantendo `index.html` na raiz. Consulte `README-GITHUB-UPLOAD.md` para as etapas e os testes locais.
