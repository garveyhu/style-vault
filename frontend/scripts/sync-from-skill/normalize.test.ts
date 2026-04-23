import { describe, it, expect } from 'vitest';
import { normalizePlatforms, normalizeTheme } from './normalize';
import type { Frontmatter } from './types';

const baseFm = (over: Partial<Frontmatter> = {}): Frontmatter => ({
  id: 'x/y/z',
  type: 'component',
  name: 'n',
  description: 'd',
  tags: { aesthetic: [], mood: [], stack: [] },
  ...over,
});

describe('normalizePlatforms', () => {
  it('returns frontmatter.platforms verbatim when non-empty', () => {
    expect(normalizePlatforms(baseFm({ platforms: ['ios', 'android'] }))).toEqual(['ios', 'android']);
  });
  it("defaults token → ['any']", () => {
    expect(normalizePlatforms(baseFm({ type: 'token' }))).toEqual(['any']);
  });
  it("defaults primitive → ['any'] (legacy)", () => {
    expect(normalizePlatforms(baseFm({ type: 'primitive' }))).toEqual(['any']);
  });
  it("defaults component → ['web']", () => {
    expect(normalizePlatforms(baseFm({ type: 'component' }))).toEqual(['web']);
  });
  it("defaults legacy atom → ['web']", () => {
    expect(normalizePlatforms(baseFm({ type: 'atom' }))).toEqual(['web']);
  });
  it('ignores empty platforms array and falls back to defaults', () => {
    expect(normalizePlatforms(baseFm({ type: 'style', platforms: [] }))).toEqual(['web']);
  });
});

describe('normalizeTheme', () => {
  it('top-level theme wins over legacy tags.theme', () => {
    expect(normalizeTheme(baseFm({ theme: 'dark', tags: { aesthetic: [], mood: [], stack: [], theme: ['light'] } })))
      .toEqual({ theme: 'dark' });
  });
  it("legacy ['light','dark'] → both", () => {
    expect(normalizeTheme(baseFm({ tags: { aesthetic: [], mood: [], stack: [], theme: ['light','dark'] } })))
      .toEqual({ theme: 'both' });
  });
  it("legacy ['dark','light'] → both (order-independent)", () => {
    expect(normalizeTheme(baseFm({ tags: { aesthetic: [], mood: [], stack: [], theme: ['dark','light'] } })))
      .toEqual({ theme: 'both' });
  });
  it("legacy ['dark'] → dark", () => {
    expect(normalizeTheme(baseFm({ tags: { aesthetic: [], mood: [], stack: [], theme: ['dark'] } })))
      .toEqual({ theme: 'dark' });
  });
  it("legacy ['light'] → light", () => {
    expect(normalizeTheme(baseFm({ tags: { aesthetic: [], mood: [], stack: [], theme: ['light'] } })))
      .toEqual({ theme: 'light' });
  });
  it('missing theme field and no legacy → light fallback', () => {
    expect(normalizeTheme(baseFm({}))).toEqual({ theme: 'light' });
  });
  it('unknown legacy value yields warning + best-effort theme', () => {
    const result = normalizeTheme(baseFm({ tags: { aesthetic: [], mood: [], stack: [], theme: ['sepia' as 'light'] } }));
    expect(result.theme).toBe('light'); // best-effort fallback since nothing recognized
    expect(result.warning).toBeDefined();
    expect(result.warning).toMatch(/sepia/);
  });
  it('unknown + known legacy value still extracts known theme but warns', () => {
    const result = normalizeTheme(baseFm({ tags: { aesthetic: [], mood: [], stack: [], theme: ['dark', 'sepia' as 'light'] } }));
    expect(result.theme).toBe('dark');
    expect(result.warning).toMatch(/sepia/);
  });
});
