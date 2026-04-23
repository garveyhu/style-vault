import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, it, expect } from 'vitest';
import { validatePreview } from '../../scripts/sync-from-skill/validate';
import type { Frontmatter } from '../../scripts/sync-from-skill/types';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PREVIEW = path.resolve(__dirname, 'fixtures/preview-check');

function fm(id: string, preview?: string): Frontmatter {
  return {
    id, type: 'atom', name: id, description: '',
    tags: { aesthetic: [], mood: [], theme: [], stack: [] },
    preview,
  };
}

describe('validatePreview', () => {
  it('no preview field → no issues, hasPreviewFile false', async () => {
    const r = await validatePreview(fm('atoms/x'), PREVIEW);
    expect(r.hasPreviewFile).toBe(false);
    expect(r.issues).toEqual([]);
  });

  it('preview file exists', async () => {
    const r = await validatePreview(fm('atoms/x', '/preview/atoms/x'), PREVIEW);
    expect(r.hasPreviewFile).toBe(true);
    expect(r.issues).toEqual([]);
  });

  it('preview file missing → warning', async () => {
    const r = await validatePreview(fm('atoms/missing', '/preview/atoms/missing'), PREVIEW);
    expect(r.hasPreviewFile).toBe(false);
    expect(r.issues).toHaveLength(1);
    expect(r.issues[0].level).toBe('warning');
  });
});
