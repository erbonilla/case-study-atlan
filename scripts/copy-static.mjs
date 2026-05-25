import { cp, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const dist = join(root, 'dist');

const entries = [
  'assets',
  'figures',
  'uploads',
  'deck',
  'deck-stage.js',
  'Atlan Deck.html',
  'Atlan Image Prompts.md',
];

await mkdir(dist, { recursive: true });

for (const entry of entries) {
  const from = join(root, entry);
  if (!existsSync(from)) continue;
  await cp(from, join(dist, entry), { recursive: true, force: true });
}
