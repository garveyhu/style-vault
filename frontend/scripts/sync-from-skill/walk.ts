import fg from 'fast-glob';
import fs from 'node:fs/promises';
import path from 'node:path';
import { parseEntry } from './parse';
import type { Entry } from './types';

export async function walkReferences(root: string): Promise<Entry[]> {
  const all = await fg('**/*.md', {
    cwd: root,
    dot: false,
  });

  const entries: Entry[] = [];
  for (const rel of all) {
    const base = path.basename(rel);
    if (base === '_CATEGORY.md') continue;
    if (rel === 'README.md') continue;

    const content = await fs.readFile(path.join(root, rel), 'utf-8');
    try {
      const parsed = parseEntry(content, rel);
      entries.push({ ...parsed, relativePath: rel });
    } catch (e) {
      throw new Error(`Failed to parse ${rel}: ${(e as Error).message}`);
    }
  }
  return entries;
}
