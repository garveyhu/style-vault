import { describe, it, expect } from 'vitest';
import { parseEntry } from './parse';

describe('parseEntry', () => {
  it('parses new-style frontmatter with platforms + top-level theme', () => {
    const md = `---
id: styles/cold-industrial
type: style
name: Cold Industrial
description: 冷峻工业风
platforms:
  - web
  - ios
theme: dark
tags:
  aesthetic:
    - minimal
    - industrial
  mood:
    - serious
  stack:
    - react-antd-tailwind
---

正文。
`;
    const { frontmatter, body } = parseEntry(md, 'styles/cold-industrial.md');
    expect(frontmatter.id).toBe('styles/cold-industrial');
    expect(frontmatter.type).toBe('style');
    expect(frontmatter.platforms).toEqual(['web', 'ios']);
    expect(frontmatter.theme).toBe('dark');
    expect(frontmatter.tags.aesthetic).toEqual(['minimal', 'industrial']);
    expect(frontmatter.tags.mood).toEqual(['serious']);
    expect(frontmatter.tags.stack).toEqual(['react-antd-tailwind']);
    expect(body.trim()).toBe('正文。');
  });

  it('parses frontmatter with tags.theme and no platforms (legacy tags.theme still tolerated)', () => {
    const md = `---
id: components/buttons/ghost-button
type: component
name: Ghost Button
description: 幽灵按钮
tags:
  aesthetic:
    - minimal
  mood:
    - calm
  theme:
    - light
    - dark
  stack:
    - react-antd-tailwind
---

Body.
`;
    const { frontmatter } = parseEntry(md, 'components/buttons/ghost-button.md');
    expect(frontmatter.id).toBe('components/buttons/ghost-button');
    expect(frontmatter.type).toBe('component');
    expect(frontmatter.platforms).toBeUndefined();
    expect(frontmatter.theme).toBeUndefined();
    expect(frontmatter.tags.theme).toEqual(['light', 'dark']);
    expect(frontmatter.tags.aesthetic).toEqual(['minimal']);
    expect(frontmatter.tags.stack).toEqual(['react-antd-tailwind']);
  });

  it('throws when frontmatter id does not match path', () => {
    const md = `---
id: components/buttons/wrong-id
type: component
name: Wrong
description: 不匹配
tags:
  aesthetic:
    - minimal
  mood:
    - calm
  stack:
    - react-antd-tailwind
---

body
`;
    expect(() => parseEntry(md, 'components/buttons/ghost-button.md')).toThrow(/id mismatch/);
  });
});
