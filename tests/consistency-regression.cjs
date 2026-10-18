#!/usr/bin/env node
'use strict';
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const js = fs.readFileSync(path.join(root, 'blazarlab.js'), 'utf8');
const css = fs.readFileSync(path.join(root, 'styles.css'), 'utf8');
const version = fs.readFileSync(path.join(root, 'VERSION'), 'utf8').trim();

assert.equal(version, '1.3.25', 'o pacote precisa declarar a versão 1.3.25');
assert.match(js, /const MULTIBAND_N = 144;/, 'a extensão da galeria deve estar definida centralmente');
assert.match(html, /SINTÉTICO · 144 PONTOS\/BANDA/, 'o selo inicial deve informar 144 pontos por banda');
assert.match(html, /id="lightcurveRange">144 pontos/, 'o valor inicial no rodapé do gráfico deve ser consistente');
assert.match(html, /curva sintética determinística com 144 pontos por banda/, 'a metodologia deve corresponder à série realmente gerada');
assert.doesNotMatch(html, /240 pontos|240-point|240 points/i, 'não deve persistir o número incorreto de 240 pontos');

const publicUrl = 'https://contateste10m10-lgtm.github.io/BlazarLab_13/';
assert.match(html, new RegExp(`<link rel="canonical" href="${publicUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"`), 'canonical precisa apontar para o endereço público');
assert.match(html, new RegExp(`<meta property="og:url" content="${publicUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"`), 'og:url precisa apontar para o endereço público');
const imagePath = path.join(root, 'assets', 'social-preview.png');
assert.ok(fs.existsSync(imagePath), 'a imagem PNG de compartilhamento precisa estar no pacote');
const png = fs.readFileSync(imagePath);
assert.deepEqual([...png.subarray(0, 8)], [137, 80, 78, 71, 13, 10, 26, 10], 'a prévia social deve ser um PNG válido');
assert.match(html, /property="og:image"/, 'og:image precisa estar definido');
assert.match(html, /name="twitter:image"/, 'twitter:image precisa estar definido');

for (const id of ['resumo-sampen', 'resumo-fisher', 'resumo-mse']) {
  const card = html.slice(html.indexOf(`id="${id}"`), html.indexOf('</article>', html.indexOf(`id="${id}"`)) + 10);
  assert.match(card, /scholar\.google\.com\/scholar\?q=/, `o cartão ${id} deve ter um atalho de busca bibliográfica`);
  assert.match(card, /confirm(e|e a versão)/i, `o cartão ${id} deve alertar para conferir a versão bibliográfica`);
}
assert.match(html, /DEMONSTRAÇÃO SINTÉTICA/, 'os dados gerados devem ter uma identificação explícita');
assert.match(html, /RESULTADOS REPORTADOS/, 'os resultados observacionais devem ter uma identificação distinta');
assert.match(css, /\.provenance-legend/, 'a legenda de proveniência precisa de estilo');
assert.match(css, /\.abstract-resource-links a:focus-visible/, 'os atalhos bibliográficos devem ter foco visível');

assert.match(js, /if \(totalWeight <= Number\.EPSILON\) return \{ value: null, count: totalLength, distinctPatterns: 0, status: 'zero-weight' \}/, 'WPE sem peso total não deve virar entropia zero');
assert.match(js, /const value = Number\.isFinite\(wpe\.value\) \? wpe\.value : null;/, 'estimativas inválidas devem permanecer indefinidas');
assert.match(js, /const CI = validScales === SCALES \? points\.reduce/, 'CI só pode ser calculado com todas as escalas válidas');
assert.match(js, /Indefinido \(\$\{item\.mse\.validScales\}\/\$\{SCALES\} escalas válidas\)/, 'a interface deve explicar o CI indefinido');
console.log('OK: consistência de amostras, proveniência científica, metadados de compartilhamento e tratamento de escalas indefinidas — BlazarLab 1.3.25.');
