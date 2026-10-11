'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const workerSource = fs.readFileSync(path.join(root, 'cloudflare-worker', 'worker.js'), 'utf8');

function loadWorker(fetchImpl) {
  const context = {
    URL,
    Headers,
    Response,
    fetch: fetchImpl,
    encodeURIComponent,
    decodeURIComponent,
    String,
    RegExp
  };
  vm.createContext(context);
  vm.runInContext(workerSource.replace('export default {', 'globalThis.__worker = {'), context);
  return context.__worker;
}

const validCurveUrl = 'https://swift.gsfc.nasa.gov/bat_survey/bs157mon/8band_snapshot_lc/BAT_157m_eight_band_snapshot_SWIFT_J0359.7%2B5058.lc.gz';

test('Swift-BAT Worker rejects URL targets outside the approved NASA snapshot path', async () => {
  const worker = loadWorker(async () => { throw new Error('fetch should not run for invalid target'); });
  const request = new Request(`https://worker.example/download?url=${encodeURIComponent('https://example.com/private.txt')}`);
  const response = await worker.fetch(request);
  assert.equal(response.status, 403);
  assert.match(response.headers.get('Content-Disposition') || '', /attachment/);
  assert.match(await response.text(), /URL recusada/);
});

test('Swift-BAT Worker streams the upstream body as an attachment with CORS headers', async () => {
  let requestedUrl = '';
  const worker = loadWorker(async url => {
    requestedUrl = String(url);
    return new Response('FAKE-GZIP', { status: 200, headers: { 'Content-Length': '9', 'Content-Type': 'application/octet-stream' } });
  });
  const request = new Request(`https://worker.example/download?url=${encodeURIComponent(validCurveUrl)}`);
  const response = await worker.fetch(request);
  assert.equal(response.status, 200);
  assert.equal(new URL(requestedUrl).hostname, 'swift.gsfc.nasa.gov');
  assert.match(response.headers.get('Content-Disposition') || '', /attachment/);
  assert.match(response.headers.get('Content-Disposition') || '', /BAT_157m_eight_band_snapshot_SWIFT_J0359/);
  assert.equal(response.headers.get('Access-Control-Allow-Origin'), '*');
  assert.equal(response.headers.get('Access-Control-Expose-Headers'), 'Content-Disposition');
  assert.equal(await response.text(), 'FAKE-GZIP');
});

test('Swift-BAT Worker does not follow redirects to an unapproved host', async () => {
  let calls = 0;
  const worker = loadWorker(async () => {
    calls += 1;
    return new Response(null, { status: 302, headers: { Location: 'https://example.com/not-a-swift-file' } });
  });
  const request = new Request(`https://worker.example/download?url=${encodeURIComponent(validCurveUrl)}`);
  const response = await worker.fetch(request);
  assert.equal(response.status, 502);
  assert.equal(calls, 1);
  assert.match(await response.text(), /fora do catálogo/);
});
