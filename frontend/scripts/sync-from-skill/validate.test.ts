import { describe, it, expect } from 'vitest';
import { validateType, validatePlatforms, validateRefs } from './validate';
import type { Frontmatter, Taxonomy } from './types';

const taxonomy: Taxonomy = {
  type: {
    product: { zh: '产品', color: 'purple' },
    style: { zh: '风格', color: 'magenta' },
    page: { zh: '页面', color: 'geekblue' },
    block: { zh: '模块', color: 'cyan' },
    component: { zh: '组件', color: 'green' },
    token: { zh: '原语', color: 'orange' },
  },
  platform: {
    web: { zh: 'Web' },
    ios: { zh: 'iOS' },
    android: { zh: 'Android' },
    any: { zh: '通用' },
  },
  theme: { light: { zh: '浅色' }, dark: { zh: '深色' }, both: { zh: '双主题' } },
  category: {},
  tag: {
    aesthetic: { groupZh: '调性', values: { minimal: { zh: '极简' } } },
    mood: { groupZh: '气质', values: { calm: { zh: '平静' } } },
    stack: {
      groupZh: '技术栈',
      values: { 'react-antd-tailwind': { zh: 'React + Antd + Tailwind' } },
    },
  },
};

function baseFm(overrides: Partial<Frontmatter> = {}): Frontmatter {
  return {
    id: 'components/buttons/ghost-button',
    type: 'component',
    name: 'Ghost Button',
    description: '幽灵按钮',
    tags: {
      aesthetic: ['minimal'],
      mood: ['calm'],
      stack: ['react-antd-tailwind'],
    },
    ...overrides,
  };
}

describe('validateType', () => {
  it('accepts new types', () => {
    expect(validateType(baseFm({ type: 'product' }), taxonomy)).toEqual([]);
    expect(validateType(baseFm({ type: 'style' }), taxonomy)).toEqual([]);
    expect(validateType(baseFm({ type: 'page' }), taxonomy)).toEqual([]);
    expect(validateType(baseFm({ type: 'block' }), taxonomy)).toEqual([]);
    expect(validateType(baseFm({ type: 'component' }), taxonomy)).toEqual([]);
    expect(validateType(baseFm({ type: 'token' }), taxonomy)).toEqual([]);
  });

  it('rejects unknown types', () => {
    const fm = baseFm({ type: 'foobar' as Frontmatter['type'] });
    const issues = validateType(fm, taxonomy);
    expect(issues).toHaveLength(1);
    expect(issues[0].level).toBe('error');
    expect(issues[0].entryId).toBe(fm.id);
    expect(issues[0].message).toMatch(/unknown type: foobar/);
  });
});

describe('validatePlatforms', () => {
  it('accepts empty / undefined platforms', () => {
    expect(validatePlatforms(baseFm(), taxonomy)).toEqual([]);
    expect(validatePlatforms(baseFm({ platforms: [] }), taxonomy)).toEqual([]);
  });

  it('accepts all valid platforms', () => {
    expect(
      validatePlatforms(baseFm({ platforms: ['web', 'ios', 'android', 'any'] }), taxonomy),
    ).toEqual([]);
  });

  it('rejects unknown platforms', () => {
    const fm = baseFm({
      platforms: ['web', 'windows' as never, 'linux' as never],
    });
    const issues = validatePlatforms(fm, taxonomy);
    expect(issues).toHaveLength(2);
    expect(issues.every((i) => i.level === 'error')).toBe(true);
    expect(issues[0].message).toMatch(/unknown platform: windows/);
    expect(issues[1].message).toMatch(/unknown platform: linux/);
  });
});

describe('validateRefs', () => {
  it('no-op for non-product types', () => {
    expect(validateRefs(baseFm({ type: 'style' }))).toEqual([]);
    expect(validateRefs(baseFm({ type: 'block' }))).toEqual([]);
    expect(validateRefs(baseFm({ type: 'component' }))).toEqual([]);
  });

  it('errors when product has no refs.style', () => {
    const fm = baseFm({ type: 'product', refs: undefined });
    const issues = validateRefs(fm);
    expect(issues).toHaveLength(1);
    expect(issues[0].level).toBe('error');
    expect(issues[0].message).toMatch(/product missing refs\.style/);
  });

  it('errors when product has refs but refs.style missing', () => {
    const fm = baseFm({ type: 'product', refs: { pages: ['p1'] } });
    const issues = validateRefs(fm);
    expect(issues).toHaveLength(1);
    expect(issues[0].message).toMatch(/product missing refs\.style/);
  });

  it('passes when product has refs.style', () => {
    const fm = baseFm({ type: 'product', refs: { style: 'styles/cold-industrial' } });
    expect(validateRefs(fm)).toEqual([]);
  });
});
