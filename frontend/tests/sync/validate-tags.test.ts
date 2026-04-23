import { describe, it, expect } from 'vitest';
import { validateTags } from '../../scripts/sync-from-skill/validate';
import type { Frontmatter, TagDict } from '../../scripts/sync-from-skill/types';

const DICT: TagDict = {
  aesthetic: ['minimal', 'brutalist'],
  mood: ['cold', 'warm'],
  theme: ['light', 'dark'],
  stack: ['html-tailwind'],
};

const baseFm = (): Frontmatter => ({
  id: 'atoms/buttons/x',
  type: 'atom',
  name: 'X',
  description: 'x',
  tags: { aesthetic: [], mood: [], theme: [], stack: [] },
});

describe('validateTags', () => {
  it('returns no issues when all tags in dict', () => {
    const fm = baseFm();
    fm.tags = { aesthetic: ['minimal'], mood: ['cold'], theme: ['light'], stack: ['html-tailwind'] };
    expect(validateTags(fm, DICT)).toEqual([]);
  });

  it('reports error for unknown aesthetic', () => {
    const fm = baseFm();
    fm.tags.aesthetic = ['unicorn'];
    const issues = validateTags(fm, DICT);
    expect(issues).toHaveLength(1);
    expect(issues[0].level).toBe('error');
    expect(issues[0].message).toMatch(/aesthetic.*unicorn/);
  });

  it('reports error for unknown theme', () => {
    const fm = baseFm();
    fm.tags.theme = ['sepia'] as any;
    const issues = validateTags(fm, DICT);
    expect(issues[0].message).toMatch(/theme.*sepia/);
  });

  it('reports multiple issues across groups', () => {
    const fm = baseFm();
    fm.tags = { aesthetic: ['unicorn'], mood: ['angry'], theme: ['light'], stack: ['html-tailwind'] };
    const issues = validateTags(fm, DICT);
    expect(issues).toHaveLength(2);
  });
});
