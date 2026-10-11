const ALLOWED_HOST = 'swift.gsfc.nasa.gov';
const ALLOWED_PATH = /^\/bat_survey\/bs157mon\/8band_snapshot_lc\/BAT_157m_eight_band_snapshot_SWIFT_[A-Za-z0-9_.+\-]+\.lc(?:\.gz)?$/i;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Expose-Headers': 'Content-Disposition',
  'Access-Control-Max-Age': '86400',
  'Vary': 'Origin'
};

function validateSwiftUrl(raw) {
  let url;
  try { url = new URL(raw); } catch (_) { return null; }
  if (url.protocol !== 'https:' || url.hostname.toLowerCase() !== ALLOWED_HOST || url.username || url.password || url.port) return null;
  let decodedPath;
  try { decodedPath = decodeURIComponent(url.pathname); } catch (_) { return null; }
  if (!ALLOWED_PATH.test(decodedPath)) return null;
  return url;
}

function errorAttachment(message, status = 400) {
  const headers = new Headers(corsHeaders);
  headers.set('Content-Type', 'text/plain; charset=utf-8');
  headers.set('Content-Disposition', 'attachment; filename="swift-download-error.txt"');
  headers.set('Cache-Control', 'no-store');
  return new Response(`${message}\n`, { status, headers });
}

export default {
  async fetch(request) {
    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: corsHeaders });
    if (!['GET', 'HEAD'].includes(request.method)) return errorAttachment('Método não permitido.', 405);

    const requestUrl = new URL(request.url);
    const rawTarget = requestUrl.searchParams.get('url');
    if (!rawTarget) return errorAttachment('Parâmetro url ausente. Informe uma URL oficial Swift-BAT.');

    const initialUrl = validateSwiftUrl(rawTarget);
    if (!initialUrl) return errorAttachment('URL recusada. Este endpoint só aceita curvas .lc/.lc.gz do catálogo Swift-BAT de snapshots de oito bandas.', 403);

    try {
      let target = initialUrl;
      let upstream;
      // Follow a small number of redirects, validating each destination so this
      // Worker cannot be used as a general-purpose open proxy.
      for (let hops = 0; hops <= 3; hops += 1) {
        upstream = await fetch(target.href, { method: request.method, redirect: 'manual' });
        if (![301, 302, 303, 307, 308].includes(upstream.status)) break;
        const location = upstream.headers.get('Location');
        if (!location || hops === 3) return errorAttachment('Redirecionamento inválido ou excessivo no servidor Swift-BAT.', 502);
        const next = validateSwiftUrl(new URL(location, target).href);
        if (!next) return errorAttachment('O servidor redirecionou para um endereço fora do catálogo Swift-BAT permitido.', 502);
        target = next;
      }

      if (!upstream || !upstream.ok) {
        const status = upstream?.status || 502;
        return errorAttachment(`O servidor Swift-BAT respondeu com HTTP ${status}. Confira o nome da fonte no catálogo oficial.`, 502);
      }

      const filename = decodeURIComponent(target.pathname.split('/').pop() || 'curva-swift-bat.lc.gz')
        .replace(/[\\/:*?"<>|\r\n]+/g, '_');
      const headers = new Headers(corsHeaders);
      headers.set('Content-Type', filename.toLowerCase().endsWith('.gz') ? 'application/gzip' : (upstream.headers.get('Content-Type') || 'application/octet-stream'));
      headers.set('Content-Disposition', `attachment; filename="${filename}"; filename*=UTF-8''${encodeURIComponent(filename)}`);
      headers.set('Cache-Control', 'no-store');
      // Do not copy Content-Length: some upstream intermediaries can alter transfer encoding.
      // A streamed response without an explicit length is valid and avoids truncation risks.
      return new Response(request.method === 'HEAD' ? null : upstream.body, { status: 200, headers });
    } catch (error) {
      return errorAttachment(`Falha ao buscar o arquivo Swift-BAT: ${String(error?.message || error)}`, 502);
    }
  }
};
