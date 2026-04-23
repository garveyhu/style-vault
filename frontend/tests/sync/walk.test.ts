import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, it, expect } from 'vitest';
import { walkReferences } from '../../scripts/sync-from-skill/walk';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const FIX = path.resolve(__dirname, 'fixtures/simple/references');

describe('walkReferences', () => {
  it('finds file-style and folder-style entries', async () => {
    const entries = await walkReferences(FIX);
    const ids = entries.map(e => e.frontmatter.id).sort();
    expect(ids).toEqual([
      'atoms/buttons/ghost',
      'primitives/palettes/cool',
      'vibes/saas-tool/example',
    ]);
  });

  it('ignores _CATEGORY.md, root README.md, _tags.yaml, .gitkeep', async () => {
    const entries = await walkReferences(FIX);
    for (const e of entries) {
      expect(e.relativePath).not.toMatch(/_CATEGORY\.md$/);
      expect(e.relativePath).not.toMatch(/^README\.md$/);
      expect(e.relativePath).not.toMatch(/\.gitkeep$/);
      expect(e.relativePath).not.toMatch(/\.yaml$/);
    }
  });

  it('relativePath matches id + suffix', async () => {
    const entries = await walkReferences(FIX);
    const ghost = entries.find(e => e.frontmatter.id === 'atoms/buttons/ghost');
    expect(ghost?.relativePath).toBe('atoms/buttons/ghost.md');
    const vibe = entries.find(e => e.frontmatter.id === 'vibes/saas-tool/example');
    expect(vibe?.relativePath).toBe('vibes/saas-tool/example/README.md');
  });
});
