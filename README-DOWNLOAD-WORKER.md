# Configurar download sem abrir a curva NASA

O GitHub Pages serve arquivos estáticos e não pode mudar os cabeçalhos HTTP do servidor NASA. Para obrigar o navegador a salvar o `.lc.gz` como anexo (em vez de mostrar o conteúdo FITS em uma aba), publique o Worker incluído aqui.

## 1. Criar e publicar o Worker

1. Entre no [painel do Cloudflare](https://dash.cloudflare.com/) e abra **Workers & Pages**.
2. Escolha **Create application** e a opção para criar um Worker. Se o painel pedir um modelo, comece com o Worker/Hello World padrão.
3. Depois de criar a aplicação, abra-a e escolha **Edit Code**.
4. Abra `cloudflare-worker/worker.js` neste projeto, copie o conteúdo inteiro e substitua o código de exemplo no editor do Cloudflare.
5. Clique em **Deploy**.
6. Copie o endereço HTTPS `*.workers.dev` mostrado pelo Cloudflare.

A sequência do painel pode variar; o [guia oficial do Cloudflare Workers](https://developers.cloudflare.com/workers/get-started/dashboard/) mostra o fluxo atual.

## 2. Conectar o site ao Worker

1. No repositório do GitHub Pages, abra `download-config.js`.
2. Clique no lápis para editar.
3. Substitua a string vazia abaixo pela URL HTTPS que o Cloudflare mostrou, mantendo as aspas:

```js
window.MEL_CONFIG.swiftDownloadWorkerUrl = 'https://NOME-DO-WORKER.SEU-SUBDOMINIO.workers.dev';
```

4. Faça **Commit changes** e aguarde o GitHub Pages republicar.
5. Recarregue o site com `Ctrl + F5` e clique em **Baixar exemplo Swift-BAT de 8 bandas**.

## O que o Worker permite

O Worker só busca arquivos `BAT_157m_eight_band_snapshot_SWIFT_*.lc`/`.lc.gz` do host `swift.gsfc.nasa.gov`, dentro do caminho oficial do catálogo de snapshots de oito bandas. Ele não funciona como proxy genérico para qualquer URL. As respostas têm `Content-Disposition: attachment`, e o conteúdo é transmitido em fluxo em vez de ser inteiramente carregado na memória do Worker.

A aba **Colar link** continua podendo importar ou baixar URLs de outros domínios quando esses servidores permitem CORS. Para URLs que bloqueiem CORS, um site estático não consegue forçar um download sem uma camada de servidor/proxy.
