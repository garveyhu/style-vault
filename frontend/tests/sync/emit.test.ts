import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import { describe, it, expect, afterAll, beforeAll } from 'vitest';
import { emit } from '../../scripts/sync-from-skill/emit';
import type { RegistryItem } from '../../scripts/sync-from-skill/types';

const TMP = path.join(os.tmpdir(), 'sv-emit-test');
const OUT = path.join(TMP, 'registry.json');

beforeAll(async () => { await fs.mkdir(TMP, { recursive: true }); });
afterAll(async () => { await fs.rm(TMP, { recursive: true, force: true }); });

const sample = (id: string): RegistryItem => ({
  id, type: 'component', name: id, description: id,
  tags: { aesthetic: ['minimal'], mood: ['calm'], stack: ['html-tailwind'] },
  platforms: ['web'],
  theme: 'light',
  uses: [],
  usedBy: [],
  hasPreviewFile: false,
  skillPath: `${id}.md`,
});

describe('emit', () => {
  it('writes valid JSON with items sorted by id', async () => {
    const items = [sample('b/y'), sample('a/x'), sample('a/y')];
    await emit(items, OUT);
    const read = JSON.parse(await fs.readFile(OUT, 'utf-8'));
    expect(read.items.map((i: RegistryItem) => i.id)).toEqual(['a/x', 'a/y', 'b/y']);
    expect(typeof read.version).toBe('string');
    expect(read.version.length).toBeGreaterThan(0);
    // tagDict / platformDict no longer in registry (moved to taxonomy.json)
    expect(read.tagDict).toBeUndefined();
    expect(read.platformDict).toBeUndefined();
  });
});
