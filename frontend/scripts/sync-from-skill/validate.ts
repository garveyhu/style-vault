import fs from 'node:fs/promises';
import path from 'node:path';
import type { Entry, EntryType, Frontmatter, Platform, TagDict, ValidationIssue } from './types';

const VALID_TYPES: ReadonlySet<EntryType> = new Set<EntryType>([
  'product', 'style', 'page', 'block', 'component', 'token',
]);
const VALID_PLATFORMS: ReadonlySet<Platform> = new Set<Platform>(['web', 'ios', 'android', 'any']);

export function validateType(fm: Frontmatter): ValidationIssue[] {
  if (!VALID_TYPES.has(fm.type)) {
    return [{ level: 'error', entryId: fm.id, message: `unknown type: ${fm.type}` }];
  }
  return [];
}

export function validatePlatforms(fm: Frontmatter): ValidationIssue[] {
  const p = fm.platforms ?? [];
  const issues: ValidationIssue[] = [];
  for (const v of p) {
    if (!VALID_PLATFORMS.has(v)) {
      issues.push({ level: 'error', entryId: fm.id, message: `unknown platform: ${v}` });
    }
  }
  return issues;
}

export function validateRefs(fm: Frontmatter): ValidationIssue[] {
  if (fm.type !== 'product') return [];
  const issues: ValidationIssue[] = [];
  if (!fm.refs?.style) {
    issues.push({ level: 'error', entryId: fm.id, message: 'product missing refs.style' });
  }
  return issues;
}

export function validateTags(fm: Frontmatter, dict: TagDict): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  (['aesthetic', 'mood', 'stack'] as const).forEach((key) => {
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
