import { describe, it, expect } from 'vitest';
import { validateType, validatePlatforms, validateRefs } from './validate';
import type { Frontmatter } from './types';

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
    expect(validateType(baseFm({ type: 'product' }))).toEqual([]);
    expect(validateType(baseFm({ type: 'style' }))).toEqual([]);
    expect(validateType(baseFm({ type: 'page' }))).toEqual([]);
    expect(validateType(baseFm({ type: 'block' }))).toEqual([]);
    expect(validateType(baseFm({ type: 'component' }))).toEqual([]);
    expect(validateType(baseFm({ type: 'token' }))).toEqual([]);
  });

  it('rejects unknown types', () => {
    const fm = baseFm({ type: 'foobar' as Frontmatter['type'] });
    const issues = validateType(fm);
    expect(issues).toHaveLength(1);
    expect(issues[0].level).toBe('error');
    expect(issues[0].entryId).toBe(fm.id);
    expect(issues[0].message).toMatch(/unknown type: foobar/);
  });
});

describe('validatePlatforms', () => {
  it('accepts empty / undefined platforms', () => {
    expect(validatePlatforms(baseFm())).toEqual([]);
    expect(validatePlatforms(baseFm({ platforms: [] }))).toEqual([]);
  });

  it('accepts all valid platforms', () => {
    expect(validatePlatforms(baseFm({ platforms: ['web', 'ios', 'android', 'any'] }))).toEqual([]);
  });

  it('rejects unknown platforms', () => {
    const fm = baseFm({
      platforms: ['web', 'windows' as never, 'linux' as never],
    });
    const issues = validatePlatforms(fm);
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
