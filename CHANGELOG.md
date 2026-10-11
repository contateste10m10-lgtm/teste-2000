# Histórico de versões

## V0.8

- Removidos os painéis e números pré-carregados; o site funciona como laboratório independente, orientado aos dados que a pessoa importa.
- Adicionados controles de zoom, redefinição de escala e download PNG em cada gráfico Chart.js; controles próprios para ampliar/reduzir as células do heatmap.
- Incluído zoom por roda/pinça e seleção por arraste quando o plugin do navegador carregar; os botões manuais continuam disponíveis como alternativa.
- Ampliado o cálculo de Sample Entropy temporal para janelas de 100, 200, 300, 500, 800 e 1000 pontos.
- Otimizada a contagem de pares por ordenação na primeira coordenada, mantendo os mesmos A/B do cálculo de referência nos testes sintéticos.
- Incluídos indicador de progresso e cancelamento entre janelas no cálculo temporal.
- Substituído o corte fixo da tabela nos primeiros 100 registros por paginação (100, 250, 500 ou todos); os gráficos e exportações continuam usando todos os registros válidos.
- Mantidas as galerias de histogramas, distribuições sobrepostas por classe, perfis por banda, rankings por fonte, heatmaps, séries temporais, dispersões, gráficos de bolhas e sobreposição de curvas brutas.
