# BlazarLab 1.3.29 — correções aplicadas

Esta atualização parte da V1.3.28, preservando a arquitetura estática, os três métodos científicos, as séries sintéticas, os gráficos úteis e as preferências visuais existentes.

## Atualização V1.3.29

1. **Rastreabilidade bibliográfica:** os cartões dos resumos apontam para referências metodológicas verificadas por meio de âncoras internas; nenhum URL de manuscrito integral foi inventado.
2. **Transparência dos textos:** a seção explica que os cartões são resumos fornecidos pelo grupo e que esta versão não vincula URLs públicas verificadas para os textos integrais.
3. **Rótulo sintético:** a categoria antes identificada como “AGN” passa a aparecer como “AGN genérico”; a chave interna `AGN`, a quantidade de fontes e as curvas determinísticas permanecem iguais.
4. **Legibilidade móvel:** os rótulos de classe, fontes e valores do heatmap recebem dimensões mínimas ligeiramente maiores, preservando áreas de toque e rolagem localizada.
5. **Metadados de publicação:** o guia esclarece que `/BlazarLab_13/` é o endereço canônico de produção e `/teste-2000/` o endereço de revisão. Os metadados canônicos da página não foram alterados.
6. **Testes de regressão:** adicionada uma verificação para os rótulos científicos, os links metodológicos e a distinção entre endereço de revisão e produção.

## Base preservada da V1.3.28

- Corrigida a autoria bibliográfica de EntropyHub para Flood e Grimm (2021) e incluída a referência de Bandt–Pompe (2002).
- Rótulos inferiores do hero separados para evitar sobreposição.
- Unidade energética exibida uma única vez na matriz fonte × banda; alvos de toque do rodapé ampliados.
- Histórico do changelog consolidado; contagem de 144 pontos por banda preservada.
- Nenhuma fórmula científica, parâmetro analítico ou série sintética foi alterada.

## Publicação

Extraia `blazarlab-public-v1.3.29-rastreabilidade-mobile.zip` e copie o conteúdo da pasta `blazarlab_v1.3.29/` para a raiz do repositório de destino, mantendo `index.html` na raiz. Consulte `README-GITHUB-UPLOAD.md` para distinguir o endereço de revisão do endereço canônico de produção.
