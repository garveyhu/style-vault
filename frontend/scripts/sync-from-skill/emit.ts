import fs from 'node:fs/promises';
import path from 'node:path';
import type { Registry, RegistryItem } from './types';

export async function emit(items: RegistryItem[], outPath: string): Promise<void> {
  const sorted = [...items].sort((a, b) => a.id.localeCompare(b.id));
  const registry: Registry = {
    version: new Date().toISOString(),
    items: sorted,
  };
  await fs.mkdir(path.dirname(outPath), { recursive: true });
  await fs.writeFile(outPath, JSON.stringify(registry, null, 2) + '\n', 'utf-8');
}
