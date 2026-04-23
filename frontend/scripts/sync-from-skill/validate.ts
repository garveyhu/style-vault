import fs from 'node:fs/promises';
import path from 'node:path';
import type { Entry, Frontmatter, TagDict, ValidationIssue } from './types';

export function validateTags(fm: Frontmatter, dict: TagDict): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  (['aesthetic', 'mood', 'theme', 'stack'] as const).forEach((key) => {
    for (const v of fm.tags[key]) {
      if (!dict[key].includes(v)) {
        issues.push({
          level: 'error',
          entryId: fm.id,
          message: `tags.${key}[${v}] not in dictionary`,
        });
      }
    }
  });
  return issues;
}

export function validateUses(entries: Entry[]): ValidationIssue[] {
  const allIds = new Set(entries.map((e) => e.frontmatter.id));
  const issues: ValidationIssue[] = [];
  for (const e of entries) {
    const uses = e.frontmatter.uses ?? [];
    for (const ref of uses) {
      if (ref === e.frontmatter.id) {
        issues.push({
          level: 'error',
          entryId: e.frontmatter.id,
          message: `self reference: ${ref}`,
        });
      } else if (!allIds.has(ref)) {
        issues.push({
          level: 'warning',
          entryId: e.frontmatter.id,
          message: `dangling uses: ${ref}`,
        });
      }
    }
  }
  return issues;
}

export async function validatePreview(
  fm: Frontmatter,
  previewRoot: string,
): Promise<{ hasPreviewFile: boolean; issues: ValidationIssue[] }> {
  if (!fm.preview) return { hasPreviewFile: false, issues: [] };

  const route = fm.preview.replace(/^\/preview\//, '');
  const filePath = path.join(previewRoot, `${route}.tsx`);
  const exists = await fs.access(filePath).then(() => true).catch(() => false);

  return {
    hasPreviewFile: exists,
    issues: exists
      ? []
      : [
          {
            level: 'warning',
            entryId: fm.id,
            message: `preview file missing: ${filePath}`,
          },
        ],
  };
}

export function computeUsedBy(entries: Entry[]): Map<string, string[]> {
  const map = new Map<string, string[]>();
  for (const e of entries) {
    for (const ref of e.frontmatter.uses ?? []) {
      const arr = map.get(ref) ?? [];
      if (!arr.includes(e.frontmatter.id)) arr.push(e.frontmatter.id);
      map.set(ref, arr);
    }
  }
  return map;
}
