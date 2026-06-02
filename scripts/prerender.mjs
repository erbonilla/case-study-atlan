import { readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

const root = process.cwd();
const dist = join(root, 'dist');

const serverEntry = join(root, 'dist-ssr', 'entry-server.js');
if (!existsSync(serverEntry)) {
  console.error('prerender: missing dist-ssr/entry-server.js — run the SSR build first.');
  process.exit(1);
}

const { render } = await import(pathToFileURL(serverEntry).href);
const appHtml = render();

if (!appHtml || appHtml.length < 500) {
  console.error(`prerender: render() returned suspiciously little (${appHtml?.length ?? 0} bytes). Aborting.`);
  process.exit(1);
}

const ROOT_SHELL = '<div id="root"></div>';
const pages = ['index.html', 'Atlan Case Study.html'];

for (const page of pages) {
  const file = join(dist, page);
  if (!existsSync(file)) continue;
  let html = await readFile(file, 'utf-8');
  if (!html.includes(ROOT_SHELL)) {
    console.warn(`prerender: no empty root element in ${page}, skipping`);
    continue;
  }
  html = html.replace(ROOT_SHELL, `<div id="root">${appHtml}</div>`);
  await writeFile(file, html);
  console.log(`prerendered ${page} (+${appHtml.length} bytes of static markup)`);
}
