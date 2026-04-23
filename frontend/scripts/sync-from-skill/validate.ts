import type { Frontmatter, TagDict, ValidationIssue } from './types';

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
