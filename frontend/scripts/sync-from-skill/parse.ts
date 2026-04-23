import matter from 'gray-matter';
import type { Frontmatter } from './types';

export function parseEntry(content: string, relativePath: string): {
  frontmatter: Frontmatter;
  body: string;
} {
  const { data, content: body } = matter(content);
  const fm = data as Partial<Frontmatter>;

  const expectedId = relativePath.replace(/(\/README)?\.md$/, '');
  if (fm.id !== expectedId) {
    throw new Error(`id mismatch: frontmatter "${fm.id}" vs path "${expectedId}"`);
  }

  for (const field of ['id', 'type', 'name', 'description', 'tags'] as const) {
    if (fm[field] === undefined || fm[field] === null) {
      throw new Error(`missing required field: ${field}`);
    }
  }

  const tags = fm.tags as Frontmatter['tags'];
  for (const key of ['aesthetic', 'mood', 'theme', 'stack'] as const) {
    if (!Array.isArray(tags[key])) {
      throw new Error(`tags.${key} must be array (got ${typeof tags[key]})`);
    }
  }

  return { frontmatter: fm as Frontmatter, body };
}
