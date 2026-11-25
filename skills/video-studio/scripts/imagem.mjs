import {readFile, writeFile, mkdir, lstat} from 'node:fs/promises';
import {basename, dirname, extname} from 'node:path';
import {parseArgs} from 'node:util';

const usage = 'node imagem.mjs --modelo ID --qualidade low|medium|high|xhigh|max --tamanho 864x1536 --prompt cena.txt --saida cena.png [--referencia foto.png ...]';
const {values: options} = parseArgs({options: {
  modelo: {type: 'string'}, qualidade: {type: 'string'}, tamanho: {type: 'string'},
  prompt: {type: 'string'}, saida: {type: 'string'},
  referencia: {type: 'string', multiple: true, default: []}, help: {type: 'boolean'},
}});

async function run() {
  if (options.help) return console.log(usage);
  const models = ['gpt-image-2.6-sunburst', 'gpt-image-2.6-flare', 'gpt-image-2.5-sunburst', 'gpt-image-2.5-flare'];
  const qualities = ['low', 'medium', 'high', 'xhigh', 'max', 'auto'];
  if (!models.includes(options.modelo) || !qualities.includes(options.qualidade) ||
      !options.prompt || !options.tamanho || extname(options.saida ?? '').toLowerCase() !== '.png')
    throw new Error(usage);
  const existing = await lstat(options.saida).catch(error => {
    if (error.code !== 'ENOENT') throw error;
  });
  if (existing) throw new Error('Escolha uma saída .png inédita.');
  const prompt = (await readFile(options.prompt, 'utf8')).trim();
  if (!prompt) throw new Error('O prompt está vazio.');
  const key = process.env.OPENAI_API_KEY;
  if (!key) throw new Error('Configure OPENAI_API_KEY no ambiente local.');
  const fields = {model: options.modelo, quality: options.qualidade, size: options.tamanho, prompt, output_format: 'png'};
  const headers = {Authorization: 'Bearer ' + key};
  let endpoint = 'generations';
  let body;
  if (options.referencia.length) {
    endpoint = 'edits';
    body = new FormData();
    for (const [name, value] of Object.entries(fields)) body.append(name, value);
    const types = {'.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp'};
    for (const file of options.referencia) {
      const type = types[extname(file).toLowerCase()];
      if (!type) throw new Error('Escolha referências PNG, JPEG ou WebP.');
      body.append('image[]', new Blob([await readFile(file)], {type}), basename(file));
    }
  } else {
    headers['Content-Type'] = 'application/json';
    body = JSON.stringify(fields);
  }
  await mkdir(dirname(options.saida), {recursive: true});
  const res = await fetch('https://api.openai.com/v1/images/' + endpoint, {method: 'POST', headers, body, signal: AbortSignal.timeout(600000)});
  if (!res.ok) throw new Error('OpenAI Images HTTP ' + res.status + ' (request ID ' + (res.headers.get('x-request-id') ?? 'indisponível') + ').');
  const result = await res.json();
  const png = Buffer.from(result.data?.[0]?.b64_json ?? '', 'base64');
  if (!png.subarray(0, 8).equals(Buffer.from('89504e470d0a1a0a', 'hex'))) throw new Error('A resposta não contém um PNG válido.');
  await writeFile(options.saida, png, {flag: 'wx'});
  console.log(options.saida);
}

run().catch(error => {
  console.error(error.message);
  process.exitCode = 1;
});
