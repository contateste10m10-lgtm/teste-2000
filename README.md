# Multiband Entropy Lab — V0.14 (desempenho e navegação)

Laboratório independente para importar curvas de luz, calcular Sample Entropy (SampEn) e índice de modulação intrínseco por banda, e gerar gráficos exploratórios no navegador. É um site estático, adequado para GitHub Pages: os arquivos importados permanecem no dispositivo do usuário e não são enviados para um backend do projeto.

## Recursos

### Cálculo de Sample Entropy
- Importação local de `.lc.gz`, FITS, `.lc`, `.txt`, `.csv`, `.tsv` e `.dat` (conforme estrutura do arquivo). A detecção de gzip é feita pela assinatura binária do conteúdo, não apenas pela extensão do nome; isso evita tentar descompactar de novo arquivos já descompactados pelo navegador.
- Importação por URL quando o servidor remoto permite CORS; alternativa por link nativo e download local. A ação `Abrir / salvar` não usa `fetch`, então a navegação direta funciona mesmo se CORS bloquear a importação no próprio site. Para respostas servidas como texto/FITS, use o menu do botão direito no link → `Salvar link como…`.
- A Biblioteca NASA aceita uma designação Swift (como `SWIFT J0359.7+5058` ou `J0359.7+5058`), o nome do arquivo oficial ou a própria URL para preparar o link. Inclui ação para copiar a URL. A transferência automática via JavaScript continua sujeita à política CORS do servidor remoto.
- Mapeamento editável de tempo, taxa/fluxo, erro e oito bandas.
- Dimensão de embedding e tolerância ajustáveis; padrão inicial de SampEn: dimensão de incorporação `m = 2` e `r = 0,2 × σ`. A dimensão `m` da SampEn não é o índice de modulação intrínseco.
- Resultados por banda com SampEn, A/B, índice de modulação intrínseco, contagem de incertezas válidas/excluídas e estados para casos não calculáveis.
- Núcleo científico isolado em `analysis-core.js`, testável sem a interface e usado tanto pela análise completa quanto pela SampEn temporal.
- Curvas de luz individuais e sobreposição das oito bandas, com opção de z-score.
- Sample Entropy temporal em janelas configuráveis de 100, 200, 300, 500, 800 ou 1000 pontos e passo configurável. O cálculo usa busca de candidatos ordenada e permite pedir cancelamento entre janelas.

### Controles dos gráficos
- A roda do mouse e a pinça controlam o zoom quando o plugin está disponível.
- `Ctrl` + arraste move a janela do gráfico; o arraste comum não move os eixos. Não há botão alternador `Mover`, então não existe estado ligado/desligado a ficar preso.
- O botão `Reset` restaura o zoom; `Esc` fecha a tela cheia.
- Botões `+`, `−`, `Reset` e `PNG` em cada gráfico; o heatmap tem controles próprios para ampliar/reduzir as células.
- O zoom manual por botões continua disponível mesmo se o plugin de gestos não carregar.

### Gráficos da tabela individual (uma linha por fonte/objeto)
- Histograma global da SampEn.
- Histogramas de SampEn sobrepostos por classe, com bins comuns.
- Dispersão log–log SampEn × índice de modulação intrínseco, incluindo ajuste log–log quando possível.
- Gráfico de bolhas SampEn × modulação com uma terceira variável real selecionada no mapeamento.
- SampEn média ± desvio-padrão por classe.
- Índice de modulação médio ± desvio-padrão por classe, quando disponível.
- Tabela auditável com paginação e exportação dos registros válidos.

### Galeria multifonte (formato longo)
- Histograma global e histogramas sobrepostos por classe.
- Perfil médio de SampEn pelas bandas.
- Ranking/resumo de SampEn por fonte.
- Heatmap fonte × banda.
- Dispersão SampEn × variabilidade robusta.
- Dispersão SampEn × índice de modulação.
- Gráfico de bolhas com uma terceira coluna quantitativa.
- Evolução temporal de SampEn por janela com bandas sobrepostas.
- Sobreposição de curvas de luz brutas de duas fontes na mesma banda.
- Tabelas paginadas; todos os registros válidos seguem disponíveis para os gráficos e a exportação, não apenas a página atualmente visível.

## Formatos de dados

### Tabela individual
Uma linha por fonte/objeto, por exemplo:

```csv
source,class,sampen,modulation_index_percent,bubble_size
OBJETO_A,Classe_A,1.23,12.8,146
OBJETO_B,Classe_B,0.91,17.0,203
```

`source`, `class`, `modulation_index_percent` e `bubble_size` são opcionais conforme o gráfico. O campo `sampen` é obrigatório para a galeria de catálogo. Para o gráfico de bolhas, a terceira variável tem de vir dos dados; não se fabricam valores apenas para preencher o gráfico.

### Tabela multifonte fonte × janela × banda
Uma linha por combinação fonte/janela/banda, por exemplo:

```csv
fonte,janela,banda,tempo,fluxo,sampen,classe_fonte,variabilidade_robusta,modulation_index_percent,n_pontos,snr_media
OBJETO_A,1,band_1,12345,0.0021,1.45,Classe_A,0.32,12.8,200,2.1
```

Os campos de classe, janela, banda, tempo, fluxo, variabilidade, modulação e tamanho de bolha são mapeados separadamente. Os gráficos só são criados quando as colunas necessárias estiverem disponíveis. A dimensão de incorporação da SampEn não é o índice de modulação intrínseco.

Para sobreposição de curvas brutas, forneça linhas por ponto temporal, com fonte, banda, tempo e fluxo/RATE. Um CSV de resultados de SampEn não contém, em geral, todos os pontos necessários para recriar a curva original.

## Publicar no GitHub Pages

1. Extraia o ZIP e envie todos os arquivos e pastas para a raiz do repositório na branch `main` — incluindo `analysis-core.js`, `tests/` e `.github/`, além de `index.html`, `styles.css`, `app.js`, `README.md`, `CHANGELOG.md` e `.nojekyll`.
2. No GitHub, abra **Settings → Pages**.
3. Em **Build and deployment**, selecione **Deploy from a branch**, branch `main` e pasta `/(root)`.
4. Salve, aguarde a publicação e teste os gráficos no endereço fornecido pelo GitHub.

O site não requer servidor Python/Node em produção. O Chart.js e bibliotecas opcionais são carregados por CDN; é necessária conexão para carregar essas bibliotecas. Sem o plugin de zoom, os botões manuais `+`, `−`, `Reset` e `PNG` continuam disponíveis.

## Limitações científicas

- O cálculo deve ser interpretado junto com a cadência, lacunas, unidades, valores inválidos e parâmetros escolhidos.
- Janelas de uma mesma fonte não são automaticamente observações independentes para testes inferenciais.
- O site não inventa intervalos de energia, unidades, métricas de variabilidade ou índice de modulação ausentes do arquivo.
- O índice de modulação intrínseco é calculado localmente a partir da curva e da coluna de incerteza mapeada, conforme a equação do artigo. A SampEn pode ser calculada mesmo quando essa coluna não está disponível; nesse caso, a modulação fica indisponível com status explícito.
- A fórmula de modulação implementada usa variância amostral (divisor N−1), conforme o script Python do projeto; o artigo apresenta a fórmula, mas não explicita o divisor.
- A SampEn segue H_SE = −ln(A/B), distância de Chebyshev, pares não idênticos e tolerância relativa à dispersão da própria banda. A implementação precisa ser validada numericamente contra EntropyHub v2.0 e curvas Swift-BAT reais antes de ser considerada reproduzível em nível de publicação.

## Arquivos

- `index.html`: interface.
- `styles.css`: estilos responsivos.
- `app.js`: importação, interface, gráficos, paginação, análise temporal, biblioteca NASA, exportação e zoom.
- `analysis-core.js`: cálculo de SampEn e índice de modulação intrínseco.
- `tests/`: testes automatizados dos algoritmos e do contrato entre interface e núcleo.
- `.github/workflows/tests.yml`: executa os testes com Node.js em pushes e pull requests.
- `.nojekyll`: evita processamento Jekyll desnecessário em publicação estática.

### Navegação dos gráficos (v0.14)
- A roda do mouse e a pinça controlam o zoom; `Ctrl` + arraste desloca a visualização.
- O arraste comum não muda os eixos, evitando conflito entre mover e selecionar zoom.
- Cada gráfico mantém os controles manuais `+`, `−`, `Reset` e exportação PNG, além de tela cheia e `Esc` para fechar.
- O indicador/toggle “Mover” foi removido para não existir um estado de navegação que possa ficar preso.

### Desempenho (v0.14)
- Animações dos gráficos desativadas para reduzir a espera após calcular ou importar tabelas grandes.
- Ativada a decimação visual min/max para séries de linha longas, quando os dados são pares numéricos x/y ordenados. Isso reduz o trabalho de desenho sem modificar os dados usados no cálculo/exportação.
- Substituídas operações `Math.min/max(...lista)` e `Math.max(...lista)` em pontos sensíveis por loops, evitando limite de argumentos em catálogos grandes.
- Reduzido o trabalho repetido do observador de DOM, agrupando a busca por novos gráficos em um único quadro de animação.
- As fórmulas científicas e os dados originais permanecem inalterados.


### Importação de arquivos gzip (v0.11)
O importador verifica os bytes iniciais do arquivo (`1F 8B`) para decidir se deve aplicar descompressão gzip. Se o nome termina em `.gz`, mas os dados já começam com `SIMPLE` (cabeçalho FITS), o site envia os bytes diretamente ao leitor FITS. A extensão do arquivo, sozinha, não é suficiente para determinar se o conteúdo continua compactado.


### Histórico: navegação e links externos (v0.12)
- Na V0.12, o modo de mover desligava o zoom por arraste enquanto estava ativo; a V0.14 substitui esse alternador por `Ctrl` + arraste para mover e roda/pinça para zoom.
- O download por link externo usa navegação nativa e não simula uma transferência por `fetch` cross-origin. A importação pelo botão `Tentar importar` permanece disponível para servidores que permitem CORS.
- A biblioteca Swift-BAT aceita nome/filename/URL, prepara o endereço oficial e permite copiá-lo. A página estática do GitHub Pages não pode, sozinha, contornar CORS ou forçar download se o servidor remoto não permitir isso.


### Download de curvas NASA (intencionalmente sem Worker)
Nesta versão, os links da NASA voltam ao comportamento nativo do navegador. O site não tenta contornar CORS e não exige Cloudflare Worker; a importação por URL continua sujeita às permissões do servidor remoto.
