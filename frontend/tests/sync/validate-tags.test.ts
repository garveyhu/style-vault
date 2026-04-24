import { describe, it, expect } from 'vitest';
import { validateTags } from '../../scripts/sync-from-skill/validate';
import type { Frontmatter, Taxonomy } from '../../scripts/sync-from-skill/types';

const TAX: Taxonomy = {
  type: {
    product: { zh: '产品', color: 'purple' },
    style: { zh: '风格', color: 'magenta' },
    page: { zh: '页面', color: 'geekblue' },
    block: { zh: '模块', color: 'cyan' },
    component: { zh: '组件', color: 'green' },
    token: { zh: '原语', color: 'orange' },
  },
  platform: { web: { zh: 'Web' }, ios: { zh: 'iOS' }, android: { zh: 'Android' }, any: { zh: '通用' } },
  theme: { light: { zh: '浅色' }, dark: { zh: '深色' }, both: { zh: '双主题' } },
  category: {},
  tag: {
    aesthetic: { groupZh: '调性', values: { minimal: { zh: '极简' }, brutalist: { zh: '粗野' } } },
    mood: { groupZh: '气质', values: { cold: { zh: '冷峻' }, warm: { zh: '温暖' } } },
    stack: { groupZh: '技术栈', values: { 'html-tailwind': { zh: 'HTML + Tailwind' } } },
  },
};

const baseFm = (): Frontmatter => ({
  id: 'components/buttons/x',
  type: 'component',
  name: 'X',
  description: 'x',
  tags: { aesthetic: [], mood: [], stack: [] },
});

describe('validateTags', () => {
  it('returns no issues when all tags in taxonomy', () => {
    const fm = baseFm();
    fm.tags = { aesthetic: ['minimal'], mood: ['cold'], stack: ['html-tailwind'] };
    expect(validateTags(fm, TAX)).toEqual([]);
  });

  it('reports error for unknown aesthetic', () => {
    const fm = baseFm();
    fm.tags.aesthetic = ['unicorn'];
    const issues = validateTags(fm, TAX);
    expect(issues).toHaveLength(1);
    expect(issues[0].level).toBe('error');
    expect(issues[0].message).toMatch(/aesthetic.*unicorn/);
  });

  it('reports error for unknown stack', () => {
    const fm = baseFm();
    fm.tags.stack = ['wrong-stack'];
    const issues = validateTags(fm, TAX);
    expect(issues).toHaveLength(1);
    expect(issues[0].level).toBe('error');
    expect(issues[0].message).toMatch(/stack.*wrong-stack/);
  });

  it('reports multiple issues across groups', () => {
    const fm = baseFm();
    fm.tags = { aesthetic: ['unicorn'], mood: ['angry'], stack: ['html-tailwind'] };
    const issues = validateTags(fm, TAX);
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
    expect(validateTags(fm, TAX)).toEqual([]);
  });
});
