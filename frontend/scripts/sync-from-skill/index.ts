import fs from 'node:fs/promises';
import yaml from 'js-yaml';
import { walkReferences } from './walk';
import {
  validateTags,
  validateType,
  validatePlatforms,
  validateRefs,
  validateUses,
  validatePreview,
  computeUsedBy,
} from './validate';
import { emit } from './emit';
import {
  REFERENCES_DIR,
  TAGS_FILE,
  PLATFORMS_FILE,
  PREVIEW_DIR,
  REGISTRY_OUT,
} from './config';
import type {
  Platform,
  PlatformDict,
  RegistryItem,
  TagDict,
  Theme,
  ValidationIssue,
} from './types';

async function main() {
  const rawTagDict = yaml.load(await fs.readFile(TAGS_FILE, 'utf-8')) as Record<string, string[]>;
  const tagDict: TagDict = {
    aesthetic: rawTagDict.aesthetic ?? [],
    mood: rawTagDict.mood ?? [],
    stack: rawTagDict.stack ?? [],
  };
  const platformDict = yaml.load(await fs.readFile(PLATFORMS_FILE, 'utf-8')) as PlatformDict;
  const entries = await walkReferences(REFERENCES_DIR);

  const issues: ValidationIssue[] = [];
  const usedBy = computeUsedBy(entries);
  const items: RegistryItem[] = [];

  for (const e of entries) {
    issues.push(...validateType(e.frontmatter));
    issues.push(...validatePlatforms(e.frontmatter));
    issues.push(...validateRefs(e.frontmatter));
    issues.push(...validateTags(e.frontmatter, tagDict));
    const { hasPreviewFile, issues: pIssues } = await validatePreview(e.frontmatter, PREVIEW_DIR);
    issues.push(...pIssues);

    const platforms: Platform[] = (e.frontmatter.platforms && e.frontmatter.platforms.length > 0)
      ? e.frontmatter.platforms
      : (e.frontmatter.type === 'token' || e.frontmatter.type === 'primitive' ? ['any'] : ['web']);

    const themeFromTags = (e.frontmatter.tags.theme ?? []).join('-');
    const theme: Theme =
      e.frontmatter.theme
      ?? (themeFromTags === 'light-dark' || themeFromTags === 'dark-light' ? 'both'
        : themeFromTags === 'dark' ? 'dark' : 'light');

    const { theme: _strip, ...restTags } = e.frontmatter.tags;
    void _strip;

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

  const errors = issues.filter((i) => i.level === 'error');
  const warnings = issues.filter((i) => i.level === 'warning');
  for (const w of warnings) console.warn(`[warn] ${w.entryId ?? ''}: ${w.message}`);
  for (const e of errors) console.error(`[error] ${e.entryId ?? ''}: ${e.message}`);

  if (errors.length > 0) {
    console.error(`\n✗ ${errors.length} errors, aborting.`);
    process.exit(1);
  }

  await emit(items, tagDict, platformDict, REGISTRY_OUT);
  console.log(`✓ synced ${items.length} items to ${REGISTRY_OUT}`);
  if (warnings.length) console.log(`  (with ${warnings.length} warnings)`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
