import fs from 'node:fs/promises';
import path from 'node:path';
import { walkReferences } from './walk';
import {
  validateTags,
  validateType,
  validatePlatforms,
  validateRefs,
  validateCategory,
  validateTheme,
  validateRefTargets,
  validateUses,
  validatePreview,
  computeUsedBy,
} from './validate';
import { emit } from './emit';
import { normalizePlatforms, normalizeTheme } from './normalize';
import {
  REFERENCES_DIR,
  TAXONOMY_SRC,
  TAXONOMY_OUT,
  PREVIEW_DIR,
  REGISTRY_OUT,
} from './config';
import type {
  RegistryItem,
  Taxonomy,
  ValidationIssue,
} from './types';

async function main() {
  const taxonomyRaw = await fs.readFile(TAXONOMY_SRC, 'utf-8');
  const taxonomy = JSON.parse(taxonomyRaw) as Taxonomy;

  const entries = await walkReferences(REFERENCES_DIR);

  const issues: ValidationIssue[] = [];
  const usedBy = computeUsedBy(entries);
  const items: RegistryItem[] = [];

  for (const e of entries) {
    issues.push(...validateType(e.frontmatter, taxonomy));
    issues.push(...validatePlatforms(e.frontmatter, taxonomy));
    issues.push(...validateTheme(e.frontmatter, taxonomy));
    issues.push(...validateRefs(e.frontmatter));
    issues.push(...validateCategory(e.frontmatter, taxonomy));
    issues.push(...validateTags(e.frontmatter, taxonomy));
    const { hasPreviewFile, issues: pIssues } = await validatePreview(e.frontmatter, PREVIEW_DIR);
    issues.push(...pIssues);

    const platforms = normalizePlatforms(e.frontmatter);
    const { theme, warning: themeWarning } = normalizeTheme(e.frontmatter);
    if (themeWarning) {
      issues.push({ level: 'warning', entryId: e.frontmatter.id, message: themeWarning });
    }
    const { theme: _legacyTheme, ...restTags } = e.frontmatter.tags;
    void _legacyTheme;

    items.push({
      ...e.frontmatter,
      platforms,
      theme,
      tags: restTags as RegistryItem['tags'],
      uses: e.frontmatter.uses ?? [],
      usedBy: usedBy.get(e.frontmatter.id) ?? [],
      hasPreviewFile,
      skillPath: e.relativePath,
    });
  }
  issues.push(...validateUses(entries));
  issues.push(...validateRefTargets(entries));

  const errors = issues.filter((i) => i.level === 'error');
  const warnings = issues.filter((i) => i.level === 'warning');
  for (const w of warnings) console.warn(`[warn] ${w.entryId ?? ''}: ${w.message}`);
  for (const e of errors) console.error(`[error] ${e.entryId ?? ''}: ${e.message}`);

  if (errors.length > 0) {
    console.error(`\n✗ ${errors.length} errors, aborting.`);
    process.exit(1);
  }

  // 复制 taxonomy 到前端 src/data（build 产物，前端直接 import）
  await fs.mkdir(path.dirname(TAXONOMY_OUT), { recursive: true });
  await fs.writeFile(TAXONOMY_OUT, JSON.stringify(taxonomy, null, 2) + '\n', 'utf-8');

  await emit(items, REGISTRY_OUT);

  console.log(`✓ synced ${items.length} items to ${REGISTRY_OUT}`);
  console.log(`✓ copied taxonomy to ${TAXONOMY_OUT}`);
  if (warnings.length) console.log(`  (with ${warnings.length} warnings)`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
