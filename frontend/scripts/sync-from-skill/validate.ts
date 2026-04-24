import fs from 'node:fs/promises';
import path from 'node:path';
import type { Entry, Frontmatter, Taxonomy, ValidationIssue } from './types';

export function validateType(fm: Frontmatter, taxonomy: Taxonomy): ValidationIssue[] {
  if (!(fm.type in taxonomy.type)) {
    return [{ level: 'error', entryId: fm.id, message: `unknown type: ${fm.type}` }];
  }
  return [];
}

export function validatePlatforms(fm: Frontmatter, taxonomy: Taxonomy): ValidationIssue[] {
  const p = fm.platforms ?? [];
  const issues: ValidationIssue[] = [];
  for (const v of p) {
    if (!(v in taxonomy.platform)) {
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

export function validateCategory(fm: Frontmatter, taxonomy: Taxonomy): ValidationIssue[] {
  if (fm.type !== 'product') return [];
  const cat = fm.category;
  if (!cat) {
    return [{ level: 'error', entryId: fm.id, message: 'product missing category' }];
  }
  if (!(cat in taxonomy.category)) {
    const valid = Object.keys(taxonomy.category).join(', ');
    return [{
      level: 'error',
      entryId: fm.id,
      message: `category "${cat}" not in taxonomy (valid: ${valid})`,
    }];
  }
  return [];
}

export function validateTags(fm: Frontmatter, taxonomy: Taxonomy): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  (['aesthetic', 'mood', 'stack'] as const).forEach((key) => {
    const allowed = taxonomy.tag[key]?.values ?? {};
    for (const v of fm.tags[key]) {
      if (!(v in allowed)) {
        issues.push({
          level: 'error',
          entryId: fm.id,
          message: `tags.${key}[${v}] not in taxonomy`,
        });
      }
    }
  });
  return issues;
}

export function validateTheme(fm: Frontmatter, taxonomy: Taxonomy): ValidationIssue[] {
  if (!fm.theme) return [];
  if (!(fm.theme in taxonomy.theme)) {
    return [{ level: 'error', entryId: fm.id, message: `unknown theme: ${fm.theme}` }];
  }
  return [];
}

export function validateRefTargets(entries: Entry[]): ValidationIssue[] {
  const allIds = new Set(entries.map((e) => e.frontmatter.id));
  const issues: ValidationIssue[] = [];
  for (const e of entries) {
    if (e.frontmatter.type !== 'product') continue;
    const refs = e.frontmatter.refs;
    if (!refs) continue;

    const check = (ref: string | undefined, label: string) => {
      if (!ref) return;
      if (!allIds.has(ref)) {
        issues.push({
          level: 'error',
          entryId: e.frontmatter.id,
          message: `product ref ${label} does not resolve: ${ref}`,
        });
      }
    };

    check(refs.style, 'style');
    (refs.pages ?? []).forEach((r, i) => check(r, `pages[${i}]`));
    (refs.blocks ?? []).forEach((r, i) => check(r, `blocks[${i}]`));
    (refs.components ?? []).forEach((r, i) => check(r, `components[${i}]`));
    if (refs.tokens) {
      check(refs.tokens.palette, 'tokens.palette');
      check(refs.tokens.typography, 'tokens.typography');
      check(refs.tokens.motion, 'tokens.motion');
      check(refs.tokens.border, 'tokens.border');
      check(refs.tokens.iconography, 'tokens.iconography');
    }
  }
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
