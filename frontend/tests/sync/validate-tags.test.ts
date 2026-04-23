import { describe, it, expect } from 'vitest';
import { validateTags } from '../../scripts/sync-from-skill/validate';
import type { Frontmatter, TagDict } from '../../scripts/sync-from-skill/types';

const DICT: TagDict = {
  aesthetic: ['minimal', 'brutalist'],
  mood: ['cold', 'warm'],
  stack: ['html-tailwind'],
};

const baseFm = (): Frontmatter => ({
  id: 'atoms/buttons/x',
  type: 'atom',
  name: 'X',
  description: 'x',
  tags: { aesthetic: [], mood: [], stack: [] },
});

describe('validateTags', () => {
  it('returns no issues when all tags in dict', () => {
    const fm = baseFm();
    fm.tags = { aesthetic: ['minimal'], mood: ['cold'], stack: ['html-tailwind'] };
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

  it('reports error for unknown stack', () => {
    const fm = baseFm();
    fm.tags.stack = ['wrong-stack'];
    const issues = validateTags(fm, DICT);
    expect(issues).toHaveLength(1);
    expect(issues[0].level).toBe('error');
    expect(issues[0].message).toMatch(/stack.*wrong-stack/);
  });

  it('reports multiple issues across groups', () => {
    const fm = baseFm();
    fm.tags = { aesthetic: ['unicorn'], mood: ['angry'], stack: ['html-tailwind'] };
    const issues = validateTags(fm, DICT);
    expect(issues).toHaveLength(2);
  });

  it('ignores legacy tags.theme (no longer validated)', () => {
    const fm = baseFm();
    fm.tags = {
      aesthetic: ['minimal'],
      mood: ['cold'],
      stack: ['html-tailwind'],
      theme: ['sepia' as 'light'],
    };
    expect(validateTags(fm, DICT)).toEqual([]);
  });
});
