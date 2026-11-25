#!/usr/bin/env node
import {spawnSync} from 'node:child_process';
import {createRequire} from 'node:module';
import {fileURLToPath} from 'node:url';
import {parseArgs} from 'node:util';
import {cp, lstat, mkdir, mkdtemp, readFile, rename, rm, writeFile} from 'node:fs/promises';
import path from 'node:path';

const skill = fileURLToPath(new URL('../', import.meta.url));
const help = [
  'Video Studio • instalação local por projeto',
  'node install.mjs --host codex|claude|cursor|all --project <diretório>',
  'Requer Node.js 22.13+ e npm. Instala a skill, os agentes e o Remotion.',
].join('\n');

async function exists(file) {
  try { await lstat(file); return true; }
  catch (error) { if (error.code === 'ENOENT') return false; throw error; }
}

function run(command, args, cwd) {
  const result = spawnSync(command, args, {cwd, stdio: 'inherit'});
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error('Falha ao executar ' + args.join(' '));
}

function npmCi(cwd) {
  // Windows ships npm as a batch wrapper. Only fixed arguments reach that wrapper.
  if (process.platform === 'win32') {
    run('cmd.exe', ['/d', '/c', 'npm ci --include=dev --no-audit --no-fund'], cwd);
  } else {
    run('npm', ['ci', '--include=dev', '--no-audit', '--no-fund'], cwd);
  }
}

async function prepareBrowser(cwd) {
  const require = createRequire(path.join(cwd, 'package.json'));
  const manifest = require.resolve('@remotion/cli/package.json');
  const {bin} = JSON.parse(await readFile(manifest, 'utf8'));
  run(process.execPath, [path.resolve(path.dirname(manifest), bin.remotion), 'browser', 'ensure'], cwd);
}

const ignored = new Set(['node_modules', '.git', 'out', 'dist', '.DS_Store', '.cache', '.remotion']);
const copyOptions = {
  recursive: true,
  filter: (file) => !ignored.has(path.basename(file)) && !path.basename(file).startsWith('.env'),
};

async function prepareStudio(project) {
  const studio = path.join(project, 'video-studio');
  const marker = '.video-studio-install.json';
  if (await exists(studio)) {
    const meta = await readFile(path.join(studio, marker), 'utf8').catch(() => '');
    if (!meta || JSON.parse(meta).package !== 'remotion-video-studio-skill') {
      throw new Error('A pasta ' + studio + ' já existe e pertence a outro projeto. Escolha outra pasta em --project.');
    }
    if (!await exists(path.join(studio, 'node_modules/@remotion/cli/package.json'))) npmCi(studio);
    await prepareBrowser(studio);
    return studio;
  }
  const staging = await mkdtemp(path.join(project, '.video-studio-'));
  try {
    await cp(path.join(skill, 'assets/remotion'), staging, copyOptions);
    await rename(path.join(staging, 'gitignore.template'), path.join(staging, '.gitignore'));
    npmCi(staging);
    await prepareBrowser(staging);
    await writeFile(path.join(staging, marker), JSON.stringify({package: 'remotion-video-studio-skill'}) + '\n');
    await rename(staging, studio);
  } finally {
    await rm(staging, {recursive: true, force: true});
  }
  return studio;
}

function agentFile(host, agent) {
  const {name, description, prompt} = agent;
  if (host === 'codex') {
    return {file: name + '.toml', data: [
      'name = ' + JSON.stringify(name),
      'description = ' + JSON.stringify(description),
      'developer_instructions = ' + JSON.stringify(prompt), '',
    ].join('\n')};
  }
  return {file: name + '.md', data: [
    '---', 'name: ' + name, 'description: ' + JSON.stringify(description),
    '---', '', prompt, '',
  ].join('\n')};
}

async function installSkill(destination) {
  if (path.resolve(skill) === path.resolve(destination)) return;
  if (await exists(destination)) {
    // Leave local edits intact. Only reuse a directory owned by this installer.
    if (!await exists(path.join(destination, '.video-studio-installed'))) {
      throw new Error('Já existe uma skill nesse caminho. Mantivemos a pasta ' + destination);
    }
    return;
  }
  const parent = path.dirname(destination);
  await mkdir(parent, {recursive: true});
  const staging = await mkdtemp(path.join(parent, '.install-'));
  try {
    await cp(skill, staging, copyOptions);
    await writeFile(path.join(staging, '.video-studio-installed'), '1\n');
    await rename(staging, destination);
  } finally {
    await rm(staging, {recursive: true, force: true});
  }
}

async function main() {
  const {values} = parseArgs({options: {
    host: {type: 'string'}, project: {type: 'string'}, help: {type: 'boolean', short: 'h'},
  }});
  if (values.help) return console.log(help);
  if (!['codex', 'claude', 'cursor', 'all'].includes(values.host) || !values.project?.trim()) {
    throw new Error(help);
  }
  const [major, minor] = process.versions.node.split('.').map(Number);
  if (major < 22 || (major === 22 && minor < 13)) throw new Error('Instale Node.js 22.13 ou superior.');
  const project = path.resolve(values.project);
  if (project === path.resolve(skill) || project.startsWith(path.resolve(skill) + path.sep)) {
    throw new Error('Escolha uma pasta de projeto fora do pacote da skill.');
  }
  const team = JSON.parse(await readFile(path.join(skill, 'references/equipe.json'), 'utf8'));
  const hosts = values.host === 'all' ? ['codex', 'claude', 'cursor'] : [values.host];
  // Cursor also discovers .agents/skills. Share that copy when Codex is selected.
  const skillPaths = new Set(hosts.map(host => {
    if (host === 'codex' || (host === 'cursor' && hosts.includes('codex'))) return '.agents';
    return '.' + host;
  }));
  await mkdir(project, {recursive: true});
  const studio = await prepareStudio(project);
  for (const dir of skillPaths) await installSkill(path.join(project, dir, 'skills/video-studio'));
  for (const host of hosts) {
    const folder = path.join(project, '.' + host, 'agents');
    await mkdir(folder, {recursive: true});
    for (const agent of team) {
      const {file, data} = agentFile(host, agent);
      const dest = path.join(folder, file);
      try { await writeFile(dest, data, {flag: 'wx'}); }
      catch (error) {
        if (error.code !== 'EEXIST') throw error;
        if (await readFile(dest, 'utf8') !== data) console.warn('Perfil local preservado: ' + dest);
      }
    }
  }
  console.log('Instalação concluída. Abra o projeto no seu agente: ' + project);
  console.log('Para ver o vídeo, execute npm run studio em ' + studio);
}

main().catch(error => { console.error(error.message); process.exitCode = 1; });
