import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import { describe, it, expect, afterAll, beforeAll } from 'vitest';
import { emit } from '../../scripts/sync-from-skill/emit';
import type {
  PlatformDict,
  RegistryItem,
  TagDict,
} from '../../scripts/sync-from-skill/types';

const TMP = path.join(os.tmpdir(), 'sv-emit-test');
const OUT = path.join(TMP, 'registry.json');

beforeAll(async () => { await fs.mkdir(TMP, { recursive: true }); });
afterAll(async () => { await fs.rm(TMP, { recursive: true, force: true }); });

const DICT: TagDict = {
  aesthetic: ['minimal'],
  mood: ['calm'],
  stack: ['html-tailwind'],
};

const PLATFORM_DICT: PlatformDict = {
  platforms: ['web', 'ios', 'android', 'any'],
};

const sample = (id: string): RegistryItem => ({
  id, type: 'atom', name: id, description: id,
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
    await emit(items, DICT, PLATFORM_DICT, OUT);
    const read = JSON.parse(await fs.readFile(OUT, 'utf-8'));
    expect(read.items.map((i: RegistryItem) => i.id)).toEqual(['a/x', 'a/y', 'b/y']);
    expect(read.tagDict).toEqual(DICT);
    expect(read.platformDict).toEqual(PLATFORM_DICT);
    expect(typeof read.version).toBe('string');
    expect(read.version.length).toBeGreaterThan(0);
  });
});
