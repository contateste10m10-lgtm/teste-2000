# Multiband Entropy Lab — V0.13 (downloads e navegação estável)

Laboratório para importar curvas de luz, calcular Sample Entropy (SampEn) e índice de modulação intrínseco por banda. A análise dos arquivos locais ocorre no navegador. Para buscar uma URL Swift-BAT e baixar sem abrir outra página, a versão usa um Cloudflare Worker configurável que recebe somente a URL pública e retransmite o arquivo.

## Recursos

### Cálculo de Sample Entropy
- Importação local de `.lc.gz`, FITS, `.lc`, `.txt`, `.csv`, `.tsv` e `.dat` (conforme estrutura do arquivo). A detecção de gzip é feita pela assinatura binária do conteúdo, não apenas pela extensão do nome; isso evita tentar descompactar de novo arquivos já descompactados pelo navegador.
- Importação por URL quando o servidor remoto permite CORS; para os arquivos Swift-BAT de snapshots, a importação passa pelo Worker configurado, que fornece CORS e permite a leitura no navegador. O download é separado da importação e não abre a curva em uma nova aba.
- A Biblioteca NASA aceita nome Swift abreviado/completo e prepara o download direto do `.lc.gz` como anexo, além de permitir copiar o endereço oficial. Para garantir que o download não abra o conteúdo como texto, é necessário publicar `cloudflare-worker/worker.js` e informar a URL resultante em `download-config.js`.
- Mapeamento editável de tempo, taxa/fluxo, erro e oito bandas.
- Dimensão de embedding e tolerância ajustáveis; padrão inicial de SampEn: dimensão de incorporação `m = 2` e `r = 0,2 × σ`. A dimensão `m` da SampEn não é o índice de modulação intrínseco.
- Resultados por banda com SampEn, A/B, índice de modulação intrínseco, contagem de incertezas válidas/excluídas e estados para casos não calculáveis.
- Núcleo científico isolado em `analysis-core.js`, testável sem a interface e usado tanto pela análise completa quanto pela SampEn temporal.
- Curvas de luz individuais e sobreposição das oito bandas, com opção de z-score.
- Sample Entropy temporal em janelas configuráveis de 100, 200, 300, 500, 800 ou 1000 pontos e passo configurável. O cálculo usa busca de candidatos ordenada e permite pedir cancelamento entre janelas.

### Controles dos gráficos
- Zoom por rolagem do mouse e pinça quando o plugin opcional estiver disponível.
- O indicador `Mover: ligado` é permanente; arrastar desloca a vista. Para ampliar/reduzir, use a roda/pinça e os controles `+`/`−`; o zoom por seleção com arraste foi desativado para evitar conflito de gestos.
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

1. Extraia o ZIP e envie todos os arquivos e pastas para a raiz do repositório na branch `main` — incluindo `analysis-core.js`, `download-config.js`, `cloudflare-worker/`, `tests/` e `.github/`, além de `index.html`, `styles.css`, `app.js`, `README.md`, `CHANGELOG.md` e `.nojekyll`.
2. No GitHub, abra **Settings → Pages**.
3. Em **Build and deployment**, selecione **Deploy from a branch**, branch `main` e pasta `/(root)`.
4. Salve, aguarde a publicação e teste os gráficos no endereço fornecido pelo GitHub.

O GitHub Pages permanece estático e não atua como proxy. Para que arquivos Swift-BAT sejam baixados como anexos sem abrir uma aba, publique o Worker e configure `download-config.js` conforme as instruções abaixo. Os botões não abrem a URL original da curva quando o Worker não está configurado: exibem uma mensagem com o que falta. Para URLs de outros domínios, o download por JavaScript só funciona quando o servidor permite CORS.

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
- `download-config.js`: URL do Worker que força o download como anexo (preencher após publicar o Worker).
- `cloudflare-worker/worker.js`: endpoint seguro para buscar e transmitir arquivos oficiais Swift-BAT com cabeçalho de anexo.
- `README-DOWNLOAD-WORKER.md`: tutorial curto de publicação/configuração do download.
- `analysis-core.js`: cálculo de SampEn e índice de modulação intrínseco.
- `tests/`: testes automatizados dos algoritmos e do contrato entre interface e núcleo.
- `.github/workflows/tests.yml`: executa os testes com Node.js em pushes e pull requests.
- `.nojekyll`: evita processamento Jekyll desnecessário em publicação estática.

### Navegação dos gráficos (v0.13)
Cada gráfico tem o indicador permanente **Mover: ligado**. Arrastar desloca a vista; zoom é feito pela roda/pinça ou pelos controles `+`/`−`; `Reset` recupera a escala original e `Esc` fecha a visualização ampliada. Remover o botão alternador evita que o pan e o zoom por arraste entrem em estados conflitantes. Os controles são adicionados também aos gráficos dinâmicos.

### Importação de arquivos gzip (v0.11)
O importador verifica os bytes iniciais do arquivo (`1F 8B`) para decidir se deve aplicar descompressão gzip. Se o nome termina em `.gz`, mas os dados já começam com `SIMPLE` (cabeçalho FITS), o site envia os bytes diretamente ao leitor FITS. A extensão do arquivo, sozinha, não é suficiente para determinar se o conteúdo continua compactado.


### Download pelo nome ou por URL (v0.13)
- Os links de curvas Swift-BAT foram substituídos por botões de download. O site não navega para a resposta FITS nem abre uma aba mostrando texto.
- Foi incluído `cloudflare-worker/worker.js`, que só aceita URLs HTTPS dentro do diretório oficial de snapshots Swift-BAT de oito bandas, valida redirecionamentos e devolve o fluxo com `Content-Disposition: attachment`.
- `download-config.js` guarda a URL publicada do Worker. Ela fica vazia no ZIP por padrão e precisa ser preenchida após publicar o Worker.
- A aba `Colar link` tem uma ação `Baixar arquivo`: para Swift-BAT usa o Worker; para outros domínios tenta um download CORS em arquivo local, sem abrir a página.
- A importação por URL do Swift-BAT também usa o Worker configurado, evitando a restrição CORS. O GitHub Pages sozinho não consegue contornar CORS nem impor o cabeçalho de download de um servidor remoto.

### Configurar o Worker (necessário para baixar curvas NASA sem abrir outra aba)
1. No painel do Cloudflare, entre em **Workers & Pages** e crie um Worker novo.
2. Abra o editor de código do Worker e substitua o exemplo inicial pelo conteúdo do arquivo `cloudflare-worker/worker.js` deste projeto. Publique/Deploy.
3. Copie o endereço HTTPS `*.workers.dev` disponibilizado pelo Cloudflare.
4. No GitHub, abra `download-config.js`, clique no lápis e substitua `window.MEL_CONFIG.swiftDownloadWorkerUrl = '';` por `window.MEL_CONFIG.swiftDownloadWorkerUrl = 'https://SEU-WORKER.workers.dev';`, trocando o exemplo pelo endereço real do Worker e mantendo as aspas. Faça commit.
5. Depois que GitHub Pages republicar, recarregue sem cache (`Ctrl+F5`). Teste primeiro o botão **Baixar exemplo Swift-BAT** e depois baixar pelo nome e pela URL.

O Worker faz streaming do arquivo em vez de guardar os 71 MB ou o arquivo completo em memória. Sua regra de validação só permite host `swift.gsfc.nasa.gov` e arquivos do diretório oficial especificado. Arquivos locais selecionados no navegador não são enviados ao Worker; quando usa o proxy, apenas a URL pública da fonte NASA é enviada para que ele baixe e retransmita o arquivo.
