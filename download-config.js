/*
 * V0.13 — configuração opcional do endpoint de download.
 * Depois de publicar cloudflare-worker/worker.js, cole aqui a URL HTTPS
 * que o Cloudflare fornecer (por exemplo, https://mel-download.seu-subdominio.workers.dev).
 * Mantenha as aspas e o ponto e vírgula. Sem essa configuração, o site NÃO abre
 * a página bruta da NASA; os botões explicam o que falta para concluir o download.
 */
window.MEL_CONFIG = window.MEL_CONFIG || {};
window.MEL_CONFIG.swiftDownloadWorkerUrl = '';
