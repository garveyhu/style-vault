import type { Frontmatter, Platform, Theme } from './types';

/**
 * Derive the final Platform[] for a RegistryItem.
 * - If frontmatter.platforms is non-empty, use it as-is.
 * - Tokens / primitives (platform-neutral) default to ['any'].
 * - Everything else defaults to ['web'].
 */
export function normalizePlatforms(fm: Frontmatter): Platform[] {
  if (fm.platforms && fm.platforms.length > 0) return fm.platforms;
  if (fm.type === 'token') return ['any'];
  return ['web'];
}

/**
 * Derive the final Theme for a RegistryItem.
 * Priority:
 *   1. top-level `theme` (new schema) — used verbatim
 *   2. legacy `tags.theme` array — mapped: both light+dark → 'both', only 'dark' → 'dark', only 'light' → 'light'
 *   3. fallback → 'light'
 *
 * Returns { theme, warning? } where warning is a human message if the legacy
 * tags.theme contained unrecognized values (so the caller can surface it).
 */
export function normalizeTheme(fm: Frontmatter): { theme: Theme; warning?: string } {
  if (fm.theme) return { theme: fm.theme };

  const legacy = fm.tags.theme ?? [];
  if (legacy.length === 0) return { theme: 'light' };

  const set = new Set(legacy);
  const hasLight = set.has('light');
  const hasDark = set.has('dark');
  const unknown = legacy.filter((v) => v !== 'light' && v !== 'dark');

  let theme: Theme;
  if (hasLight && hasDark) theme = 'both';
  else if (hasDark) theme = 'dark';
  else if (hasLight) theme = 'light';
  else theme = 'light';

  if (unknown.length > 0) {
    return {
      theme,
      warning: `legacy tags.theme contains unrecognized values: ${unknown.join(', ')}`,
    };
  }
  return { theme };
}
