// 单一真相：所有 label / 枚举 / 颜色都从 src/data/taxonomy.json 派生
// taxonomy.json 由 `yarn sync` 从 skill 的 assets/taxonomy.json 复制而来，勿手改
import raw from '../data/taxonomy.json';

// ============ 原始数据 ============

export const taxonomy = raw;

// ============ 类型导出 ============

export type EntryType = keyof typeof raw.type;
export type Platform = keyof typeof raw.platform;
export type Theme = keyof typeof raw.theme;
export type CategorySlug = keyof typeof raw.category;
export type TagGroup = 'aesthetic' | 'mood' | 'stack';

// ============ Type（粒度层级）============

export const typeLabel: Record<string, string> = Object.fromEntries(
  Object.entries(raw.type).map(([k, v]) => [k, v.zh]),
);
export const typePlural = typeLabel;
export const typeColor: Record<string, string> = Object.fromEntries(
  Object.entries(raw.type).map(([k, v]) => [k, v.color]),
);

// ============ Platform ============

export const platformLabel: Record<string, string> = Object.fromEntries(
  Object.entries(raw.platform).map(([k, v]) => [k, v.zh]),
);

// ============ Theme ============

export const themeLabel: Record<string, string> = Object.fromEntries(
  Object.entries(raw.theme).map(([k, v]) => [k, v.zh]),
);

// ============ Category（产品分类）============

export const categoryMeta = raw.category;

export function categoryLabel(slug: string | undefined | null): string {
  if (!slug) return '未分类';
  return (raw.category as Record<string, { zh: string }>)[slug]?.zh ?? slug;
}

export function categoryDot(slug: string | undefined | null): string {
  if (!slug) return '#94a3b8';
  return (raw.category as Record<string, { dot: string }>)[slug]?.dot ?? '#94a3b8';
}

export function categoryList(): Array<{
  slug: CategorySlug;
  zh: string;
  dot: string;
  order: number;
}> {
  return (
    Object.entries(raw.category) as Array<
      [CategorySlug, { zh: string; dot: string; order: number }]
    >
  )
    .map(([slug, meta]) => ({ slug, ...meta }))
    .sort((a, b) => a.order - b.order);
}

// ============ Tag（aesthetic / mood / stack）============

export const tagGroupLabel: Record<TagGroup, string> = {
  aesthetic: raw.tag.aesthetic.groupZh,
  mood: raw.tag.mood.groupZh,
  stack: raw.tag.stack.groupZh,
};

/** 取 tag 的中文；字典不存在则原样返回 */
export function zh(group: TagGroup, value: string): string {
  const grp = raw.tag[group] as { values: Record<string, { zh: string }> } | undefined;
  return grp?.values?.[value]?.zh ?? value;
}

/** 平铺的 { aesthetic/mood/stack: { en: zh } } —— 兼容旧 tagI18n API */
export const tagI18n: Record<TagGroup, Record<string, string>> = {
  aesthetic: Object.fromEntries(
    Object.entries(raw.tag.aesthetic.values).map(([k, v]) => [k, v.zh]),
  ),
  mood: Object.fromEntries(
    Object.entries(raw.tag.mood.values).map(([k, v]) => [k, v.zh]),
  ),
  stack: Object.fromEntries(
    Object.entries(raw.tag.stack.values).map(([k, v]) => [k, v.zh]),
  ),
};

/** 术语表用：扁平化所有 tag 的 (group, en, zh) */
export function allTagEntries(): Array<{ group: TagGroup; en: string; zh: string }> {
  const out: Array<{ group: TagGroup; en: string; zh: string }> = [];
  for (const g of ['aesthetic', 'mood', 'stack'] as TagGroup[]) {
    for (const [en, zhText] of Object.entries(tagI18n[g])) {
      out.push({ group: g, en, zh: zhText });
    }
  }
  return out;
}

/** tagDict shape：给 FiltersPanel / TagFilterBar 用的"可选值枚举" */
export const tagDict = {
  aesthetic: Object.keys(raw.tag.aesthetic.values),
  mood: Object.keys(raw.tag.mood.values),
  stack: Object.keys(raw.tag.stack.values),
};
