import { describe, it, expect } from 'vitest';
import { validateUses, computeUsedBy } from '../../scripts/sync-from-skill/validate';
import type { Entry, Frontmatter } from '../../scripts/sync-from-skill/types';

function fm(id: string, uses: string[] = []): Frontmatter {
  return {
    id, type: 'atom', name: id, description: '',
    tags: { aesthetic: [], mood: [], theme: [], stack: [] },
    uses,
  };
}

function entry(id: string, uses: string[] = []): Entry {
  return { frontmatter: fm(id, uses), body: '', relativePath: `${id}.md` };
}

describe('validateUses', () => {
  it('no issues when uses target exists', () => {
    const entries = [entry('a/x'), entry('a/y', ['a/x'])];
    expect(validateUses(entries)).toEqual([]);
  });

  it('warning for dangling uses', () => {
    const entries = [entry('a/y', ['a/missing'])];
    const issues = validateUses(entries);
    expect(issues).toHaveLength(1);
    expect(issues[0].level).toBe('warning');
    expect(issues[0].message).toMatch(/a\/missing/);
  });

  it('error for self reference', () => {
    const entries = [entry('a/x', ['a/x'])];
    const issues = validateUses(entries);
    expect(issues[0].level).toBe('error');
    expect(issues[0].message).toMatch(/self/i);
  });
});

describe('computeUsedBy', () => {
  it('builds reverse index', () => {
    const entries = [
      entry('a/x'),
      entry('a/y', ['a/x']),
      entry('a/z', ['a/x']),
    ];
    const map = computeUsedBy(entries);
    expect(map.get('a/x')?.sort()).toEqual(['a/y', 'a/z']);
    expect(map.get('a/y')).toBeUndefined();
  });
});
