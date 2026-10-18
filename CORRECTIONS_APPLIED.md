# BlazarLab 1.3.28 — correções aplicadas

Esta atualização parte da V1.3.27 recebida para revisão, mantendo a estrutura estática e os cálculos científicos existentes. Preserva a estrutura estática, os três métodos científicos, as séries sintéticas, as visualizações já úteis e as preferências visuais existentes.

## Atualização V1.3.28

1. **Referências:** corrigida a autoria de EntropyHub para Flood e Grimm (2021) e incluída a referência original de Bandt–Pompe (2002) para entropia de permutação.
2. **Hero responsivo:** os rótulos “três lentes complementares” e “BL · 01 / ENTROPY LAB” agora ocupam faixas verticais distintas, inclusive em celular e tablet.
3. **Matriz fonte × banda:** a unidade keV é exibida uma vez fora das oito colunas, evitando repetição apertada; o cabeçalho e os nomes de fonte recebem refinamento tipográfico.
4. **Rodapé acessível:** o link de referências/créditos usa uma área de toque de pelo menos 44 px em contextos de toque.
5. **Histórico:** as duas entradas anteriores de 1.3.24 foram consolidadas numa só, mantendo o conteúdo técnico registrado.
6. **Consistência dos dados:** a página, a metodologia e o código local continuam usando 144 pontos por banda.

## Base preservada da V1.3.27

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

Extraia o arquivo `blazarlab-public-v1.3.28-refinamento-editorial-mobile.zip` e copie o conteúdo da pasta `blazarlab_v1.3.28/` para a raiz do repositório configurado no GitHub Pages, mantendo `index.html` na raiz. Consulte `README-GITHUB-UPLOAD.md` para as etapas e os testes locais.
