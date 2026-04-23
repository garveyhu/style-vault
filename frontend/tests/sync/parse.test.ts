import { describe, it, expect } from 'vitest';
import { parseEntry } from '../../scripts/sync-from-skill/parse';

describe('parseEntry', () => {
  it('parses valid frontmatter', () => {
    const md = `---
id: atoms/buttons/ghost-button
type: atom
name: Ghost Button
description: 幽灵按钮
tags:
  aesthetic: [minimal]
  mood: [calm]
  theme: [light, dark]
  stack: [react-antd-tailwind]
---
# Ghost Button`;
    const result = parseEntry(md, 'atoms/buttons/ghost-button.md');
    expect(result.frontmatter.id).toBe('atoms/buttons/ghost-button');
    expect(result.frontmatter.type).toBe('atom');
    expect(result.frontmatter.tags.theme).toEqual(['light', 'dark']);
  });

  it('resolves folder-style entry id from README.md', () => {
    const md = `---
id: vibes/saas-tool/cold-industrial
type: vibe
name: Cold Industrial SaaS
description: 冷感工业
tags:
  aesthetic: [minimal]
  mood: [cold]
  theme: [dark]
  stack: [react-antd-tailwind]
---`;
    const result = parseEntry(md, 'vibes/saas-tool/cold-industrial/README.md');
    expect(result.frontmatter.id).toBe('vibes/saas-tool/cold-industrial');
  });

  it('throws when id mismatches path', () => {
    const md = `---
id: atoms/buttons/wrong-id
type: atom
name: X
description: x
tags:
  aesthetic: []
  mood: []
  theme: [light]
  stack: [html-tailwind]
---`;
    expect(() => parseEntry(md, 'atoms/buttons/ghost-button.md')).toThrow(/id/i);
  });

  it('throws when required field missing', () => {
    const md = `---
id: atoms/buttons/x
type: atom
---`;
    expect(() => parseEntry(md, 'atoms/buttons/x.md')).toThrow();
  });

  it('throws when tags not array', () => {
    const md = `---
id: atoms/buttons/x
type: atom
name: X
description: x
tags:
  aesthetic: "minimal"
  mood: []
  theme: [light]
  stack: []
---`;
    expect(() => parseEntry(md, 'atoms/buttons/x.md')).toThrow(/aesthetic/);
  });
});
